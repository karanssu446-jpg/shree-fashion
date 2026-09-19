"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AdminHeader() {
  const router = useRouter();
  const signOut = async () => {
    await createClient().auth.signOut();
    router.replace("/");
    router.refresh();
  };
  return (
    <header className="admin-header">
      <Link href="/admin" className="admin-header-brand">
        Shree Fashion <span>Admin</span>
      </Link>
      <nav className="admin-header-nav">
        <Link href="/" target="_blank" rel="noopener noreferrer">View storefront</Link>
        <button onClick={signOut}>Sign out</button>
      </nav>
    </header>
  );
}
