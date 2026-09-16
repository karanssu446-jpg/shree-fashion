import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { z } from "zod";
import { createClient, createAdminClient } from "@/lib/supabase/server";

const itemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).max(99),
  size: z.string().max(40).nullable().optional(),
  color: z.string().max(40).nullable().optional(),
});

const requestSchema = z.object({
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
  items: z.array(itemSchema).min(1).max(50),
  address: z.object({
    fullName: z.string().trim().min(2).max(100),
    line1: z.string().trim().min(3).max(200),
    line2: z.string().trim().max(200).nullable().optional(),
    city: z.string().trim().min(2).max(80),
    state: z.string().trim().min(2).max(80),
    pincode: z.string().trim().regex(/^\d{6}$/),
    phone: z.string().trim().regex(/^[+\d][\d\s-]{9,14}$/),
  }),
});

function validSignature(orderId: string, paymentId: string, signature: string) {
  if (!process.env.RAZORPAY_KEY_SECRET) return false;
  const expected = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(signature);
  return expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Please sign in to complete payment" }, { status: 401 });

    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Payment details are incomplete" }, { status: 400 });
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, items, address } = parsed.data;

    if (!validSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature)) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) throw new Error("Razorpay is not configured");
    const razorpayOrder = await new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET }).orders.fetch(razorpayOrderId);
    if (razorpayOrder.notes?.user_id !== user.id) return NextResponse.json({ error: "Payment order does not belong to this account" }, { status: 400 });
    const productIds = [...new Set(items.map((item) => item.productId))];
    const { data: products, error: productError } = await supabase.from("products").select("id, name, price, stock, is_active, sizes, colors").in("id", productIds);
    if (productError) throw productError;

    const productMap = new Map((products ?? []).map((product) => [product.id, product]));
    let total = 0;
    const orderItems: Array<{ product_id: string; product_name: string; price: number; size: string | null; color: string | null; quantity: number }> = [];
    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product || !product.is_active || item.quantity > product.stock) return NextResponse.json({ error: "A product changed before payment completed" }, { status: 400 });
      if (item.size && product.sizes?.length && !product.sizes.includes(item.size)) return NextResponse.json({ error: "A selected size is no longer available" }, { status: 400 });
      if (item.color && product.colors?.length && !product.colors.includes(item.color)) return NextResponse.json({ error: "A selected colour is no longer available" }, { status: 400 });
      const price = Number(product.price);
      total += price * item.quantity;
      orderItems.push({ product_id: product.id, product_name: product.name, price, size: item.size ?? null, color: item.color ?? null, quantity: item.quantity });
    }

    if (Number(razorpayOrder.amount) !== Math.round(total * 100) || razorpayOrder.currency !== "INR") {
      return NextResponse.json({ error: "Payment amount could not be verified" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data: existingOrder } = await admin.from("orders").select("id").eq("razorpay_payment_id", razorpayPaymentId).maybeSingle();
    if (existingOrder) return NextResponse.json({ orderId: existingOrder.id });

    const { data: savedAddress, error: addressError } = await admin.from("addresses").insert({ user_id: user.id, full_name: address.fullName, line1: address.line1, line2: address.line2 || null, city: address.city, state: address.state, pincode: address.pincode, phone: address.phone }).select("id").single();
    if (addressError) throw addressError;
    const { data: order, error: orderError } = await admin.from("orders").insert({ user_id: user.id, address_id: savedAddress.id, status: "paid", total, razorpay_order_id: razorpayOrderId, razorpay_payment_id: razorpayPaymentId }).select("id").single();
    if (orderError) throw orderError;
    const { error: itemsError } = await admin.from("order_items").insert(orderItems.map((item) => ({ ...item, order_id: order.id })));
    if (itemsError) throw itemsError;

    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error("Razorpay verification failed", error);
    return NextResponse.json({ error: "Unable to verify payment right now" }, { status: 500 });
  }
}
