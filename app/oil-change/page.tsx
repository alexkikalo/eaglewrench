import type { Metadata } from "next";
import { OilChangeLoader } from "@/components/oil/OilChangeLoader";

export const metadata: Metadata = {
  title: "Oil Change",
  description: "3D oil-change bay. Demonstration only — not a service manual.",
  alternates: { canonical: "https://eaglewrench.com/oil-change" },
};

export default function OilChangePage() {
  return (
    <div className="pt-4">
      <div className="mx-auto max-w-6xl px-4 mb-2">
        <p className="text-xs uppercase tracking-[0.3em] text-garage-amber">Bay</p>
        <h1 className="font-stencil text-5xl tracking-wide">Oil Change</h1>
      </div>
      <OilChangeLoader />
    </div>
  );
}
