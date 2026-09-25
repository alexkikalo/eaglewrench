"use client";

import { useState } from "react";
import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  const [broken, setBroken] = useState(false);

  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="EagleWrench home">
      {!broken ? (
        // Existing mark only — do not generate a replacement.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brand/logo.png"
          alt="EagleWrench"
          className={compact ? "h-12 w-auto" : "h-16 w-auto"}
          onError={() => setBroken(true)}
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
