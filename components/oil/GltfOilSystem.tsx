"use client";

import { Html, useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { PARTS, type PartId } from "@/lib/oil-content";

type Props = {
  explode: number;
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  showLabels: boolean;
};

const NAME_MAP: Record<string, PartId> = {
  oilpan: "oilPan",
  pan: "oilPan",
  drainplug: "drainPlug",
  plug: "drainPlug",
  oilfilter: "oilFilter",
  filter: "oilFilter",
  filterhousing: "filterHousing",
  pad: "filterHousing",
  dipstick: "dipstick",
  fillcap: "fillCap",
  cap: "fillCap",
  oil: "oilVolume",
};

function resolvePart(name: string): PartId | null {
  const key = name.toLowerCase().replace(/[^a-z]/g, "");
  return NAME_MAP[key] ?? null;
}

export function GltfOilSystem({ explode, selected, onSelect, showLabels }: Props) {
  const { scene } = useGLTF("/models/oil-system.glb");
  const rooted = useMemo(() => scene.clone(true), [scene]);

  const labeled = useMemo(() => {
    const hits: { id: PartId; position: THREE.Vector3 }[] = [];
    rooted.traverse((obj) => {
      const id = resolvePart(obj.name);
      if (id && obj instanceof THREE.Object3D) {
        const world = new THREE.Vector3();
        obj.getWorldPosition(world);
        hits.push({ id, position: world });
      }
    });
    return hits;
  }, [rooted]);

  function handleClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    let current: THREE.Object3D | null = e.object;
    while (current) {
      const id = resolvePart(current.name);
      if (id) {
        onSelect(id);
        return;
      }
      current = current.parent;
    }
  }

  rooted.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const id = resolvePart(obj.name);
    const offset = id ? PARTS[id].explode : [0, 0, 0];
    obj.position.set(offset[0] * explode, offset[1] * explode, offset[2] * explode);
    const mat = obj.material;
    if (mat && !Array.isArray(mat) && "emissive" in mat) {
      const std = mat as THREE.MeshStandardMaterial;
      std.emissive = new THREE.Color(selected && id === selected ? "#d4a017" : "#000000");
      std.emissiveIntensity = selected && id === selected ? 0.45 : 0;
    }
  });

  return (
    <group onClick={handleClick}>
      <primitive object={rooted} />
      {showLabels &&
        labeled
          .filter((h) => h.id === selected)
          .map((h) => (
            <Html key={h.id} position={h.position} center distanceFactor={8} style={{ pointerEvents: "none" }}>
              <div className="rounded-sm bg-garage-950/90 border border-garage-amber/60 px-2 py-1 text-[11px] tracking-wide uppercase text-garage-amber whitespace-nowrap">
                {PARTS[h.id].label}
              </div>
            </Html>
          ))}
    </group>
  );
}

if (process.env.NEXT_PUBLIC_USE_GLB === "true") {
  useGLTF.preload("/models/oil-system.glb");
}
