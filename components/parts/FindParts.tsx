"use client";

import { MapPin } from "lucide-react";
import { useLocationZip } from "@/components/location/LocationProvider";
import { itemSearchUrl, PARTS_STORES, storeLocatorUrl } from "@/lib/parts/stores";
import type { ShopItem } from "@/lib/parts/types";

export function FindParts({
  items,
  emptyHint,
}: {
  items: ShopItem[];
  emptyHint?: string;
}) {
  const { zip, setZip, locate, locating } = useLocationZip();

  return (
    <div className="border border-white/10 p-3 space-y-3">
      <p className="text-[10px] uppercase tracking-[0.25em] text-garage-amber">Find it</p>
      <p className="text-xs text-garage-steel">
        Same ZIP on every bay. We send you to the store with the search already filled. Inventory is theirs.
      </p>
      <label className="block text-[10px] uppercase tracking-[0.2em] text-garage-steel">
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
      {items.length === 0 ? (
        <p className="text-sm text-garage-steel">{emptyHint ?? "Select a vehicle to build the list."}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="border border-white/10 p-3">
              <p className="font-semibold">{item.name}</p>
              <p className="text-xs text-garage-steel mt-1">{item.detail}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {PARTS_STORES.map((store) => (
                  <a
                    key={store.id}
                    href={itemSearchUrl(store.id, item.search, zip)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-garage-amber/40 px-2 py-1 text-[10px] uppercase tracking-widest text-garage-amber hover:bg-garage-amber/10"
                  >
                    {store.label}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-2 pt-1">
        {PARTS_STORES.map((store) => (
          <a
            key={store.id}
            href={storeLocatorUrl(store.id, zip)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-widest text-garage-steel hover:text-garage-amber"
          >
            {store.label} near {zip || "you"} →
          </a>
        ))}
      </div>
    </div>
  );
}
