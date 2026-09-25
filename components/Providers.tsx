"use client";

import { VehicleProvider } from "@/components/vehicle/VehicleProvider";
import { LocationProvider } from "@/components/location/LocationProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <VehicleProvider>
      <LocationProvider>{children}</LocationProvider>
    </VehicleProvider>
  );
}
