import Link from "next/link";

const hasLogo = process.env.NEXT_PUBLIC_HAS_LOGO === "true";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="EagleWrench home">
      {hasLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brand/logo.png"
          alt="EagleWrench"
          className={compact ? "h-8 w-auto" : "h-10 w-auto"}
        />
      ) : (
        <span
          className={`font-stencil tracking-[0.18em] text-garage-amber group-hover:text-[#f0c24a] ${
            compact ? "text-2xl" : "text-3xl"
          }`}
        >
          EAGLEWRENCH
        </span>
      )}
    </Link>
  );
}
