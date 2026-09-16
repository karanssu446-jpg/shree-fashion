import { readdir, mkdir, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import XLSX from "xlsx";

const productDirectory = new URL("../../products/", import.meta.url);
const sourceCsv = new URL("products_export_1.csv", productDirectory);
const catalogueDirectory = new URL("../catalogue/", import.meta.url);
const supportedImages = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const normaliseName = (value) => value.toLowerCase().replace(/_\d+$/, "").replace(/[^a-z0-9]+/g, " ").trim();
const stripHtml = (value = "") => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const unique = (values) => [...new Set(values.filter(Boolean))];
const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;

const workbook = XLSX.readFile(sourceCsv);
const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: "" });
const imageFiles = (await readdir(productDirectory)).filter((file) => supportedImages.has(extname(file).toLowerCase()));
const imagesByProductName = new Map();

for (const imageFile of imageFiles) {
  const key = normaliseName(basename(imageFile, extname(imageFile)));
  const current = imagesByProductName.get(key) ?? [];
  current.push(imageFile);
  imagesByProductName.set(key, current);
}

const products = [];
let currentProduct;
for (const row of rows) {
  if (row.Title) {
    currentProduct = {
      name: row.Title,
      slug: row.Handle,
      description: stripHtml(row["Body (HTML)"]),
      tags: row.Tags,
      option_names: [row["Option1 Name"], row["Option2 Name"], row["Option3 Name"]].filter(Boolean),
      variants: [],
    };
    products.push(currentProduct);
  }
  if (!currentProduct) continue;
  currentProduct.variants.push({
    option1: row["Option1 Value"], option2: row["Option2 Value"], option3: row["Option3 Value"],
    sku: row["Variant SKU"] || null, price: Number(row["Variant Price"] || 0),
    compare_at_price: row["Variant Compare At Price"] ? Number(row["Variant Compare At Price"]) : null,
    inventory_quantity: Number(row["Variant Inventory Qty"] || 0), available: row.Status !== "archived",
  });
}

const preparedProducts = products.map((product) => {
  const localImages = (imagesByProductName.get(normaliseName(product.name)) ?? []).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const sizeOptionIndex = product.option_names.findIndex((option) => /size/i.test(option));
  const colorOptionIndex = product.option_names.findIndex((option) => /colou?r|shade/i.test(option));
  const prices = product.variants.map((variant) => variant.price).filter(Number.isFinite);
  const compareAtPrices = product.variants.map((variant) => variant.compare_at_price).filter((value) => value && value > 0);
  return {
    ...product,
    price: Math.min(...prices),
    compare_at_price: compareAtPrices.length ? Math.max(...compareAtPrices) : null,
    sizes: sizeOptionIndex >= 0 ? unique(product.variants.map((variant) => variant[`option${sizeOptionIndex + 1}`])) : [],
    colors: colorOptionIndex >= 0 ? unique(product.variants.map((variant) => variant[`option${colorOptionIndex + 1}`])) : [],
    stock: product.variants.reduce((total, variant) => total + Math.max(0, variant.inventory_quantity), 0),
    local_image_files: localImages.map((file) => `../products/${file}`),
    image_match_status: localImages.length ? "matched" : "missing",
  };
});

const unmatched = preparedProducts.filter((product) => product.image_match_status === "missing");
if (unmatched.length) throw new Error(`No local images matched: ${unmatched.map((product) => product.name).join(", ")}`);

await mkdir(catalogueDirectory, { recursive: true });
await writeFile(new URL("products-with-local-images.json", catalogueDirectory), `${JSON.stringify(preparedProducts, null, 2)}\n`);

const headers = ["name", "slug", "description", "tags", "price", "compare_at_price", "sizes", "colors", "stock", "local_image_files", "image_match_status", "variants"];
const csv = [headers.join(","), ...preparedProducts.map((product) => headers.map((header) => csvCell(Array.isArray(product[header]) ? JSON.stringify(product[header]) : product[header])).join(","))].join("\n");
await writeFile(new URL("products-with-local-images.csv", catalogueDirectory), `${csv}\n`);

console.log(`Prepared ${preparedProducts.length} products. Matched ${imageFiles.length} local images with no unmatched products.`);
