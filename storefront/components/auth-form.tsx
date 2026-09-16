"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const safeNext = (value: string | null) => value?.startsWith("/") && !value.startsWith("//") ? value : "/account";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || ""); const password = String(form.get("password") || "");
    const supabase = createClient();
    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: String(form.get("fullName") || "") }, emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext(searchParams.get("next")))}` } });
      if (error) setMessage(error.message);
      else if (data.session) router.replace(safeNext(searchParams.get("next")));
      else setMessage("Check your email to confirm your account, then sign in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message); else router.replace(safeNext(searchParams.get("next")));
    }
    setLoading(false);
  };
  return <section className="auth-page"><div className="auth-card"><p className="eyebrow">Shree Fashion</p><h1>{isSignup ? "Create an account" : "Welcome back"}</h1><p className="auth-intro">{isSignup ? "Create an account to save addresses and track your orders." : "Sign in to manage your orders and continue checkout."}</p><form onSubmit={submit} className="auth-form">{isSignup && <label>Full name<input name="fullName" autoComplete="name" required /></label>}<label>Email address<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} minLength={6} required /></label>{message && <p className="form-message" role="status">{message}</p>}<button className="auth-submit" disabled={loading}>{loading ? "Please wait…" : isSignup ? "Create account" : "Sign in"}</button></form><p className="auth-switch">{isSignup ? "Already have an account?" : "New to Shree Fashion?"} <Link href={isSignup ? `/account/login?next=${encodeURIComponent(safeNext(searchParams.get("next")))}` : `/account/signup?next=${encodeURIComponent(safeNext(searchParams.get("next")))}`}>{isSignup ? "Sign in" : "Create one"}</Link></p></div></section>;
}
