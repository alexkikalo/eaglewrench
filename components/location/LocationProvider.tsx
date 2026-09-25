"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { normalizeZip, readZip, writeZip } from "@/lib/location/storage";

type LocationContextValue = {
  zip: string;
  setZip: (zip: string) => void;
  locate: () => Promise<void>;
  locating: boolean;
};

const LocationContext = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [zip, setZipState] = useState("");
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    setZipState(readZip());
  }, []);

  const value = useMemo<LocationContextValue>(
    () => ({
      zip,
      setZip: (next) => {
        const clean = normalizeZip(next) ?? next.replace(/\D/g, "").slice(0, 5);
        setZipState(clean);
        writeZip(clean);
      },
      locating,
      locate: async () => {
        if (!navigator.geolocation) return;
        setLocating(true);
        try {
          const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: false,
              timeout: 8000,
            });
          });
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;
          const res = await fetch(url, { headers: { Accept: "application/json" } });
          if (!res.ok) return;
          const data = (await res.json()) as { address?: { postcode?: string } };
          const found = normalizeZip(data.address?.postcode ?? "");
          if (found) {
            setZipState(found);
            writeZip(found);
          }
        } catch {
          // Permission denied or lookup failed — leave ZIP as typed.
        } finally {
          setLocating(false);
        }
      },
    }),
    [zip, locating],
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocationZip() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocationZip must be used inside LocationProvider");
  return ctx;
}
