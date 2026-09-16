import { redirect } from "next/navigation";
import { AccountActions } from "@/components/account-actions";
import { AddressManager, type Address } from "@/components/address-manager";
import { formatPrice } from "@/lib/store";
import { createClient } from "@/lib/supabase/server";

type Order = { id: string; status: string; total: number | string; created_at: string };

export default async function AccountPage() {
  const supabase = createClient(); const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/account/login?next=/account");
  const [{ data: profile }, { data: addresses }, { data: orders }] = await Promise.all([supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle(), supabase.from("addresses").select("id, full_name, line1, line2, city, state, pincode, phone, is_default").order("is_default", { ascending: false }), supabase.from("orders").select("id, status, total, created_at").order("created_at", { ascending: false })]);
  const customerName = (profile as { full_name?: string | null } | null)?.full_name || user.email?.split("@")[0] || "there";
  return <section className="account-page"><div className="account-hero"><div><p className="eyebrow">My account</p><h1>Hello, {customerName}.</h1><p>{user.email}</p></div><AccountActions /></div><section className="account-section"><div className="account-section-heading"><div><p className="eyebrow">Orders</p><h2>Order history</h2></div></div>{(orders as Order[] | null)?.length ? <div className="order-list">{(orders as Order[]).map((order) => <article className="order-row" key={order.id}><div><strong>Order #{order.id.slice(0, 8).toUpperCase()}</strong><p>{new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(order.created_at))}</p></div><span className={`order-status status-${order.status}`}>{order.status}</span><strong>{formatPrice(order.total)}</strong></article>)}</div> : <p className="account-empty">You have not placed an order yet.</p>}</section><AddressManager initialAddresses={(addresses ?? []) as Address[]} /></section>;
}
