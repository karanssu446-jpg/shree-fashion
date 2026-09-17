import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ratelimit } from "@/lib/ratelimit";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const ip = headers().get("x-forwarded-for") ?? "unknown";
    const { success } = await ratelimit.limit(ip);
    if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    const { email, password } = await request.json();
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to sign in right now" }, { status: 500 });
  }
}