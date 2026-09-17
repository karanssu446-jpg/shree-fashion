import "dotenv/config";
import { readFile } from "node:fs/promises";
import { basename, extname } from "node:path";
import { createClient } from "@supabase/supabase-js";

const catalogueUrl = new URL("../catalogue/products-with-local-images.json", import.meta.url);
const productDirectoryUrl = new URL("../../products/", import.meta.url);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");

const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
const products = JSON.parse(await readFile(catalogueUrl, "utf8"));
const contentTypes = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

async function uploadProductImages(product) {
  const imageUrls = [];
  for (const localImage of product.local_image_files) {
    const filename = basename(localImage);
    const extension = extname(filename).toLowerCase();
    const path = `${product.slug}/${filename}`;
    const file = await readFile(new URL(filename, productDirectoryUrl));
    const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file, {
      contentType: contentTypes[extension] || "application/octet-stream",
      upsert: true,
    });
    if (uploadError) throw new Error(`${product.name}: image upload failed for ${filename}: ${uploadError.message}`);
    imageUrls.push(supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl);
  }
  return imageUrls;
}

for (const product of products) {
  const images = await uploadProductImages(product);
  const { error } = await supabase.from("products").upsert({
    name: product.name,
    slug: product.slug,
    description: product.description || null,
    price: product.price,
    compare_at_price: product.compare_at_price,
    category_id: null,
    sizes: product.sizes,
    colors: product.colors,
    images,
    stock: product.stock,
    is_active: true,
  }, { onConflict: "slug" });
  if (error) throw new Error(`${product.name}: database import failed: ${error.message}`);
  console.log(`Imported ${product.name} (${images.length} images)`);
}

console.log(`Imported ${products.length} products with grouped local images.`);
