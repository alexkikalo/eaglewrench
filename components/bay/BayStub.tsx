"use client";

import Link from "next/link";
import { DisclaimerBanner } from "@/components/Disclaimer";
import { FindParts } from "@/components/parts/FindParts";
import { useVehicle } from "@/components/vehicle/VehicleProvider";
import { vehicleChipLabel } from "@/lib/vehicle/catalog";
import { shopItemsForBay } from "@/lib/parts/for-bay";
import type { Bay } from "@/lib/bays";

export function BayStub({ bay }: { bay: Bay }) {
  const { vehicle, ready } = useVehicle();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-4">
      <p className="text-xs uppercase tracking-[0.3em] text-garage-amber">Bay</p>
      <h1 className="font-stencil text-5xl tracking-wide">{bay.label}</h1>
      <p className="text-garage-steel max-w-prose">{bay.summary}</p>
      <DisclaimerBanner />
      <div className="steel-panel p-4 text-sm">
        {!ready ? (
          <p className="text-garage-steel">Loading vehicle…</p>
        ) : vehicle ? (
          <p>
            <span className="uppercase tracking-widest text-garage-amber text-[10px]">This vehicle</span>
            <span className="block mt-1 text-lg">{vehicleChipLabel(vehicle)}</span>
            <span className="block text-garage-steel">{vehicle.engine}</span>
          </p>
        ) : (
          <p className="text-garage-steel">Select a vehicle in the header. Specs will overlay this bay when they exist.</p>
        )}
      </div>
      <FindParts
        items={shopItemsForBay(bay.slug, vehicle)}
        emptyHint={
          vehicle
            ? "This bay is a procedure. No consumable list yet."
            : "Select a vehicle in the header to build the list."
        }
      />
      <div className="steel-panel min-h-[220px] grid place-items-center text-center px-6">
        <p className="text-garage-steel">3D for this bay is next. Oil change is the live interactive bay.</p>
        <Link href="/oil-change" className="mt-3 text-garage-amber uppercase tracking-widest text-xs hover:underline">
          Open oil change →
        </Link>
      </div>
      <ol className="space-y-3">
        {bay.steps.map((step, i) => (
          <li key={step} className="steel-panel p-4">
            <p className="font-stencil text-2xl text-garage-amber">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1 text-garage-steel">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
