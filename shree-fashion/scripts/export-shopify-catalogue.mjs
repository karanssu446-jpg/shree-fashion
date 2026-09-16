import { mkdir, writeFile } from "node:fs/promises";

const source = "https://shree-fashion.com/products.json?limit=250";
const catalogueDirectory = new URL("../catalogue/", import.meta.url);
const response = await fetch(source);

if (!response.ok) throw new Error(`Shopify catalogue request failed: ${response.status}`);

const { products } = await response.json();
const cleanText = (html = "") => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const normaliseOptionValues = (product, optionName) => product.variants
  .map((variant) => variant[`option${product.options.findIndex((option) => option.name.toLowerCase() === optionName) + 1}`])
  .filter(Boolean)
  .filter((value, index, all) => all.indexOf(value) === index);

const rows = products.map((product) => {
  const optionNames = product.options.map((option) => option.name);
  const sizeOption = optionNames.find((name) => /size/i.test(name));
  const colorOption = optionNames.find((name) => /colou?r|shade/i.test(name));
  return {
    name: product.title,
    slug: product.handle,
    description: cleanText(product.body_html),
    tags: product.tags,
    price: Math.min(...product.variants.map((variant) => Number(variant.price))),
    compare_at_price: product.variants.some((variant) => variant.compare_at_price) ? Math.max(...product.variants.map((variant) => Number(variant.compare_at_price || 0))) : "",
    sizes: sizeOption ? normaliseOptionValues(product, sizeOption) : [],
    colors: colorOption ? normaliseOptionValues(product, colorOption) : [],
    option_names: optionNames,
    stock: product.variants.reduce((total, variant) => total + Math.max(variant.inventory_quantity || 0, 0), 0),
    images: product.images.map((image) => image.src),
    variants: product.variants.map(({ title, sku, price, compare_at_price, option1, option2, option3, inventory_quantity, available }) => ({ title, sku, price, compare_at_price, option1, option2, option3, inventory_quantity, available })),
  };
});

await mkdir(catalogueDirectory, { recursive: true });
await writeFile(new URL("shopify-products.json", catalogueDirectory), `${JSON.stringify(rows, null, 2)}\n`);

const headers = ["name", "slug", "description", "tags", "price", "compare_at_price", "sizes", "colors", "option_names", "stock", "images", "variants"];
const csv = [headers.join(","), ...rows.map((row) => headers.map((header) => csvCell(Array.isArray(row[header]) ? JSON.stringify(row[header]) : row[header])).join(","))].join("\n");
await writeFile(new URL("shopify-products.csv", catalogueDirectory), `${csv}\n`);

console.log(`Exported ${rows.length} products and ${rows.reduce((total, product) => total + product.variants.length, 0)} variants.`);
