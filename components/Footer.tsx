import { LONG_DISCLAIMER } from "@/lib/disclaimer";
import { BrandMark } from "@/components/BrandMark";

export function Footer() {
  return (
    <footer className="shrink-0 border-t border-white/10 bg-garage-950">
      <div className="w-full px-4 py-6 grid gap-4 md:grid-cols-[1fr_2fr]">
        <BrandMark />
        <p className="text-xs leading-relaxed text-garage-steel">{LONG_DISCLAIMER}</p>
      </div>
      <div className="border-t border-white/5 px-4 py-3 text-center text-[11px] tracking-widest uppercase text-garage-steel/80">
        © {new Date().getFullYear()} EagleWrench · eaglewrench.com · Demonstration, not a shop ticket
      </div>
    </footer>
  );
}
