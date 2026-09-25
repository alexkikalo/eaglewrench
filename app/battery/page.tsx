import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BayStub } from "@/components/bay/BayStub";
import { bayBySlug } from "@/lib/bays";

const bay = bayBySlug("battery");

export const metadata: Metadata = {
  title: "Battery",
  description: "Basic 12-volt battery bay. Demonstration only — not a service manual.",
  alternates: { canonical: "https://eaglewrench.com/battery" },
};

export default function BatteryPage() {
  if (!bay) notFound();
  return <BayStub bay={bay} />;
}
