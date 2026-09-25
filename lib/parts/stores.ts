export type PartsStore = {
  id: "autozone" | "oreilly" | "walmart";
  label: string;
};

export const PARTS_STORES: PartsStore[] = [
  { id: "autozone", label: "AutoZone" },
  { id: "oreilly", label: "O'Reilly" },
  { id: "walmart", label: "Walmart" },
];

export function itemSearchUrl(storeId: PartsStore["id"], query: string, zip: string): string {
  const q = encodeURIComponent(query.trim());
  const z = zip.trim();

  switch (storeId) {
    case "autozone":
      return `https://www.autozone.com/searchresult?searchText=${q}`;
    case "oreilly":
      return `https://www.oreillyauto.com/search?q=${q}`;
    case "walmart":
      return z
        ? `https://www.walmart.com/search?q=${q}&stores=${z}`
        : `https://www.walmart.com/search?q=${q}`;
  }
}

export function storeLocatorUrl(storeId: PartsStore["id"], zip: string): string {
  const z = encodeURIComponent(zip);
  switch (storeId) {
    case "autozone":
      return zip ? `https://www.autozone.com/locations?address=${z}` : "https://www.autozone.com/locations";
    case "oreilly":
      return zip ? `https://www.oreillyauto.com/location?search=${z}` : "https://www.oreillyauto.com/locations";
    case "walmart":
      return zip ? `https://www.walmart.com/store-finder?location=${z}` : "https://www.walmart.com/store/finder";
  }
}
