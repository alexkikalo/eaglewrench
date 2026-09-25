import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BayStub } from "@/components/bay/BayStub";
import { bayBySlug } from "@/lib/bays";

const bay = bayBySlug("wipers");

export const metadata: Metadata = {
  title: "Wiper Replacement",
  description: "Basic wiper-replacement bay. Demonstration only — not a service manual.",
  alternates: { canonical: "https://eaglewrench.com/wipers" },
};

export default function WipersPage() {
  if (!bay) notFound();
  return <BayStub bay={bay} />;
}
