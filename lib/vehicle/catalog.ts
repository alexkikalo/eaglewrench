import type { Vehicle } from "@/lib/vehicle/types";

export const VEHICLES: Vehicle[] = [
  {
    id: "ford-f150-2018-2020-50",
    yearStart: 2018,
    yearEnd: 2020,
    make: "Ford",
    model: "F-150",
    engine: "5.0L V8",
    oil: {
      viscosity: "5W-20",
      spec: "API SN/SP · Ford WSS-M2C945-B1",
      capacityWithFilterQt: 7.7,
      capacityNote: "Some 5.0 police/special applications list 8.8 qt.",
      filterOem: "Motorcraft FL-500S",
      filterStyle: "spin-on",
      drainPlug: "Typically 15 mm hex",
      source: "Ford Motorcraft oil chart (with filter)",
    },
  },
  {
    id: "ford-f150-2021-2023-50",
    yearStart: 2021,
    yearEnd: 2023,
    make: "Ford",
    model: "F-150",
    engine: "5.0L V8",
    oil: {
      viscosity: "5W-30",
      spec: "API SP · Ford WSS-M2C961-A1",
      capacityWithFilterQt: 7.7,
      capacityNote: "Confirm viscosity on the fill cap — Ford shifted several 5.0 applications to 5W-30.",
      filterOem: "Motorcraft FL-500S",
      filterStyle: "spin-on",
      drainPlug: "Typically 15 mm hex",
      source: "Ford Motorcraft oil chart (with filter)",
    },
  },
  {
    id: "ford-f150-2018-2023-35eb",
    yearStart: 2018,
    yearEnd: 2023,
    make: "Ford",
    model: "F-150",
    engine: "3.5L EcoBoost V6",
    oil: {
      viscosity: "5W-30",
      spec: "API SP · Ford WSS as printed on the cap",
      capacityWithFilterQt: 6.0,
      filterOem: "Motorcraft FL-500S",
      filterStyle: "spin-on",
      source: "Ford Motorcraft oil chart (with filter)",
    },
  },
  {
    id: "ford-f150-2018-2023-27eb",
    yearStart: 2018,
    yearEnd: 2023,
    make: "Ford",
    model: "F-150",
    engine: "2.7L EcoBoost V6",
    oil: {
      viscosity: "5W-30",
      spec: "API SP · Ford WSS as printed on the cap",
      capacityWithFilterQt: 6.0,
      filterOem: "Motorcraft FL-500S",
      filterStyle: "spin-on",
      source: "Ford Motorcraft oil chart (with filter)",
    },
  },
  {
    id: "ford-f150-2018-2020-33",
    yearStart: 2018,
    yearEnd: 2020,
    make: "Ford",
    model: "F-150",
    engine: "3.3L V6",
    oil: {
      viscosity: "5W-20",
      spec: "API SN/SP · Ford WSS-M2C945-B1",
      capacityWithFilterQt: 6.0,
      filterOem: "Motorcraft FL-500S",
      filterStyle: "spin-on",
      source: "Ford Motorcraft oil chart (with filter)",
    },
  },
  {
    id: "chevy-silverado1500-2019-2024-53",
    yearStart: 2019,
    yearEnd: 2024,
    make: "Chevrolet",
    model: "Silverado 1500",
    engine: "5.3L V8 (L84)",
    oil: {
      viscosity: "0W-20",
      spec: "dexos1 (Gen2/Gen3) 0W-20",
      capacityWithFilterQt: 8.0,
      filterOem: "ACDelco PF63",
      filterStyle: "spin-on",
      source: "GM 2024 U.S./Canada engine oil capacities (with filter)",
    },
  },
  {
    id: "chevy-silverado1500-2019-2024-62",
    yearStart: 2019,
    yearEnd: 2024,
    make: "Chevrolet",
    model: "Silverado 1500",
    engine: "6.2L V8 (L87)",
    oil: {
      viscosity: "0W-20",
      spec: "dexos1 (Gen2/Gen3) 0W-20",
      capacityWithFilterQt: 8.0,
      filterOem: "ACDelco PF63",
      filterStyle: "spin-on",
      source: "GM 2024 U.S./Canada engine oil capacities (with filter)",
    },
  },
  {
    id: "chevy-silverado1500-2019-2024-27",
    yearStart: 2019,
    yearEnd: 2024,
    make: "Chevrolet",
    model: "Silverado 1500",
    engine: "2.7L turbo I4 (L3B)",
    oil: {
      viscosity: "5W-30",
      spec: "dexos1 5W-30",
      capacityWithFilterQt: 6.0,
      capacityNote: "GM lists 5.5 qt with aluminum pan, 6.0 qt with plastic pan.",
      filterOem: "ACDelco PF66",
      filterStyle: "spin-on",
      source: "GM 2024 U.S./Canada engine oil capacities (with filter)",
    },
  },
  {
    id: "toyota-camry-2018-2024-25",
    yearStart: 2018,
    yearEnd: 2024,
    make: "Toyota",
    model: "Camry",
    engine: "2.5L I4",
    oil: {
      viscosity: "0W-20",
      spec: "API SN/SP · ILSAC GF-6",
      capacityWithFilterQt: 4.8,
      filterOem: "Toyota 04152-YZZA1",
      filterStyle: "spin-on",
      source: "Toyota XV70 service capacity (with filter)",
    },
  },
  {
    id: "toyota-camry-2018-2024-35",
    yearStart: 2018,
    yearEnd: 2024,
    make: "Toyota",
    model: "Camry",
    engine: "3.5L V6",
    oil: {
      viscosity: "0W-20",
      spec: "API SN/SP · ILSAC GF-6",
      capacityWithFilterQt: 5.7,
      filterOem: "Toyota 04152-YZZA1",
      filterStyle: "spin-on",
      source: "Toyota XV70 service capacity (with filter)",
    },
  },
  {
    id: "toyota-rav4-2019-2024-25",
    yearStart: 2019,
    yearEnd: 2024,
    make: "Toyota",
    model: "RAV4",
    engine: "2.5L I4",
    oil: {
      viscosity: "0W-16",
      spec: "API SP · ILSAC GF-6B (0W-20 if the cap allows)",
      capacityWithFilterQt: 4.8,
      capacityNote: "Many RAV4 caps specify 0W-16; use 0W-20 only if the manual lists it.",
      filterOem: "Toyota 04152-YZZA1",
      filterStyle: "spin-on",
      source: "Toyota XA50 typical refill with filter",
    },
  },
  {
    id: "toyota-tacoma-2016-2023-35",
    yearStart: 2016,
    yearEnd: 2023,
    make: "Toyota",
    model: "Tacoma",
    engine: "3.5L V6",
    oil: {
      viscosity: "0W-20",
      spec: "API SN/SP · ILSAC GF-6",
      capacityWithFilterQt: 6.2,
      filterOem: "Toyota 04152-YZZA6",
      filterStyle: "spin-on",
      source: "Toyota N300 3.5L typical refill with filter",
    },
  },
  {
    id: "honda-civic-2016-2021-15t",
    yearStart: 2016,
    yearEnd: 2021,
    make: "Honda",
    model: "Civic",
    engine: "1.5L turbo I4",
    oil: {
      viscosity: "0W-20",
      spec: "API SN/SP · Honda Genuine Blend",
      capacityWithFilterQt: 3.7,
      filterOem: "Honda 15400-PLM-A02",
      filterStyle: "cartridge",
      source: "Honda 10th-gen 1.5T typical refill with filter",
    },
  },
  {
    id: "honda-civic-2016-2021-20",
    yearStart: 2016,
    yearEnd: 2021,
    make: "Honda",
    model: "Civic",
    engine: "2.0L I4",
    oil: {
      viscosity: "0W-20",
      spec: "API SN/SP · Honda Genuine Blend",
      capacityWithFilterQt: 4.4,
      filterOem: "Honda 15400-PLM-A02",
      filterStyle: "spin-on",
      source: "Honda 10th-gen 2.0 typical refill with filter",
    },
  },
  {
    id: "honda-crv-2017-2022-15t",
    yearStart: 2017,
    yearEnd: 2022,
    make: "Honda",
    model: "CR-V",
    engine: "1.5L turbo I4",
    oil: {
      viscosity: "0W-20",
      spec: "API SN/SP · Honda Genuine Blend",
      capacityWithFilterQt: 3.7,
      filterOem: "Honda 15400-PLM-A02",
      filterStyle: "cartridge",
      source: "Honda 5th-gen 1.5T typical refill with filter",
    },
  },
  {
    id: "honda-accord-2018-2022-15t",
    yearStart: 2018,
    yearEnd: 2022,
    make: "Honda",
    model: "Accord",
    engine: "1.5L turbo I4",
    oil: {
      viscosity: "0W-20",
      spec: "API SN/SP · Honda Genuine Blend",
      capacityWithFilterQt: 3.7,
      filterOem: "Honda 15400-PLM-A02",
      filterStyle: "cartridge",
      source: "Honda 10th-gen Accord 1.5T typical refill with filter",
    },
  },
  {
    id: "ram-1500-2019-2024-57",
    yearStart: 2019,
    yearEnd: 2024,
    make: "Ram",
    model: "1500",
    engine: "5.7L V8 HEMI",
    oil: {
      viscosity: "5W-20",
      spec: "API SP · FCA MS-6395",
      capacityWithFilterQt: 7.0,
      filterOem: "Mopar 68229303AA / equivalent",
      filterStyle: "spin-on",
      source: "Ram 5.7 HEMI typical refill with filter",
    },
  },
];

