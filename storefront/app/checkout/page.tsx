import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckoutForm } from "./checkout-form";
import { createClient } from "@/lib/supabase/server";

export default async function CheckoutPage() {
  const { data: { user } } = await createClient().auth.getUser();
  if (!user) redirect("/account/login?next=/checkout");
  return <section className="checkout-page"><CheckoutForm email={user.email || ""} /><Link className="continue-link checkout-back" href="/cart">← Return to bag</Link></section>;
}
