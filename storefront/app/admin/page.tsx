import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import type { Category, Product } from "@/lib/supabase/types";
import { requireAdmin } from "@/lib/supabase/admin-auth";

type AdminOrder = { id: string; user_id: string; status: string; total: number | string; created_at: string; razorpay_payment_id: string | null; addresses: { full_name: string; line1: string; line2: string | null; city: string; state: string; pincode: string; phone: string } | null };

export default async function AdminPage() {
  const { user, supabase, isAdmin } = await requireAdmin();
  if (!user) redirect("/account/login?next=/admin");
  if (!isAdmin) redirect("/");
  const [{ data: products }, { data: categories }, { data: orders }] = await Promise.all([
    supabase.from("products").select("*").order("created_at", { ascending: false }),
    supabase.from("categories").select("*").order("name"),
    supabase.from("orders").select("id, user_id, status, total, created_at, razorpay_payment_id, addresses(full_name, line1, line2, city, state, pincode, phone)").order("created_at", { ascending: false }),
  ]);
  return <AdminDashboard initialProducts={(products ?? []) as Product[]} categories={(categories ?? []) as Category[]} initialOrders={(orders ?? []) as unknown as AdminOrder[]} />;
}
