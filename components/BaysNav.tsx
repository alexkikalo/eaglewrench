"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { baysAlphabetical } from "@/lib/bays";

export function BaysNav() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  function toggle() {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    }
    setOpen((v) => !v);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button ref={btnRef} type="button" onClick={toggle} className="inline-flex items-center gap-1 text-xs sm:text-sm uppercase tracking-widest text-garage-steel hover:text-garage-amber" aria-expanded={open} aria-haspopup="menu">
        Bays
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && typeof document !== "undefined"
        ? createPortal(
            <>
              <button type="button" className="fixed inset-0 z-[70]" aria-label="Close bays menu" onClick={() => setOpen(false)} />
              <div role="menu" className="fixed z-[80] w-64 border border-white/15 bg-[#121417] p-2 shadow-bay" style={{ top: pos.top, right: pos.right }}>
                {baysAlphabetical().map((bay) => (
                  <Link key={bay.slug} href={bay.href} role="menuitem" className="flex items-center justify-between px-3 py-2 text-sm uppercase tracking-widest hover:bg-white/5 hover:text-garage-amber" onClick={() => setOpen(false)}>
                    {bay.label}
                    {bay.status === "live" ? <span className="text-[10px] text-garage-amber">Live</span> : null}
                  </Link>
                ))}
              </div>
            </>,
            document.body,
          )
        : null}
    </>
  );
}
