export type PartId =
  | "oilPan"
  | "drainPlug"
  | "oilFilter"
  | "filterHousing"
  | "dipstick"
  | "fillCap"
  | "oilVolume";

export type OilStep = {
  id: number;
  title: string;
  part: PartId;
  camera: { position: [number, number, number]; target: [number, number, number] };
  body: string;
  safety: string;
};

export const OIL_STEPS: OilStep[] = [
  {
    id: 1,
    title: "Safety brief & warm engine",
    part: "fillCap",
    camera: { position: [2.4, 1.8, 2.6], target: [0, 0.6, 0] },
    body: "Park on level ground, set the parking brake, and let the engine idle a few minutes so oil is warm — not scalding. Gather PPE: glasses, gloves, and a drain pan bigger than you think you need.",
    safety: "Hot oil and a raised vehicle are the two fastest ways this job goes wrong. If you cannot support the vehicle on rated stands, do not start.",
  },
  {
    id: 2,
    title: "Support the vehicle",
    part: "oilPan",
    camera: { position: [1.6, 0.4, 2.2], target: [0, -0.15, 0] },
    body: "Lift only at the manufacturer’s pinch welds or frame points. Lower onto jack stands. Shake the vehicle before you crawl under it. The 3D bay is a teaching model — real lift points are in the owner’s manual.",
    safety: "Never work under a vehicle supported only by a jack. Never use cinder blocks or a bumper jack as a stand.",
  },
  {
    id: 3,
    title: "Locate the drain plug",
    part: "drainPlug",
    camera: { position: [0.9, -0.35, 1.4], target: [0.05, -0.55, 0.15] },
    body: "The drain plug is the single fastener at the low point of the oil pan. Confirm you are not looking at a transmission pan plug. Place the drain pan under the plug, slightly offset toward the direction oil will arc.",
    safety: "Wrong plug = dumping transmission fluid onto the floor and an engine that still has old oil.",
  },
  {
    id: 4,
    title: "Drain the oil",
    part: "oilVolume",
    camera: { position: [1.1, -0.2, 1.6], target: [0, -0.55, 0.1] },
    body: "Crack the plug with the correct wrench, then finish by hand so the plug does not drop into the pan of oil. Let it drain until the stream becomes a drip. Use the Drain control in the bay to preview the flow.",
    safety: "Oil is hot enough to blister skin. Keep your face and wrists out of the stream.",
  },
  {
    id: 5,
    title: "Refit the plug",
    part: "drainPlug",
    camera: { position: [0.85, -0.4, 1.25], target: [0.05, -0.55, 0.15] },
    body: "Inspect the crush washer or gasket. Replace it if the procedure calls for a new one. Thread the plug by hand first, then torque to the spec in the service information — do not guess and do not use an impact gun.",
    safety: "Overtightening strips the pan. Undertightening dumps oil on the highway.",
  },
  {
    id: 6,
    title: "Remove the filter",
    part: "oilFilter",
    camera: { position: [-1.4, 0.3, 1.5], target: [-0.55, 0.05, 0.05] },
    body: "Place the drain pan under the filter. Use a filter wrench if it will not break free by hand. Unscrew it and keep it upright until you can dump residual oil into the pan.",
    safety: "A hanging filter full of oil will coat the subframe, the belt, and you.",
  },
  {
    id: 7,
    title: "Install the new filter",
    part: "filterHousing",
    camera: { position: [-1.35, 0.35, 1.45], target: [-0.55, 0.05, 0.05] },
    body: "Wipe the mounting pad. Lightly oil the new filter gasket with clean oil. Thread it by hand until the gasket seats, then follow the filter or OEM instruction (often 3/4 turn — never invent a torque).",
    safety: "A dry gasket can leak within miles. Double-gasketing (old gasket stuck to the pad) will leak immediately.",
  },
  {
    id: 8,
    title: "Fill and verify level",
    part: "dipstick",
    camera: { position: [1.6, 1.9, 1.8], target: [0.15, 0.85, 0] },
    body: "Lower the vehicle. Remove the fill cap and add the oil grade and quantity specified for this engine. Start it, check for leaks at the plug and filter, shut it down, wait, then read the dipstick on level ground.",
    safety: "Overfill can damage seals and the catalytic converter. Underfill can destroy a bearing. The stick — not the bottle — is the final word.",
  },
];

export const PARTS: Record<PartId, { label: string; hint: string; explode: [number, number, number] }> = {
  oilPan: { label: "Oil pan", hint: "Steel or aluminum sump. Do not pry on it with a screwdriver.", explode: [0, -0.35, 0] },
  drainPlug: { label: "Drain plug", hint: "Hand-start threads. Torque to spec. Replace the washer when required.", explode: [0.15, -0.55, 0.25] },
  oilFilter: { label: "Oil filter", hint: "Spin-on canister. Match thread, gasket OD, and bypass rating to the application.", explode: [-0.7, 0.05, 0.15] },
  filterHousing: { label: "Filter pad", hint: "Mating surface. Must be clean, flat, and free of the old gasket.", explode: [-0.45, 0.05, 0] },
  dipstick: { label: "Dipstick", hint: "Wipe, reinsert fully, read on a level surface with the engine off.", explode: [0.15, 0.55, 0] },
  fillCap: { label: "Fill cap", hint: "Usually marked. Add only the specified viscosity and spec (API / ILSAC / OEM).", explode: [0, 0.45, 0] },
  oilVolume: { label: "Oil charge", hint: "The volume in the pan is what you are replacing. Catch all of it.", explode: [0, -0.2, 0] },
};

export const TOOLS = [
  { name: "Rated floor jack + jack stands", why: "The vehicle must be on stands, not the jack, before anyone goes underneath." },
  { name: "Correct drain-plug wrench or socket", why: "Rounded plugs are a second job. Fit matters more than brand." },
  { name: "Oil-filter wrench", why: "Factory-tight filters often will not break by hand." },
  { name: "Drain pan (2x expected volume)", why: "Warm oil exits faster and farther than a small pan can catch." },
  { name: "New filter + specified oil + crush washer", why: "Do not reuse a collapsed filter or a flattened washer." },
  { name: "Gloves, glasses, rags, funnel", why: "Eyes and skin first. Funnel keeps grit out of the fill neck." },
  { name: "Torque source + service info", why: "Phone-in-garage still needs the real spec. Guessing is how pans get stripped." },
];

export const MISTAKES = [
  "Working under a jack with no stands.",
  "Draining the transmission pan by accident.",
  "Impact-gunning the drain plug.",
  "Installing a filter with the old gasket still on the pad.",
  "Filling by bottle count and skipping the dipstick.",
  "Using the wrong viscosity or a non-spec oil in a warranty engine.",
  "Pouring used oil on the ground or in household trash.",
  "Starting the engine with the fill cap off and the filter only finger-loose, then walking away.",
];

export const AFFILIATES = [
  { id: "oil", name: "Engine oil (correct spec)", note: "Match viscosity and OEM spec. Link pending." },
  { id: "filter", name: "Oil filter", note: "Match thread and gasket. Link pending." },
  { id: "wrench", name: "Filter wrench + plug socket", note: "Fit the fastener you have. Link pending." },
];
