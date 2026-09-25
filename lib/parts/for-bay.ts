import type { Vehicle } from "@/lib/vehicle/types";
import type { ShopItem } from "@/lib/parts/types";

function ymm(vehicle: Vehicle) {
  return `${vehicle.yearEnd} ${vehicle.make} ${vehicle.model}`;
}

export function shopItemsForBay(baySlug: string, vehicle: Vehicle | null): ShopItem[] {
  if (!vehicle) return [];

  const name = ymm(vehicle);

  switch (baySlug) {
    case "oil-change":
      return [
        {
          id: "oil-fluid",
          name: "Engine oil",
          detail: `${vehicle.oil.viscosity} · ${vehicle.oil.capacityWithFilterQt} qt with filter · ${vehicle.oil.spec}`,
          search: `${vehicle.oil.viscosity} motor oil`,
        },
        {
          id: "oil-filter",
          name: "Oil filter",
          detail: `${vehicle.oil.filterOem} · ${vehicle.oil.filterStyle}`,
          search: vehicle.oil.filterOem,
        },
      ];
    case "wipers":
      return [
        {
          id: "wiper-blades",
          name: "Wiper blades",
          detail: "Driver and passenger lengths often differ. Confirm on the arm.",
          search: `${name} wiper blades`,
        },
      ];
    case "engine-air-filter":
      return [
        {
          id: "engine-air-filter",
          name: "Engine air filter",
          detail: `Fits ${name}. Confirm the housing shape before you leave the store.`,
          search: `${name} engine air filter`,
        },
      ];
    case "cabin-air-filter":
      return [
        {
          id: "cabin-air-filter",
          name: "Cabin air filter",
          detail: `Usually behind the glove box on ${name}. Match the airflow arrows.`,
          search: `${name} cabin air filter`,
        },
      ];
    case "battery":
      return [
        {
          id: "battery",
          name: "12-volt battery",
          detail: "Group size varies. Take the old battery or the tray measurement.",
          search: `${name} battery`,
        },
      ];
    case "tire-rotation":
      return [];
    case "tire-change":
      return [
        {
          id: "tire",
          name: "Tire",
          detail: `Size is on the sidewall and the door-jamb placard for ${name}. Do not guess.`,
          search: `${name} tire`,
        },
      ];
    default:
      return [];
  }
}
