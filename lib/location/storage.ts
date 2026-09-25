export const ZIP_STORAGE_KEY = "ew.zip.v1";

const ZIP_RE = /^\d{5}$/;

export function normalizeZip(raw: string): string | null {
  const digits = raw.replace(/\D/g, "").slice(0, 5);
  return ZIP_RE.test(digits) ? digits : null;
}

export function readZip(): string {
  if (typeof window === "undefined") return "";
  try {
    const raw = window.localStorage.getItem(ZIP_STORAGE_KEY);
    return normalizeZip(raw ?? "") ?? "";
  } catch {
    return "";
  }
}

export function writeZip(zip: string) {
  if (typeof window === "undefined") return;
  const next = normalizeZip(zip);
  if (next) window.localStorage.setItem(ZIP_STORAGE_KEY, next);
  else window.localStorage.removeItem(ZIP_STORAGE_KEY);
}
