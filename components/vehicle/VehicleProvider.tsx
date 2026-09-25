"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { vehicleById } from "@/lib/vehicle/catalog";
import { readVehicleSelection, writeVehicleSelection } from "@/lib/vehicle/storage";
import type { Vehicle } from "@/lib/vehicle/types";

type VehicleContextValue = {
  ready: boolean;
  vehicle: Vehicle | null;
  vehicleId: string | null;
  setVehicleId: (id: string | null) => void;
};

const VehicleContext = createContext<VehicleContextValue | null>(null);

export function VehicleProvider({ children }: { children: React.ReactNode }) {
  const [vehicleId, setId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setId(readVehicleSelection().vehicleId);
    setReady(true);
  }, []);

  const value = useMemo<VehicleContextValue>(() => {
    return {
      ready,
      vehicleId,
      vehicle: vehicleById(vehicleId),
      setVehicleId: (id) => {
        setId(id);
        writeVehicleSelection({ vehicleId: id });
      },
    };
  }, [ready, vehicleId]);

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;
}

export function useVehicle() {
  const ctx = useContext(VehicleContext);
  if (!ctx) {
    throw new Error("useVehicle must be used inside VehicleProvider");
  }
  return ctx;
}
