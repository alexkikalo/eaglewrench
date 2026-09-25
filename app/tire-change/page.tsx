import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BayStub } from "@/components/bay/BayStub";
import { bayBySlug } from "@/lib/bays";

const bay = bayBySlug("tire-change");

export const metadata: Metadata = {
  title: "Tire Change",
  description: "Tire-change bay. Demonstration only — not a service manual.",
  alternates: { canonical: "https://eaglewrench.com/tire-change" },
};

export default function TireChangePage() {
  if (!bay) notFound();
  return <BayStub bay={bay} />;
}
