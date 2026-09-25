"use client";

import { useMemo, useState } from "react";
import { Check, Droplets, RotateCcw, RotateCw, ShieldAlert, Wrench } from "lucide-react";
import { OilBay } from "@/components/oil/OilBay";
import { MISTAKES, OIL_STEPS, PARTS, type PartId } from "@/lib/oil-content";
import { DisclaimerBanner } from "@/components/Disclaimer";
import { VehicleChip } from "@/components/vehicle/VehicleChip";
import { useVehicle } from "@/components/vehicle/VehicleProvider";
import {
  overlayAffiliates,
  overlayOilSteps,
  overlayPartHint,
  overlayTools,
  specSummary,
} from "@/lib/vehicle/overlay";

type Tab = "how" | "tools" | "mistakes";

const DEFAULT_CAM = {
  position: [2.6, 1.4, 2.8] as [number, number, number],
  target: [0, 0.1, 0] as [number, number, number],
};

export function OilChangeExperience() {
  const [explode, setExplode] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [selected, setSelected] = useState<PartId | null>("oilPan");
  const [step, setStep] = useState<number | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const [draining, setDraining] = useState(false);
  const [tab, setTab] = useState<Tab>("how");
  const [resetToken, setResetToken] = useState(0);
  const { vehicle } = useVehicle();
  const steps = useMemo(() => overlayOilSteps(OIL_STEPS, vehicle), [vehicle]);
  const tools = useMemo(() => overlayTools(vehicle), [vehicle]);
  const affiliates = useMemo(() => overlayAffiliates(vehicle), [vehicle]);
  const spec = vehicle ? specSummary(vehicle) : null;

  const camera = useMemo(() => {
    if (step == null) return DEFAULT_CAM;
    return steps[step - 1]?.camera ?? DEFAULT_CAM;
  }, [step, steps]);

  function pickStep(id: number) {
    const s = steps[id - 1];
    setStep(id);
    setSelected(s.part);
    if (s.part === "oilVolume") setDraining(true);
  }

  function resetView() {
    setStep(null);
    setSelected("oilPan");
    setExplode(0);
    setAutoRotate(false);
    setDraining(false);
    setResetToken((n) => n + 1);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-4">
      <DisclaimerBanner />
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-4">
        <section className="steel-panel overflow-hidden min-h-[360px] lg:min-h-[560px] relative">
          <OilBay
            explode={explode}
            selected={selected}
            onSelect={(id) => {
              setSelected(id);
              const match = steps.find((s) => s.part === id);
              if (match) setStep(match.id);
            }}
            draining={draining}
            autoRotate={autoRotate}
            camera={camera}
            resetToken={resetToken}
          />
          <div className="absolute left-3 top-3 text-[10px] uppercase tracking-[0.25em] text-garage-amber/80">
            Bay 01 · Oil system
          </div>
        </section>
        <section className="steel-panel p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            <VehicleChip />
            <button type="button" onClick={() => setAutoRotate((v) => !v)} className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-xs uppercase tracking-widest hover:border-garage-amber">
              <RotateCw className="h-3.5 w-3.5" />
              {autoRotate ? "Stop rotate" : "Auto-rotate"}
            </button>
            <button type="button" onClick={resetView} className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-xs uppercase tracking-widest hover:border-garage-amber">
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
            <button type="button" onClick={() => setDraining((v) => !v)} className="inline-flex items-center gap-2 border border-safety/50 px-3 py-2 text-xs uppercase tracking-widest text-[#ffb4b4] hover:border-safety">
              <Droplets className="h-3.5 w-3.5" />
              {draining ? "Stop drain" : "Drain oil"}
            </button>
          </div>
          <label className="block text-xs uppercase tracking-widest text-garage-steel">
            Exploded view
            <input type="range" min={0} max={1} step={0.01} value={explode} onChange={(e) => setExplode(Number(e.target.value))} className="mt-2 w-full accent-garage-amber" />
          </label>
          {spec ? (
            <div className="border border-garage-amber/40 p-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-garage-amber">This engine</p>
              <p className="font-semibold mt-1">{spec.title}</p>
              <p className="text-sm mt-1">{spec.line}</p>
              <p className="text-xs text-garage-steel mt-1">{spec.spec}</p>
              {spec.note ? <p className="text-xs text-garage-steel mt-1">{spec.note}</p> : null}
              <p className="text-[11px] text-garage-steel mt-2">Confirm on the fill cap. 3D model stays generic. {spec.source}.</p>
            </div>
          ) : null}
          {selected ? (
            <div className="border border-white/10 p-3">
              <p className="font-stencil text-2xl tracking-widest text-garage-amber">{PARTS[selected].label}</p>
              <p className="text-sm text-garage-steel mt-1">{overlayPartHint(selected, vehicle)}</p>
            </div>
          ) : null}
          <ol className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {steps.map((s) => {
              const active = step === s.id;
              const complete = done.includes(s.id);
              return (
                <li key={s.id}>
                  <div className={`w-full text-left border px-3 py-2 flex items-start gap-2 ${active ? "border-garage-amber bg-garage-amber/10" : "border-white/10 hover:border-white/25"}`}>
                    <button type="button" onClick={() => pickStep(s.id)} className="flex-1 text-left flex items-start gap-2">
                      <span className="font-stencil text-xl text-garage-amber w-6">{String(s.id).padStart(2, "0")}</span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold">{s.title}</span>
                        {active ? (
                          <>
                            <span className="block text-sm text-garage-steel mt-1">{s.body}</span>
                            <span className="mt-2 flex gap-2 text-xs text-safety">
                              <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                              {s.safety}
                            </span>
                          </>
                        ) : null}
                      </span>
                    </button>
                    <button type="button" aria-label={`Mark step ${s.id} complete`} onClick={() => setDone((prev) => prev.includes(s.id) ? prev.filter((n) => n !== s.id) : [...prev, s.id])} className={`mt-0.5 h-6 w-6 border flex items-center justify-center shrink-0 ${complete ? "border-garage-amber text-garage-amber" : "border-white/20"}`}>
                      {complete ? <Check className="h-3.5 w-3.5" /> : null}
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
      <section className="steel-panel">
        <div className="flex border-b border-white/10">
          {([["how", "How oil works"], ["tools", "Tools & safety"], ["mistakes", "Common mistakes"]] as const).map(([id, label]) => (
            <button key={id} type="button" onClick={() => setTab(id)} className={`px-4 py-3 text-xs uppercase tracking-widest ${tab === id ? "text-garage-amber border-b-2 border-garage-amber" : "text-garage-steel"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="p-4 text-sm leading-relaxed">
          {tab === "how" ? (
            <div className="space-y-3">
              <p>Oil is a pressurized film. The pump pulls from the pan, pushes through the filter, and feeds bearings, cams, and walls. Gravity returns it to the pan. A change swaps contaminated oil and a loaded filter before the film fails.</p>
              <p className="text-garage-steel">Use Drain in the bay to watch the sump empty. That is a teaching animation — real drain time depends on viscosity and temperature. Use Explode to separate the pan, plug, and filter.</p>
            </div>
          ) : null}
          {tab === "tools" ? (
            <ul className="space-y-3">
              {tools.map((t) => (
                <li key={t.name} className="flex gap-3">
                  <Wrench className="h-4 w-4 text-garage-amber shrink-0 mt-0.5" />
                  <span><span className="font-semibold">{t.name}. </span><span className="text-garage-steel">{t.why}</span></span>
                </li>
              ))}
            </ul>
          ) : null}
          {tab === "mistakes" ? (
            <ul className="space-y-2">
              {MISTAKES.map((m) => (
                <li key={m} className="flex gap-3">
                  <ShieldAlert className="h-4 w-4 text-safety shrink-0 mt-0.5" />
                  {m}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
      <section>
        <h2 className="font-stencil text-3xl tracking-widest text-garage-amber mb-3">Gear</h2>
        <p className="text-xs uppercase tracking-widest text-garage-steel mb-3">Affiliate placeholders — no paid links live yet</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {affiliates.map((a) => (
            <a key={a.id} href="#" rel="sponsored nofollow" className="steel-panel p-4 hover:border-garage-amber/60" onClick={(e) => e.preventDefault()}>
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-garage-steel mt-1">{a.note}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
