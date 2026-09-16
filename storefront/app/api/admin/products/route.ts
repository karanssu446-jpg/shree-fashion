import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";

const productSchema = z.object({
  name: z.string().trim().min(1).max(160),
  slug: z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().max(5000).nullable(),
  price: z.number().finite().nonnegative(),
  compare_at_price: z.number().finite().nonnegative().nullable(),
  category_id: z.string().uuid().nullable(),
  sizes: z.array(z.string().trim().min(1).max(40)).max(20),
  colors: z.array(z.string().trim().min(1).max(40)).max(20),
  stock: z.number().int().nonnegative(),
  is_active: z.boolean(),
});

async function uploadImage(file: File, productSlug: string) {
  if (!file.size) return null;
  if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5 MB");
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${productSlug}/${crypto.randomUUID()}.${extension}`;
  const admin = createAdminClient();
  const { error } = await admin.storage.from("product-images").upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  return admin.storage.from("product-images").getPublicUrl(path).data.publicUrl;
}

function parseList(value: FormDataEntryValue | null) {
  return String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
}

async function parseProductForm(request: Request) {
  const form = await request.formData();
  const parsed = productSchema.safeParse({
    name: String(form.get("name") || ""),
    slug: String(form.get("slug") || ""),
    description: String(form.get("description") || "").trim() || null,
    price: Number(form.get("price")),
    compare_at_price: String(form.get("compareAtPrice") || "").trim() ? Number(form.get("compareAtPrice")) : null,
    category_id: String(form.get("categoryId") || "").trim() || null,
    sizes: parseList(form.get("sizes")),
    colors: parseList(form.get("colors")),
    stock: Number(form.get("stock")),
    is_active: form.get("isActive") === "true",
  });
  if (!parsed.success) throw new Error("Check the product details and try again");
  const image = form.get("image");
  const imageUrl = image instanceof File ? await uploadImage(image, parsed.data.slug) : null;
  return { ...parsed.data, imageUrl };
}

export async function POST(request: Request) {
  try {
    const { isAdmin } = await requireAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    const product = await parseProductForm(request);
    const admin = createAdminClient();
    const { imageUrl, ...values } = product;
    const { data, error } = await admin.from("products").insert({ ...values, images: imageUrl ? [imageUrl] : [] }).select("*").single();
    if (error) return NextResponse.json({ error: error.code === "23505" ? "That slug is already in use" : error.message }, { status: 400 });
    return NextResponse.json({ product: data });
  } catch (error) {
    console.error("Admin product creation failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create product" }, { status: 400 });
  }
}
