import Link from "next/link";
import { baysAlphabetical } from "@/lib/bays";

export function BaysGrid() {
  return (
    <section id="bays" className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.35em] text-garage-amber mb-2">Bays</p>
      <h2 className="font-stencil text-4xl tracking-wide">Pick the job you need</h2>
      <p className="mt-2 mb-8 text-garage-steel max-w-prose">These are separate jobs. Open one. Skip the rest.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {baysAlphabetical().map((bay) => (
          <Link key={bay.slug} href={bay.href} className="steel-panel p-5 hover:border-garage-amber/60 block">
            <p className="text-[10px] uppercase tracking-[0.25em] text-garage-amber">{bay.status === "live" ? "3D" : "Sequence"}</p>
            <h3 className="mt-2 text-xl font-semibold">{bay.label}</h3>
            <p className="mt-2 text-sm text-garage-steel">{bay.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
