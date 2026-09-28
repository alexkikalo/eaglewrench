"use client";

import { FindParts } from "@/components/parts/FindParts";
import { useVehicle } from "@/components/vehicle/VehicleProvider";
import { vehicleChipLabel } from "@/lib/vehicle/catalog";
import { shopItemsForBay } from "@/lib/parts/for-bay";
import type { Bay } from "@/lib/bays";

export function BayStub({ bay }: { bay: Bay }) {
  const { vehicle, ready } = useVehicle();

  return (
    <div className="bay-frame">
      <div className="bay-shell">
        <section className="bay-preview steel-panel relative overflow-hidden grid place-items-center px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-garage-amber absolute left-3 top-3">{bay.label}</p>
          <div>
            <p className="font-stencil text-4xl tracking-wide">{bay.label}</p>
            <p className="mt-2 text-garage-steel">{bay.summary}</p>
            <p className="mt-2 text-sm text-garage-steel">3D for this job is not built yet.</p>
          </div>
        </section>
        <section className="bay-steps steel-panel p-4 space-y-4">
          <div className="border border-garage-amber/40 p-3 text-sm">
            {!ready ? (
              <p className="text-garage-steel">Loading vehicle…</p>
            ) : vehicle ? (
              <>
                <p className="text-[10px] uppercase tracking-[0.25em] text-garage-amber">This vehicle</p>
                <p className="font-semibold mt-1">{vehicleChipLabel(vehicle)}</p>
                <p className="text-garage-steel mt-1">{vehicle.engine}</p>
              </>
            ) : (
              <p className="text-garage-steel">Select a vehicle in the header. Specs overlay this bay when they exist.</p>
            )}
          </div>
          <FindParts
            items={shopItemsForBay(bay.slug, vehicle)}
            emptyHint={vehicle ? "This bay is a procedure. No consumable list yet." : "Select a vehicle in the header to build the list."}
          />
          <ol className="space-y-2 pr-1">
            {bay.steps.map((step, i) => (
              <li key={step} className="border border-white/10 px-3 py-2">
                <p className="font-stencil text-xl text-garage-amber">{String(i + 1).padStart(2, "0")}</p>
                <p className="text-sm text-garage-steel mt-1">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
