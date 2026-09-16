"use client";

import { FormEvent, useEffect, useState } from "react";
import { useCart, type CartItem } from "@/components/cart-provider";
import { formatPrice } from "@/lib/store";

type Address = { fullName: string; line1: string; line2: string; city: string; state: string; pincode: string; phone: string };
type RazorpayOptions = { key: string; amount: number; currency: string; name: string; description: string; order_id: string; prefill: { name: string; email: string; contact: string }; theme: { color: string }; handler: (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void; modal: { ondismiss: () => void } };
type RazorpayInstance = { open: () => void };
declare global { interface Window { Razorpay: new (options: RazorpayOptions) => RazorpayInstance } }

const emptyAddress: Address = { fullName: "", line1: "", line2: "", city: "", state: "", pincode: "", phone: "" };

function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function CheckoutForm({ email }: { email: string }) {
  const { items, subtotal, clearCart } = useCart();
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { setMessage(""); }, [items.length]);

  const update = (field: keyof Address) => (event: React.ChangeEvent<HTMLInputElement>) => setAddress((current) => ({ ...current, [field]: event.target.value }));
  const startPayment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) return setMessage("Your bag is empty.");
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/razorpay/create-order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: items.map(({ productId, quantity, size, color }) => ({ productId, quantity, size, color })), address }) });
      const order = await response.json();
      if (!response.ok) throw new Error(order.error || "Unable to start payment");
      if (!(await loadRazorpay())) throw new Error("Payment checkout could not load. Check your connection and try again.");
      const razorpay = new window.Razorpay({ key: order.keyId, amount: order.amount, currency: order.currency, name: "Shree Fashion", description: "Your Shree Fashion order", order_id: order.orderId, prefill: { name: address.fullName, email, contact: address.phone }, theme: { color: "#7e263e" }, modal: { ondismiss: () => setBusy(false) }, handler: async (payment) => {
        try {
          const verification = await fetch("/api/razorpay/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payment, items: items.map(({ productId, quantity, size, color }) => ({ productId, quantity, size, color })), address }) });
          const result = await verification.json();
          if (!verification.ok) throw new Error(result.error || "Payment verification failed");
          clearCart();
          window.location.href = `/account?order=${result.orderId}`;
        } catch (error) {
          setBusy(false);
          setMessage(error instanceof Error ? error.message : "Payment verification failed");
        }
      } });
      razorpay.open();
    } catch (error) { setBusy(false); setMessage(error instanceof Error ? error.message : "Unable to start payment"); }
  };

  return <form className="checkout-layout" onSubmit={startPayment}><div className="checkout-form-panel"><p className="eyebrow">Delivery details</p><h1>Where should we send it?</h1><div className="address-form checkout-address-form"><label>Full name<input value={address.fullName} onChange={update("fullName")} required autoComplete="name" /></label><label>Phone number<input value={address.phone} onChange={update("phone")} required type="tel" inputMode="tel" autoComplete="tel" /></label><label className="wide">Address line 1<input value={address.line1} onChange={update("line1")} required autoComplete="address-line1" /></label><label className="wide">Address line 2 <span>(optional)</span><input value={address.line2} onChange={update("line2")} autoComplete="address-line2" /></label><label>City<input value={address.city} onChange={update("city")} required autoComplete="address-level2" /></label><label>State<input value={address.state} onChange={update("state")} required autoComplete="address-level1" /></label><label>Pincode<input value={address.pincode} onChange={update("pincode")} required inputMode="numeric" maxLength={6} autoComplete="postal-code" /></label></div>{message && <p className="form-message" role="alert">{message}</p>}<button className="auth-submit checkout-submit" type="submit" disabled={busy}>{busy ? "Opening payment..." : `Pay ${formatPrice(subtotal)}`}</button><p className="checkout-note">You will complete payment securely through Razorpay.</p></div><aside className="checkout-summary"><p className="eyebrow">Your order</p><h2>Order summary</h2>{items.map((item: CartItem) => <div className="checkout-line" key={item.key}><span>{item.name} × {item.quantity}<small>{[item.color, item.size].filter(Boolean).join(" · ") || "Standard"}</small></span><strong>{formatPrice(item.price * item.quantity)}</strong></div>)}<div className="checkout-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div></aside></form>;
}
