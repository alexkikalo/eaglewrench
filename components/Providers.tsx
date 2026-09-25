"use client";

import { VehicleProvider } from "@/components/vehicle/VehicleProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <VehicleProvider>{children}</VehicleProvider>;
}
