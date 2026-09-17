import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shree-fashion.com";
  const supabase = createClient();
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from("products").select("slug, created_at").eq("is_active", true),
    supabase.from("categories").select("slug"),
  ]);
  const staticRoutes: MetadataRoute.Sitemap = ["", "/products", "/account/login", "/account/signup"].map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: path === "/products" ? "daily" : "weekly", priority: path === "" ? 1 : 0.6 }));
  const categoryRoutes: MetadataRoute.Sitemap = (categories ?? []).map((category) => ({ url: `${siteUrl}/products?category=${encodeURIComponent(category.slug)}`, changeFrequency: "daily", priority: 0.7 }));
  const productRoutes: MetadataRoute.Sitemap = (products ?? []).map((product) => ({ url: `${siteUrl}/products/${product.slug}`, lastModified: product.created_at, changeFrequency: "weekly", priority: 0.8 }));
  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
