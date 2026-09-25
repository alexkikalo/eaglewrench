"use client";

import { useLocationZip } from "@/components/location/LocationProvider";
import { ZipField } from "@/components/location/ZipField";
import { itemSearchUrl, PARTS_STORES, storeLocatorUrl } from "@/lib/parts/stores";
import type { ShopItem } from "@/lib/parts/types";

export function FindParts({
  items,
  emptyHint,
}: {
  items: ShopItem[];
  emptyHint?: string;
}) {
  const { zip } = useLocationZip();

  return (
    <div className="border border-white/10 p-3 space-y-3">
      <p className="text-[10px] uppercase tracking-[0.25em] text-garage-amber">Find it</p>
      <p className="text-xs text-garage-steel">
        Same ZIP on every bay. We send you to the store with the search already filled. Inventory is theirs.
      </p>
      <ZipField />
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
