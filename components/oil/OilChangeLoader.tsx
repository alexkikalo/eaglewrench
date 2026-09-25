"use client";

import dynamic from "next/dynamic";
import { DisclaimerBanner } from "@/components/Disclaimer";

const OilChangeExperience = dynamic(
  () => import("@/components/oil/OilChangeExperience").then((m) => m.OilChangeExperience),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        <DisclaimerBanner />
        <div className="steel-panel min-h-[360px] grid place-items-center text-garage-steel">
          Lighting the bay…
        </div>
      </div>
    ),
  },
);

export function OilChangeLoader() {
  return <OilChangeExperience />;
}
