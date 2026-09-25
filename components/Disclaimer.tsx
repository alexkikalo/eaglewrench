import { AlertTriangle } from "lucide-react";
import { LONG_DISCLAIMER, SHORT_DISCLAIMER } from "@/lib/disclaimer";

export function SafetyBar() {
  return (
    <div className="shrink-0 border-b border-safety/70 bg-safety/10 text-[#ffd4d4]">
      <div className="hazard-stripe h-1" />
      <div className="w-full px-4 py-2 flex gap-2 items-center">
        <AlertTriangle className="h-4 w-4 shrink-0 text-safety" aria-hidden />
        <p className="text-xs sm:text-sm leading-snug">
          <span className="font-semibold uppercase tracking-wide text-safety">Safety. </span>
          {SHORT_DISCLAIMER}
        </p>
      </div>
    </div>
  );
}

export function DisclaimerBanner({ full = false }: { full?: boolean }) {
  return (
    <div className="border border-safety/70 bg-safety/10 text-[#ffd4d4]">
      <div className="hazard-stripe h-1.5" />
      <div className="px-4 py-3 flex gap-3 items-start">
        <AlertTriangle className="h-5 w-5 shrink-0 text-safety mt-0.5" aria-hidden />
        <p className="text-sm leading-relaxed">
          <span className="font-semibold uppercase tracking-wide text-safety">Safety. </span>
          {full ? LONG_DISCLAIMER : SHORT_DISCLAIMER}
        </p>
      </div>
    </div>
  );
}
