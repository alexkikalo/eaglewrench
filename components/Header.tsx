import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { VehicleChip } from "@/components/vehicle/VehicleChip";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-garage-950/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 min-h-20 py-2 flex items-center justify-between gap-3">
        <BrandMark compact />
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <VehicleChip />
          <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm uppercase tracking-widest text-garage-steel shrink-0">
            <Link href="/oil-change" className="hover:text-garage-amber">
              Oil Change
            </Link>
            <Link href="/#waitlist" className="hidden sm:inline hover:text-garage-amber">
              Waitlist
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
