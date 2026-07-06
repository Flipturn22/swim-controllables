"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadData } from "@/lib/storage";
import type { SwimmerProfile } from "@/lib/types";

export function RequireProfile({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [profile, setProfile] = useState<SwimmerProfile | null | undefined>(undefined);

  useEffect(() => {
    const data = loadData();
    if (!data.profile) {
      router.replace("/onboard");
      return;
    }
    setProfile(data.profile);
  }, [router]);

  if (profile === undefined) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-500">
        Loading…
      </div>
    );
  }

  return <>{children}</>;
}
