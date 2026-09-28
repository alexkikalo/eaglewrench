import type { Metadata } from "next";
import { OilChangeLoader } from "@/components/oil/OilChangeLoader";

export const metadata: Metadata = {
  title: "Oil Change Interactive Demo",
  description:
    "Guided 3D oil-change bay: explode the system, drain the pan, and walk eight steps. Not a service manual.",
  alternates: { canonical: "https://eaglewrench.com/oil-change" },
};

export default function OilChangePage() {
  return (
    <>
      <h1 className="sr-only">Oil Change Interactive Demo</h1>
      <OilChangeLoader />
    </>
  );
}
