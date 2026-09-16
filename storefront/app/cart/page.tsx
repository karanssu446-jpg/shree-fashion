"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/store";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  if (!items.length) return <section className="empty-cart"><p className="eyebrow">Your bag</p><h1>Your bag is waiting.</h1><p>Add pieces you love and they’ll appear here.</p><Link href="/products" className="button-dark">Continue shopping</Link></section>;
  return <section className="cart-page"><div className="cart-heading"><p className="eyebrow">Your bag</p><h1>Shopping bag</h1></div><div className="cart-layout"><div className="cart-items">{items.map((item) => <article className="cart-item" key={item.key}><Link href={`/products/${item.slug}`} className="cart-image"><img src={item.image || "/product-placeholder.svg"} alt={item.name} /></Link><div className="cart-item-info"><div><Link href={`/products/${item.slug}`}><h2>{item.name}</h2></Link><p>{[item.color, item.size].filter(Boolean).join(" · ") || "Standard"}</p></div><p className="cart-item-price">{formatPrice(item.price)}</p><div className="cart-item-controls"><div className="quantity-control"><button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label={`Reduce ${item.name} quantity`}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}>+</button></div><button className="remove-button" onClick={() => removeItem(item.key)}>Remove</button></div></div></article>)}</div><aside className="cart-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p>Shipping and taxes are calculated at checkout.</p><button className="checkout-button" type="button">Checkout coming soon</button><Link href="/products" className="continue-link">← Continue shopping</Link></aside></div></section>;
}
