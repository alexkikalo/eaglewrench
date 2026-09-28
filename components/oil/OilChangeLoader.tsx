"use client";

import dynamic from "next/dynamic";

const OilChangeExperience = dynamic(
  () => import("@/components/oil/OilChangeExperience").then((m) => m.OilChangeExperience),
  {
    ssr: false,
    loading: () => (
      <div className="bay-frame">
        <div className="bay-shell">
          <div className="bay-preview steel-panel grid place-items-center text-garage-steel">Lighting the bay…</div>
          <div className="bay-steps steel-panel" />
        </div>
      </div>
    ),
  },
);

export function OilChangeLoader() {
  return <OilChangeExperience />;
}
