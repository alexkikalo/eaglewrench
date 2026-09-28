import type { PartId } from "@/lib/oil-content";
import type { FilterStyle, Vehicle } from "@/lib/vehicle/types";

export type BodyClass = "pickup" | "sedan" | "crossover" | "jeep";
export type EngineArch = "i3" | "i4" | "v6" | "v8" | "h4";
export type EngineAxis = "longitudinal" | "transverse";
export type FilterMount = "passenger-block" | "front-block" | "top-housing";
export type DrainCorner = "passenger-rear" | "driver-rear" | "front-center";

export type Cam = {
  position: [number, number, number];
  target: [number, number, number];
};

export type OilBayLayout = {
  bodyClass: BodyClass;
  arch: EngineArch;
  axis: EngineAxis;
  filterStyle: FilterStyle;
  filterMount: FilterMount;
  drainCorner: DrainCorner;
  ride: number;
  oilScale: number;
  block: { w: number; h: number; d: number };
  title: string;
  line: string;
  caution: string;
};

const PICKUPS = new Set(["F-150", "Silverado 1500", "Ram 1500", "Tacoma"]);
const JEEPS = new Set(["Wrangler"]);
const CROSSOVERS = new Set([
  "RAV4",
  "CR-V",
  "Escape",
  "Explorer",
  "Equinox",
  "Highlander",
  "Outback",
  "Forester",
  "Rogue",
  "Tucson",
  "Telluride",
  "CX-5",
]);

export const DEFAULT_LAYOUT: OilBayLayout = {
  bodyClass: "pickup",
  arch: "v6",
  axis: "longitudinal",
  filterStyle: "spin-on",
  filterMount: "passenger-block",
  drainCorner: "passenger-rear",
  ride: 0.22,
  oilScale: 1,
  block: { w: 0.92, h: 0.78, d: 1.35 },
  title: "Teaching stand",
  line: "Pick a vehicle — the bay switches architecture, filter type, and pan size.",
  caution: "Generic stand until a vehicle is selected. Not a VIN-matched engine.",
};

export function inferOilBayLayout(vehicle: Vehicle | null): OilBayLayout {
  if (!vehicle) return DEFAULT_LAYOUT;

  const bodyClass = inferBody(vehicle.model);
  const arch = inferArch(vehicle.engine);
  const axis = inferAxis(bodyClass, arch);
  const filterStyle = vehicle.oil.filterStyle;
  const filterMount = inferFilterMount(axis, arch, filterStyle);
  const drainCorner = inferDrain(axis, bodyClass);
  const oilScale = Math.min(1.35, Math.max(0.62, vehicle.oil.capacityWithFilterQt / 6));
  const block = blockSize(arch, axis);
  const ride = bodyClass === "pickup" || bodyClass === "jeep" ? 0.28 : bodyClass === "crossover" ? 0.16 : 0.08;

  const filterWords = filterStyle === "cartridge" ? "cartridge housing" : "spin-on canister";
  const where =
    filterMount === "top-housing"
      ? "top of the block"
      : filterMount === "front-block"
        ? "front of the block (radiator side)"
        : "passenger side of the block";

  return {
    bodyClass,
    arch,
    axis,
    filterStyle,
    filterMount,
    drainCorner,
    ride,
    oilScale,
    block,
    title: shortTitle(vehicle),
    line: `${axis} ${archLabel(arch)} · ${filterWords} at the ${where}`,
    caution: "Teaching layout from year/make/model/engine. Confirm every fastener on the vehicle in front of you.",
  };
}

