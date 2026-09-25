export type FilterStyle = "spin-on" | "cartridge";

export type OilSpec = {
  viscosity: string;
  spec: string;
  capacityWithFilterQt: number;
  capacityNote?: string;
  filterOem: string;
  filterStyle: FilterStyle;
  drainPlug?: string;
  source: string;
};

export type Vehicle = {
  id: string;
  yearStart: number;
  yearEnd: number;
  make: string;
  model: string;
  engine: string;
  oil: OilSpec;
};

export type VehicleSelection = {
  vehicleId: string | null;
};
