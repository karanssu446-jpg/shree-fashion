import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";

function parseList(value: FormDataEntryValue | null) {
  return String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { isAdmin } = await requireAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    const form = await request.formData();
    const name = String(form.get("name") || "").trim();
    const slug = String(form.get("slug") || "").trim();
    const price = Number(form.get("price"));
    const compareAtPrice = String(form.get("compareAtPrice") || "").trim();
    const stock = Number(form.get("stock"));
    if (!name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !Number.isFinite(price) || price < 0 || !Number.isInteger(stock) || stock < 0) return NextResponse.json({ error: "Check the product details and try again" }, { status: 400 });

    const admin = createAdminClient();
    const { data: current, error: currentError } = await admin.from("products").select("images").eq("id", params.id).single();
    if (currentError) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    const image = form.get("image");
    let images = (current.images as string[] | null) || [];
    if (image instanceof File && image.size) {
      if (!image.type.startsWith("image/") || image.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Image must be under 5 MB" }, { status: 400 });
      const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${slug}/${crypto.randomUUID()}.${extension}`;
      const upload = await admin.storage.from("product-images").upload(path, image, { contentType: image.type, upsert: false });
      if (upload.error) throw upload.error;
      images = [...images, admin.storage.from("product-images").getPublicUrl(path).data.publicUrl];
    }

    const { data, error } = await admin.from("products").update({ name, slug, description: String(form.get("description") || "").trim() || null, price, compare_at_price: compareAtPrice ? Number(compareAtPrice) : null, category_id: String(form.get("categoryId") || "").trim() || null, sizes: parseList(form.get("sizes")), colors: parseList(form.get("colors")), stock, is_active: form.get("isActive") === "true", images }).eq("id", params.id).select("*").single();
    if (error) return NextResponse.json({ error: error.code === "23505" ? "That slug is already in use" : error.message }, { status: 400 });
    return NextResponse.json({ product: data });
  } catch (error) {
    console.error("Admin product update failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update product" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const { isAdmin } = await requireAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    const { error } = await createAdminClient().from("products").delete().eq("id", params.id);
    if (error) return NextResponse.json({ error: "Products used in existing orders cannot be deleted" }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin product deletion failed", error);
    return NextResponse.json({ error: "Unable to delete product" }, { status: 400 });
  }
}