export function vehicleById(id: string | null): Vehicle | null {
  if (!id) return null;
  return VEHICLES.find((v) => v.id === id) ?? null;
}

export function vehicleLabel(v: Vehicle): string {
  const years =
    v.yearStart === v.yearEnd ? String(v.yearStart) : `${v.yearStart}–${v.yearEnd}`;
  return `${years} ${v.make} ${v.model} ${v.engine}`;
}

export function yearsInCatalog(): number[] {
  const min = Math.min(...VEHICLES.map((v) => v.yearStart));
  const max = Math.max(...VEHICLES.map((v) => v.yearEnd));
  return Array.from({ length: max - min + 1 }, (_, i) => min + i).reverse();
}

export function makesForYear(year: number): string[] {
  return unique(VEHICLES.filter((v) => inYears(v, year)).map((v) => v.make));
}

export function modelsFor(year: number, make: string): string[] {
  return unique(
    VEHICLES.filter((v) => inYears(v, year) && v.make === make).map((v) => v.model),
  );
}

export function enginesFor(year: number, make: string, model: string): Vehicle[] {
  return VEHICLES.filter((v) => inYears(v, year) && v.make === make && v.model === model);
}

function inYears(v: Vehicle, year: number) {
  return year >= v.yearStart && year <= v.yearEnd;
}

function unique(list: string[]) {
  return [...new Set(list)].sort();
}
