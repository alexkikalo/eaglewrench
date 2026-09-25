import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BayStub } from "@/components/bay/BayStub";
import { bayBySlug } from "@/lib/bays";

const bay = bayBySlug("cabin-air-filter");

export const metadata: Metadata = {
  title: "Cabin Air Filter",
  description: "Basic cabin air-filter bay. Demonstration only — not a service manual.",
  alternates: { canonical: "https://eaglewrench.com/cabin-air-filter" },
};

export default function CabinAirFilterPage() {
  if (!bay) notFound();
  return <BayStub bay={bay} />;
}
