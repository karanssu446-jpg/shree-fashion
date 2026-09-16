"use client";

import { useState } from "react";
import type { Product } from "@/lib/supabase/types";
import { formatPrice, productImage } from "@/lib/store";
import { AddToBag } from "./add-to-bag";

export function ProductDetails({ product }: { product: Product }) {
  const images = product.images?.length ? product.images : [productImage(product)];
  const [activeImage, setActiveImage] = useState(images[0]);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [color, setColor] = useState(product.colors?.[0]);
  return <section className="product-detail"><div className="gallery"><div className="thumbs">{images.map((image, i) => <button key={`${image}-${i}`} className={activeImage === image ? "thumb active" : "thumb"} onClick={() => setActiveImage(image)}><img src={image} alt={`${product.name} view ${i + 1}`} /></button>)}</div><img className="detail-image" src={activeImage} alt={product.name} /></div><div className="detail-info"><p className="eyebrow">Shree Fashion</p><h1>{product.name}</h1><p className="detail-price">{formatPrice(product.price)} {product.compare_at_price && Number(product.compare_at_price) > Number(product.price) && <del>{formatPrice(product.compare_at_price)}</del>}</p>{product.description && <p className="description">{product.description}</p>}{product.colors?.length ? <fieldset><legend>Colour: <b>{color}</b></legend><div className="option-row">{product.colors.map(item => <button key={item} className={color === item ? "option selected" : "option"} onClick={() => setColor(item)}>{item}</button>)}</div></fieldset> : null}{product.sizes?.length ? <fieldset><legend>Size: <b>{size}</b></legend><div className="option-row">{product.sizes.map(item => <button key={item} className={size === item ? "option selected" : "option"} onClick={() => setSize(item)}>{item}</button>)}</div></fieldset> : null}<AddToBag product={product} size={size} color={color} /><p className="stock-note">{product.stock > 0 ? `${product.stock} piece${product.stock === 1 ? "" : "s"} available` : "Currently unavailable"}</p></div></section>;
}
