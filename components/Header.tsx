import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-garage-950/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-20 flex items-center justify-between gap-4">
        <BrandMark compact />
        <nav className="flex items-center gap-5 text-sm uppercase tracking-widest text-garage-steel">
          <Link href="/oil-change" className="hover:text-garage-amber">
            Oil Change
          </Link>
          <Link href="/#waitlist" className="hover:text-garage-amber">
            Waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
