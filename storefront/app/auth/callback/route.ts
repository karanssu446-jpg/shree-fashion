import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code"); const next = request.nextUrl.searchParams.get("next");
  if (code) await createClient().auth.exchangeCodeForSession(code);
  const destination = next?.startsWith("/") && !next.startsWith("//") ? next : "/account";
  return NextResponse.redirect(new URL(destination, request.url));
}
