"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function UpdatePasswordForm() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // The recovery link (via /auth/callback) leaves the user with an active
    // session. If there's no session, the link was invalid/expired.
    createClient().auth.getUser().then(({ data: { user } }) => {
      setReady(Boolean(user));
      if (!user) setMessage("This reset link is invalid or has expired. Request a new one from the sign-in page.");
    });
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }
    const { error } = await createClient().auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }
    router.replace("/account");
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Shree Fashion</p>
        <h1>Set a new password</h1>
        <p className="auth-intro">Choose a new password for your account.</p>
        {ready && (
          <form onSubmit={submit} className="auth-form">
            <label>
              New password
              <input name="password" type="password" autoComplete="new-password" minLength={6} required />
            </label>
            <label>
              Confirm new password
              <input name="confirm" type="password" autoComplete="new-password" minLength={6} required />
            </label>
            {message && <p className="form-message" role="status">{message}</p>}
            <button className="auth-submit" disabled={loading}>{loading ? "Please wait…" : "Update password"}</button>
          </form>
        )}
        {!ready && message && <p className="form-message" role="status">{message}</p>}
      </div>
    </section>
  );
}
