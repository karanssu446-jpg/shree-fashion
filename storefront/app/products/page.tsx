import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { createClient } from "@/lib/supabase/server";
import type { Category, Product } from "@/lib/supabase/types";

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const supabase = createClient();
  const [{ data: categories }, { data: allProducts }] = await Promise.all([supabase.from("categories").select("*").order("name"), supabase.from("products").select("*").order("created_at", { ascending: false })]);
  const selected = searchParams.category;
  const categoryList = (categories ?? []) as Category[];
  const products = ((allProducts ?? []) as Product[]).filter(product => !selected || categoryList.find(c => c.id === product.category_id)?.slug === selected);
  const title = selected ? categoryList.find(c => c.slug === selected)?.name ?? "Collection" : "All products";
  return <section className="catalogue"><div className="page-heading"><p className="eyebrow">The collection</p><h1>{title}</h1><p>Find your next favourite from our carefully selected styles.</p></div><div className="filter-row"><Link href="/products" className={!selected ? "filter active" : "filter"}>All</Link>{categoryList.map(category => <Link key={category.id} href={`/products?category=${category.slug}`} className={selected === category.slug ? "filter active" : "filter"}>{category.name}</Link>)}</div>{products.length ? <div className="product-grid catalogue-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-products"><p>No pieces in this collection yet.</p><Link href="/products" className="text-link">View all products</Link></div>}</section>;
}
