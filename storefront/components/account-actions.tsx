"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AccountActions() {
  const router = useRouter();
  const signOut = async () => { await createClient().auth.signOut(); router.replace("/"); router.refresh(); };
  return <button className="signout-button" onClick={signOut}>Sign out</button>;
}
