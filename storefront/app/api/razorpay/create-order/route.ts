import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Razorpay from "razorpay";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { ratelimit } from "@/lib/ratelimit";

const itemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).max(99),
  size: z.string().max(40).nullable().optional(),
  color: z.string().max(40).nullable().optional(),
});

const addressSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  line1: z.string().trim().min(3).max(200),
  line2: z.string().trim().max(200).nullable().optional(),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{9,14}$/, "Enter a valid phone number"),
});

const requestSchema = z.object({ items: z.array(itemSchema).min(1).max(50), address: addressSchema });

function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay is not configured");
  }
  return new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
}

export async function POST(request: Request) {
  try {
    const ip = headers().get("x-forwarded-for") ?? "unknown";
    const { success } = await ratelimit.limit(ip);
    if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Please sign in to checkout" }, { status: 401 });

    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Check your address and cart details" }, { status: 400 });

    const productIds = [...new Set(parsed.data.items.map((item) => item.productId))];
    const { data: products, error } = await supabase.from("products").select("id, name, price, stock, is_active, sizes, colors").in("id", productIds);
    if (error) throw error;

    const productMap = new Map((products ?? []).map((product) => [product.id, product]));
    let total = 0;
    for (const item of parsed.data.items) {
      const product = productMap.get(item.productId);
      if (!product || !product.is_active) return NextResponse.json({ error: "One of the products is no longer available" }, { status: 400 });
      if (item.quantity > product.stock) return NextResponse.json({ error: `${product.name} does not have enough stock` }, { status: 400 });
      if (item.size && product.sizes?.length && !product.sizes.includes(item.size)) return NextResponse.json({ error: `The selected size for ${product.name} is unavailable` }, { status: 400 });
      if (item.color && product.colors?.length && !product.colors.includes(item.color)) return NextResponse.json({ error: `The selected colour for ${product.name} is unavailable` }, { status: 400 });
      total += Number(product.price) * item.quantity;
    }

    const razorpayOrder = await getRazorpay().orders.create({
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: `sf_${user.id.slice(0, 8)}_${Date.now()}`,
      notes: { user_id: user.id },
    });

    return NextResponse.json({ orderId: razorpayOrder.id, amount: razorpayOrder.amount, currency: razorpayOrder.currency, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error("Razorpay order creation failed", error);
    return NextResponse.json({ error: "Unable to start payment right now" }, { status: 500 });
  }
}
