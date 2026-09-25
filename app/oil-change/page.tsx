import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { DisclaimerBanner } from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Oil Change Interactive Demo",
  description:
    "Guided 3D oil-change bay: explode the system, drain the pan, and walk eight educational steps. Not a service manual.",
  alternates: { canonical: "https://eaglewrench.com/oil-change" },
};

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

export default function OilChangePage() {
  return (
    <div className="pt-4">
      <div className="mx-auto max-w-6xl px-4 mb-2">
        <p className="text-xs uppercase tracking-[0.3em] text-garage-amber">Interactive bay</p>
        <h1 className="font-stencil text-5xl tracking-wide">Oil Change</h1>
      </div>
      <OilChangeExperience />
    </div>
  );
}
