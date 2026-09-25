"use client";

import { useState } from "react";
import { Car } from "lucide-react";
import { vehicleChipLabel } from "@/lib/vehicle/catalog";
import { useVehicle } from "@/components/vehicle/VehicleProvider";
import { VehiclePicker } from "@/components/vehicle/VehiclePicker";

export function VehicleChip() {
  const { vehicle, ready } = useVehicle();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 max-w-[46vw] sm:max-w-none truncate border border-garage-amber/50 px-3 py-2 text-xs uppercase tracking-widest text-garage-amber hover:bg-garage-amber/10"
      >
        <Car className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">
          {!ready ? "Vehicle…" : vehicle ? shortLabel(vehicleChipLabel(vehicle)) : "Select vehicle"}
        </span>
      </button>
      <VehiclePicker open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function shortLabel(label: string) {
  return label.length > 34 ? `${label.slice(0, 32)}…` : label;
}
