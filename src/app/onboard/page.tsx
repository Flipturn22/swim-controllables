"use client";

import Link from "next/link";
import { ProfileSignupForm } from "@/components/onboard/ProfileSignupForm";

export default function OnboardPage() {
  return (
    <div className="min-h-screen">
      <header className="px-4 pt-6 sm:px-6">
        <Link href="/" className="text-lg font-medium text-slate-800">
          Off Deck
        </Link>
      </header>
      <main className="mx-auto max-w-xl px-4 py-6 sm:px-6 sm:py-8">
        <ProfileSignupForm />
      </main>
    </div>
  );
}
