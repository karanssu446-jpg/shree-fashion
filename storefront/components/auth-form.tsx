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
  const isAdminNext = safeNext(searchParams.get("next")).startsWith("/admin");
  const isSignup = mode === "signup" && !isAdminNext;
  const continueWithGoogle = async () => {
    setLoading(true);
    setMessage("");
    try {
      const { error } = await createClient().auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext(searchParams.get("next")))}` },
      });
      if (error) {
        setMessage(error.message);
        setLoading(false);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to continue with Google.");
      setLoading(false);
    }
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || ""); const password = String(form.get("password") || "");
    if (isSignup) {
      const response = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, fullName: String(form.get("fullName") || ""), emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext(searchParams.get("next")))}` }) });
      const result = await response.json();
      if (!response.ok) setMessage(result.error);
      else if (result.hasSession) router.replace(safeNext(searchParams.get("next")));
      else setMessage("Check your email to confirm your account, then sign in.");
    } else {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const result = await response.json();
      if (!response.ok) setMessage(result.error); else router.replace(safeNext(searchParams.get("next")));
    }
    setLoading(false);
  };
  return <section className="auth-page"><div className="auth-card"><p className="eyebrow">{isAdminNext ? "Shree Fashion Admin" : "Shree Fashion"}</p><h1>{isAdminNext ? "Admin sign in" : isSignup ? "Create an account" : "Welcome back"}</h1><p className="auth-intro">{isAdminNext ? "Restricted access. Sign in with your admin account." : isSignup ? "Create an account to save addresses and track your orders." : "Sign in to manage your orders and continue checkout."}</p>{!isAdminNext && <><button className="google-button" type="button" onClick={continueWithGoogle} disabled={loading}><img src="/google-icon-source.webp" alt="" />{loading ? "Please wait…" : "Continue with Google"}</button><div className="auth-divider"><span>or</span></div></>}<form onSubmit={submit} className="auth-form">{isSignup && !isAdminNext && <label>Full name<input name="fullName" autoComplete="name" required /></label>}<label>Email address<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} minLength={6} required /></label>{message && <p className="form-message" role="status">{message}</p>}<button className="auth-submit" disabled={loading}>{loading ? "Please wait…" : isAdminNext ? "Sign in" : isSignup ? "Create account" : "Sign in"}</button></form>{!isAdminNext && <p className="auth-switch">{isSignup ? "Already have an account?" : "New to Shree Fashion?"} <Link href={isSignup ? `/account/login?next=${encodeURIComponent(safeNext(searchParams.get("next")))}` : `/account/signup?next=${encodeURIComponent(safeNext(searchParams.get("next")))}`}>{isSignup ? "Sign in" : "Create one"}</Link></p>}</div></section>;
}
