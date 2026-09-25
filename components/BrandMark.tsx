import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="EagleWrench home">
      {/* Existing mark only — do not generate a replacement. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo.png"
        alt="EagleWrench"
        className={compact ? "h-12 w-auto" : "h-16 w-auto"}
      />
    </Link>
  );
}
