import type { OilStep } from "@/lib/oil-content";
import { AFFILIATES, PARTS, TOOLS } from "@/lib/oil-content";
import { vehicleLabel } from "@/lib/vehicle/catalog";
import type { Vehicle } from "@/lib/vehicle/types";

export function overlayOilSteps(steps: OilStep[], vehicle: Vehicle | null): OilStep[] {
  if (!vehicle) return steps;
  const { oil } = vehicle;
  const qty = `${oil.capacityWithFilterQt} qt with filter`;
  const filterHow =
    oil.filterStyle === "cartridge"
      ? `This vehicle uses a cartridge filter (OEM ${oil.filterOem}). Cap the housing, swap the element, and replace the housing O-rings — do not reuse dry rings.`
      : `This vehicle uses a spin-on filter (OEM ${oil.filterOem}). Oil the new gasket, thread by hand, then follow the filter instruction.`;

  return steps.map((step) => {
    if (step.id === 6) {
      return { ...step, body: `${filterHow} Place the drain pan under the housing. Keep the old filter upright until the residual oil is in the pan.` };
    }
    if (step.id === 7) {
      return {
        ...step,
        body:
          oil.filterStyle === "cartridge"
            ? `Install the new element and lubricated O-rings. Torque the housing cap to the figure in the service information — do not guess. OEM reference: ${oil.filterOem}.`
            : `Wipe the pad. Confirm the old gasket came off. Lightly oil the new gasket, thread ${oil.filterOem} (or equivalent) by hand until it seats, then follow the can — often about 3/4 turn.`,
      };
    }
    if (step.id === 8) {
      return {
        ...step,
        body: `Lower the vehicle. Fill with ${oil.viscosity} meeting ${oil.spec}. Published refill is ${qty}${oil.capacityNote ? ` (${oil.capacityNote})` : ""}. Start with a little less than the published figure, run, shut down, wait, then finish on the dipstick. Source: ${oil.source}.`,
      };
    }
    return step;
  });
}

export function overlayTools(vehicle: Vehicle | null) {
  if (!vehicle) return TOOLS;
  const { oil } = vehicle;
  return [
    ...TOOLS.filter((t) => !t.name.startsWith("New filter")),
    { name: `Oil — ${oil.viscosity}, ${oil.capacityWithFilterQt} qt`, why: `Buy ${oil.viscosity} that meets ${oil.spec}. Published with-filter fill is ${oil.capacityWithFilterQt} qt. Confirm on the cap.` },
    { name: `Filter — ${oil.filterOem}`, why: oil.filterStyle === "cartridge" ? "Cartridge housing. Replace the element and the O-rings together." : "Spin-on canister. Match thread and gasket OD to the OEM number." },
  ];
}

export function overlayAffiliates(vehicle: Vehicle | null) {
  if (!vehicle) return AFFILIATES;
  const { oil } = vehicle;
  return AFFILIATES.map((a) => {
    if (a.id === "oil") return { ...a, name: `${oil.viscosity} · ${oil.capacityWithFilterQt} qt`, note: `${oil.spec}. ${oil.capacityNote ?? "With filter."} Link pending.` };
    if (a.id === "filter") return { ...a, name: oil.filterOem, note: `${oil.filterStyle === "cartridge" ? "Cartridge element" : "Spin-on"} · match OEM. Link pending.` };
    return a;
  });
}

export function overlayPartHint(partId: keyof typeof PARTS, vehicle: Vehicle | null) {
  const base = PARTS[partId];
  if (!vehicle) return base.hint;
  if (partId === "oilFilter") return `${vehicle.oil.filterStyle === "cartridge" ? "Cartridge" : "Spin-on"} · OEM ${vehicle.oil.filterOem}.`;
  if (partId === "oilVolume") return `${vehicle.oil.capacityWithFilterQt} qt published refill with filter · ${vehicle.oil.viscosity}.`;
  if (partId === "fillCap") return `Cap should read ${vehicle.oil.viscosity}. Spec: ${vehicle.oil.spec}.`;
  if (partId === "drainPlug" && vehicle.oil.drainPlug) return `${vehicle.oil.drainPlug}. Torque only from the service information.`;
  return base.hint;
}

export function specSummary(vehicle: Vehicle) {
  return {
    title: vehicleLabel(vehicle),
    line: `${vehicle.oil.viscosity} · ${vehicle.oil.capacityWithFilterQt} qt w/ filter · ${vehicle.oil.filterOem}`,
    spec: vehicle.oil.spec,
    note: vehicle.oil.capacityNote,
    source: vehicle.oil.source,
  };
}
