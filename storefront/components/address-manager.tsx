"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type Address = { id: string; full_name: string; line1: string; line2: string | null; city: string; state: string; pincode: string; phone: string; is_default: boolean };

export function AddressManager({ initialAddresses }: { initialAddresses: Address[] }) {
  const [addresses, setAddresses] = useState(initialAddresses); const [adding, setAdding] = useState(false); const [message, setMessage] = useState("");
  const addAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setMessage(""); const form = new FormData(event.currentTarget); const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser(); if (!user) return setMessage("Please sign in again.");
    const address = { user_id: user.id, full_name: String(form.get("fullName")), line1: String(form.get("line1")), line2: String(form.get("line2") || "") || null, city: String(form.get("city")), state: String(form.get("state")), pincode: String(form.get("pincode")), phone: String(form.get("phone")), is_default: !addresses.length };
    const { data, error } = await supabase.from("addresses").insert(address).select().single();
    if (error) setMessage(error.message); else { setAddresses((current) => [...current, data as Address]); setAdding(false); event.currentTarget.reset(); }
  };
  const removeAddress = async (id: string) => { const { error } = await createClient().from("addresses").delete().eq("id", id); if (error) setMessage(error.message); else setAddresses((current) => current.filter((address) => address.id !== id)); };
  return <section className="account-section"><div className="account-section-heading"><div><p className="eyebrow">Saved addresses</p><h2>Delivery addresses</h2></div><button className="secondary-button" onClick={() => setAdding((value) => !value)}>{adding ? "Close" : "Add address"}</button></div>{message && <p className="form-message">{message}</p>}{adding && <form className="address-form" onSubmit={addAddress}><label>Full name<input name="fullName" required /></label><label>Phone number<input name="phone" type="tel" required /></label><label className="wide">Address line 1<input name="line1" required /></label><label className="wide">Address line 2 <span>(optional)</span><input name="line2" /></label><label>City<input name="city" required /></label><label>State<input name="state" required /></label><label>Pincode<input name="pincode" inputMode="numeric" required /></label><button className="auth-submit" type="submit">Save address</button></form>}{addresses.length ? <div className="address-grid">{addresses.map((address) => <article className="address-card" key={address.id}>{address.is_default && <span className="default-chip">Default</span>}<strong>{address.full_name}</strong><p>{address.line1}{address.line2 && <><br />{address.line2}</>}<br />{address.city}, {address.state} — {address.pincode}<br />{address.phone}</p><button className="remove-button" onClick={() => removeAddress(address.id)}>Remove</button></article>)}</div> : !adding && <p className="account-empty">No saved addresses yet.</p>}</section>;
}
