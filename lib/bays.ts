export type BayStatus = "live" | "soon";

export type Bay = {
  href: string;
  label: string;
  status: BayStatus;
};

export const BAYS: Bay[] = [
  { href: "/oil-change", label: "Oil change", status: "live" },
  { href: "/#waitlist", label: "Tire rotation", status: "soon" },
  { href: "/#waitlist", label: "Wiper replacement", status: "soon" },
  { href: "/#waitlist", label: "Engine air filter", status: "soon" },
  { href: "/#waitlist", label: "Cabin air filter", status: "soon" },
  { href: "/#waitlist", label: "Battery", status: "soon" },
];
