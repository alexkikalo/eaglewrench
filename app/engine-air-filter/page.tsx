import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BayStub } from "@/components/bay/BayStub";
import { bayBySlug } from "@/lib/bays";

const bay = bayBySlug("engine-air-filter");

export const metadata: Metadata = {
  title: "Engine Air Filter",
  description: "Basic engine air-filter bay. Demonstration only — not a service manual.",
  alternates: { canonical: "https://eaglewrench.com/engine-air-filter" },
};

export default function EngineAirFilterPage() {
  if (!bay) notFound();
  return <BayStub bay={bay} />;
}
