import type { VehicleSelection } from "@/lib/vehicle/types";

export const VEHICLE_STORAGE_KEY = "ew.vehicle.v1";

export function readVehicleSelection(): VehicleSelection {
  if (typeof window === "undefined") return { vehicleId: null };
  try {
    const raw = window.localStorage.getItem(VEHICLE_STORAGE_KEY);
    if (!raw) return { vehicleId: null };
    const parsed = JSON.parse(raw) as VehicleSelection;
    return { vehicleId: parsed.vehicleId ?? null };
  } catch {
    return { vehicleId: null };
  }
}

export function writeVehicleSelection(selection: VehicleSelection) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(VEHICLE_STORAGE_KEY, JSON.stringify(selection));
}
