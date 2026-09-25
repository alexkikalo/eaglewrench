import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BayStub } from "@/components/bay/BayStub";
import { bayBySlug } from "@/lib/bays";

const bay = bayBySlug("tire-rotation");

export const metadata: Metadata = {
  title: "Tire Rotation",
  description: "Basic tire-rotation bay. Demonstration only — not a service manual.",
  alternates: { canonical: "https://eaglewrench.com/tire-rotation" },
};

export default function TireRotationPage() {
  if (!bay) notFound();
  return <BayStub bay={bay} />;
}
