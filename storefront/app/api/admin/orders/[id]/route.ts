import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";

const statusSchema = z.object({ status: z.enum(["paid", "shipped", "delivered", "cancelled"]) });

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { isAdmin } = await requireAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    const parsed = statusSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid order status" }, { status: 400 });
    const { data, error } = await createAdminClient().from("orders").update({ status: parsed.data.status }).eq("id", params.id).select("id, status").single();
    if (error) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json({ order: data });
  } catch (error) {
    console.error("Admin order update failed", error);
    return NextResponse.json({ error: "Unable to update order" }, { status: 400 });
  }
}
