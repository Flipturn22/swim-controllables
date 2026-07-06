"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { isSupabaseConfigured, getSupabaseClient } from "@/lib/supabase/client";
import { pushAppDataToCloud } from "@/lib/supabase/sync";
import { loadData } from "@/lib/storage";

export default function SyncPage() {
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const configured = isSupabaseConfigured();

  const refreshSession = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    const { data } = await supabase.auth.getUser();
    setUserEmail(data.user?.email ?? null);
  }, []);

  useEffect(() => {
    void refreshSession();
    const supabase = getSupabaseClient();
    if (!supabase) return;
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      void refreshSession();
    });
    return () => sub.subscription.unsubscribe();
  }, [refreshSession]);

  async function sendMagicLink() {
    const supabase = getSupabaseClient();
    if (!supabase || !email.trim()) return;
    setBusy(true);
    setStatus(null);
    const redirectTo = `${window.location.origin}/sync`;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });
    setBusy(false);
    setStatus(
      error
        ? error.message
        : "Check your email — tap the link, then come back here and tap Sync now."
    );
  }

  async function syncNow() {
    setBusy(true);
    setStatus(null);
    const result = await pushAppDataToCloud(loadData());
    setBusy(false);
    setStatus(result.ok ? `✓ ${result.message}` : result.message);
  }

  async function signOut() {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUserEmail(null);
    setStatus("Signed out.");
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-lg px-6 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">Cloud sync (demo)</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Sign in once, then your phone logs copy to Supabase so you can explore them in
          Table Editor or SQL.
        </p>

        {!configured && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Supabase env vars are missing on this deployment. Add{" "}
            <code className="text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in Vercel, then
            redeploy.
          </div>
        )}

        {configured && !userEmail && (
          <div className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-slate-700">Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input"
              autoComplete="email"
            />
            <button
              type="button"
              onClick={() => void sendMagicLink()}
              disabled={busy || !email.trim()}
              className="btn-primary"
            >
              {busy ? "Sending…" : "Send magic link"}
            </button>
          </div>
        )}

        {configured && userEmail && (
          <div className="mt-8 space-y-4">
            <p className="text-sm text-slate-600">
              Signed in as <span className="font-medium text-slate-900">{userEmail}</span>
            </p>
            <button
              type="button"
              onClick={() => void syncNow()}
              disabled={busy}
              className="btn-primary"
            >
              {busy ? "Syncing…" : "Sync now"}
            </button>
            <p className="text-xs text-slate-500">
              New check-ins also sync automatically after you save them.
            </p>
            <button
              type="button"
              onClick={() => void signOut()}
              className="text-sm text-slate-500 underline"
            >
              Sign out
            </button>
          </div>
        )}

        {status && (
          <p className="mt-6 rounded-xl border border-[#e7e2d9] bg-white p-4 text-sm text-slate-700">
            {status}
          </p>
        )}

        <p className="mt-8 text-sm">
          <Link href="/dashboard" className="font-medium text-[#0f4c5c] hover:underline">
            ← Back to dashboard
          </Link>
        </p>
      </main>
    </div>
  );
}
