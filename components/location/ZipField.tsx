"use client";

import { MapPin } from "lucide-react";
import { useLocationZip } from "@/components/location/LocationProvider";

export function ZipField() {
  const { zip, setZip, locate, locating } = useLocationZip();

  return (
    <label className="text-[10px] uppercase tracking-[0.2em] text-garage-steel block">
      ZIP
      <span className="mt-1 flex gap-2">
        <input
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="75019"
          className="w-28 bg-garage-950 border border-white/15 px-2 py-2 text-sm text-garage-amber tracking-widest"
        />
        <button
          type="button"
          onClick={() => void locate()}
          className="inline-flex items-center gap-1 border border-white/15 px-2 py-2 text-[10px] uppercase tracking-widest text-garage-steel hover:text-garage-amber"
        >
          <MapPin className="h-3 w-3" />
          {locating ? "Locating…" : "Use location"}
        </button>
      </span>
    </label>
  );
}
