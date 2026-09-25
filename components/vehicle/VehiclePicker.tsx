"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  enginesFor,
  makesForYear,
  modelsFor,
  vehicleLabel,
  yearsInCatalog,
} from "@/lib/vehicle/catalog";
import { useVehicle } from "@/components/vehicle/VehicleProvider";

export function VehiclePicker({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { vehicle, setVehicleId } = useVehicle();
  const years = yearsInCatalog();
  const [year, setYear] = useState<number | "">(vehicle?.yearEnd ?? "");
  const [make, setMake] = useState(vehicle?.make ?? "");
  const [model, setModel] = useState(vehicle?.model ?? "");

  const makes = year ? makesForYear(year) : [];
  const models = year && make ? modelsFor(year, make) : [];
  const engines = year && make && model ? enginesFor(year, make, model) : [];
  const preview = useMemo(() => engines[0] ?? null, [engines]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 z-[80] bg-black/45"
        aria-label="Close vehicle panel"
        onClick={onClose}
      />
      <aside
        className="fixed top-0 right-0 z-[90] h-dvh w-full max-w-md overflow-y-auto border-l border-white/15 bg-[#121417] p-4 shadow-bay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vehicle-panel-title"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-garage-amber">Bay vehicle</p>
            <h2 id="vehicle-panel-title" className="font-stencil text-3xl tracking-wide">
              Select engine
            </h2>
          </div>
          <button type="button" onClick={onClose} className="border border-white/20 p-2 hover:border-garage-amber" aria-label="Close vehicle panel">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-garage-steel mt-3">
          Saved on this phone. Every future bay reads this selection. The 3D model stays the teaching stand-in.
        </p>
        <div className="grid gap-3 mt-4">
          <Field label="Year">
            <select value={year} onChange={(e) => { const next = e.target.value ? Number(e.target.value) : ""; setYear(next); setMake(""); setModel(""); }}>
              <option value="">Select year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </Field>
          <Field label="Make">
            <select value={make} disabled={!year} onChange={(e) => { setMake(e.target.value); setModel(""); }}>
              <option value="">Select make</option>
              {makes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </Field>
          <Field label="Model">
            <select value={model} disabled={!make} onChange={(e) => setModel(e.target.value)}>
              <option value="">Select model</option>
              {models.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </Field>
          <Field label="Engine">
            <select
              value={engines.some((eng) => eng.id === vehicle?.id) ? vehicle!.id : ""}
              disabled={!model}
              onChange={(e) => {
                if (e.target.value) {
                  setVehicleId(e.target.value);
                  onClose();
                }
              }}
            >
              <option value="">{engines.length ? "Select engine" : "—"}</option>
              {engines.map((eng) => (
                <option key={eng.id} value={eng.id}>{eng.engine}</option>
              ))}
            </select>
          </Field>
        </div>
        {preview ? (
          <div className="mt-4 border border-garage-amber/40 p-3 text-sm">
            <p className="font-semibold text-garage-amber">{vehicleLabel(preview)}</p>
            <p className="mt-1">{preview.oil.viscosity} · {preview.oil.capacityWithFilterQt} qt with filter · {preview.oil.filterOem}</p>
            <p className="text-garage-steel mt-1">{preview.oil.spec}</p>
            <p className="text-xs text-garage-steel mt-2">Confirm on the fill cap and owner’s manual. {preview.oil.source}.</p>
            <button type="button" className="mt-3 w-full px-4 py-2 bg-garage-amber text-garage-950 font-stencil tracking-[0.16em]" onClick={() => { setVehicleId(preview.id); onClose(); }}>
              USE THIS ENGINE
            </button>
          </div>
        ) : null}
        <button type="button" className="mt-4 text-xs uppercase tracking-widest text-garage-steel hover:text-garage-amber" onClick={() => { setVehicleId(null); onClose(); }}>
          Clear — teaching bay (no vehicle)
        </button>
      </aside>
    </>,
    document.body,
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="text-[10px] uppercase tracking-[0.2em] text-garage-steel block">
      {label}
      <div className="mt-1 [&_select]:w-full [&_select]:bg-garage-950 [&_select]:border [&_select]:border-white/15 [&_select]:px-2 [&_select]:py-2 [&_select]:text-sm [&_select]:text-garage-amber">
        {children}
      </div>
    </label>
  );
}
