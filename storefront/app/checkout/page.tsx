import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function CheckoutPage() {
  const { data: { user } } = await createClient().auth.getUser();
  if (!user) redirect("/account/login?next=/checkout");
  return <section className="checkout-page"><p className="eyebrow">Checkout</p><h1>You’re signed in.</h1><p>Payment and order confirmation will be enabled with Razorpay in the next checkout phase.</p><Link className="button-dark" href="/cart">Return to bag</Link></section>;
}
