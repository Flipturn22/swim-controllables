import Link from "next/link";
import { FlipturnMark } from "@/components/brand/FlipturnMark";

const NAV = [
  { href: "/dashboard", label: "Home" },
  { href: "/check-in", label: "Check-in" },
  { href: "/weekly", label: "Weekly" },
  { href: "/times", label: "Times" },
  { href: "/trends", label: "Clues" },
  { href: "/learn", label: "Learn" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#e7e2d9] bg-[#f7f5f1]/95 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-3 sm:py-4">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <FlipturnMark size={28} className="rounded-md" />
            <span className="text-lg font-semibold text-slate-800">Flipturn</span>
          </Link>
          <nav className="-mr-2 flex max-w-[65%] gap-1 overflow-x-auto sm:max-w-none sm:gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-lg px-2.5 py-2 text-sm text-slate-600 hover:bg-white/80 hover:text-slate-900 sm:px-0 sm:py-0 sm:hover:bg-transparent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