export function camerasForLayout(layout: OilBayLayout): Record<PartId, Cam> {
  const filter = filterLocal(layout);
  const drain = drainLocal(layout);
  const capY = layout.block.h * 0.55 + layout.ride + 0.55;
  return {
    oilPan: { position: [1.7, 0.15 + layout.ride, 2.15], target: [0, -0.25 + layout.ride, 0.05] },
    drainPlug: { position: [drain[0] + 0.95, drain[1] + 0.35, drain[2] + 1.15], target: [drain[0], drain[1], drain[2]] },
    oilFilter: { position: [filter[0] - 1.15, filter[1] + 0.45, filter[2] + 1.2], target: [filter[0], filter[1], filter[2]] },
    filterHousing: { position: [filter[0] - 1.05, filter[1] + 0.4, filter[2] + 1.05], target: [filter[0] + 0.12, filter[1], filter[2]] },
    dipstick: { position: [1.55, capY + 0.7, 1.55], target: [0.25, capY - 0.15, 0] },
    fillCap: { position: [1.7, capY + 0.85, 1.7], target: [-0.05, capY, -0.05] },
    oilVolume: { position: [1.35, 0.15 + layout.ride, 1.7], target: [0, -0.35 + layout.ride, 0.08] },
  };
}

export function filterLocal(layout: OilBayLayout): [number, number, number] {
  const y = layout.ride + 0.02;
  if (layout.filterMount === "top-housing") return [0.28, y + layout.block.h * 0.35, -layout.block.d * 0.12];
  if (layout.filterMount === "front-block") return [0.15, y + 0.02, -layout.block.d * 0.52];
  return [layout.block.w * 0.62, y + 0.04, -layout.block.d * 0.08];
}

export function drainLocal(layout: OilBayLayout): [number, number, number] {
  const y = layout.ride - 0.52;
  if (layout.drainCorner === "front-center") return [0.06, y, -layout.block.d * 0.28];
  if (layout.drainCorner === "driver-rear") return [-0.28, y, layout.block.d * 0.28];
  return [0.22, y, layout.block.d * 0.28];
}

function inferBody(model: string): BodyClass {
  if (PICKUPS.has(model)) return "pickup";
  if (JEEPS.has(model)) return "jeep";
  if (CROSSOVERS.has(model)) return "crossover";
  return "sedan";
}

function inferArch(engine: string): EngineArch {
  const e = engine.toLowerCase();
  if (/\bh4\b/.test(e) || e.includes("boxer")) return "h4";
  if (e.includes("v8") || e.includes("hemi")) return "v8";
  if (e.includes("v6")) return "v6";
  if (e.includes("i3")) return "i3";
  return "i4";
}

function inferAxis(body: BodyClass, arch: EngineArch): EngineAxis {
  if (arch === "h4") return "longitudinal";
  if (body === "pickup" || body === "jeep") return "longitudinal";
  return "transverse";
}

function inferFilterMount(axis: EngineAxis, arch: EngineArch, style: FilterStyle): FilterMount {
  if (style === "cartridge" && arch === "h4") return "top-housing";
  if (style === "cartridge") return axis === "transverse" ? "front-block" : "passenger-block";
  if (axis === "transverse") return "front-block";
  return "passenger-block";
}

function inferDrain(axis: EngineAxis, body: BodyClass): DrainCorner {
  if (axis === "transverse") return "front-center";
  if (body === "jeep") return "driver-rear";
  return "passenger-rear";
}

function blockSize(arch: EngineArch, axis: EngineAxis): { w: number; h: number; d: number } {
  if (arch === "h4") return { w: 1.35, h: 0.48, d: 0.95 };
  if (arch === "v8") return axis === "longitudinal" ? { w: 0.95, h: 0.82, d: 1.55 } : { w: 1.45, h: 0.78, d: 0.95 };
  if (arch === "v6") return axis === "longitudinal" ? { w: 0.88, h: 0.76, d: 1.32 } : { w: 1.28, h: 0.72, d: 0.88 };
  if (arch === "i3") return { w: 1.05, h: 0.62, d: 0.62 };
  return axis === "transverse" ? { w: 1.18, h: 0.64, d: 0.68 } : { w: 0.72, h: 0.68, d: 1.15 };
}

function archLabel(arch: EngineArch) {
  return { i3: "I3", i4: "I4", v6: "V6", v8: "V8", h4: "boxer" }[arch];
}

function shortTitle(v: Vehicle) {
  const years = v.yearStart === v.yearEnd ? String(v.yearStart) : `${v.yearStart}–${v.yearEnd}`;
  return `${years} ${v.make} ${v.model}`;
}
