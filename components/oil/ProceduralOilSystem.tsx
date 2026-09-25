"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { PARTS, type PartId } from "@/lib/oil-content";

type Props = {
  explode: number;
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  draining: boolean;
  showLabels: boolean;
};

function useExplode(id: PartId, explode: number): [number, number, number] {
  const [x, y, z] = PARTS[id].explode;
  return [x * explode, y * explode, z * explode];
}

function HighlightMaterial({
  color,
  selected,
  metalness = 0.55,
  roughness = 0.4,
}: {
  color: string;
  selected: boolean;
  metalness?: number;
  roughness?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={metalness}
      roughness={roughness}
      emissive={selected ? "#d4a017" : "#000000"}
      emissiveIntensity={selected ? 0.45 : 0}
    />
  );
}

function PartLabel({ text, visible }: { text: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
      <div className="rounded-sm bg-garage-950/90 border border-garage-amber/60 px-2 py-1 text-[11px] tracking-wide uppercase text-garage-amber whitespace-nowrap">
        {text}
      </div>
    </Html>
  );
}

function DrainStream({ active }: { active: boolean }) {
  const refs = useRef<THREE.Mesh[]>([]);
  const drops = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        x: Math.sin(i * 12.1) * 0.04,
        z: Math.cos(i * 9.7) * 0.04,
        phase: i / 18,
      })),
    [],
  );

  useFrame((_, dt) => {
    if (!active) return;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.y -= dt * 1.6;
      if (mesh.position.y < -1.6) mesh.position.y = -0.62;
      const t = (drops[i].phase + performance.now() * 0.0004) % 1;
      mesh.scale.setScalar(0.5 + t * 0.6);
    });
  });

  if (!active) return null;

  return (
    <group position={[0.08, 0, 0.18]}>
      {drops.map((d, i) => (
        <mesh
          key={i}
          position={[d.x, -0.7 - (i % 5) * 0.12, d.z]}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#5a3a12" roughness={0.3} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

export function ProceduralOilSystem({
  explode,
  selected,
  onSelect,
  draining,
  showLabels,
}: Props) {
  const pan = useExplode("oilPan", explode);
  const plug = useExplode("drainPlug", explode);
  const filter = useExplode("oilFilter", explode);
  const pad = useExplode("filterHousing", explode);
  const stick = useExplode("dipstick", explode);
  const cap = useExplode("fillCap", explode);
  const oil = useExplode("oilVolume", explode);

  return (
    <group>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.6, 0.9, 1.1]} />
        <meshStandardMaterial color="#3a3f46" metalness={0.4} roughness={0.55} />
      </mesh>
      <group position={pan} onClick={(e) => { e.stopPropagation(); onSelect("oilPan"); }}>
        <mesh position={[0, -0.35, 0]} castShadow>
          <boxGeometry args={[1.45, 0.28, 0.95]} />
          <HighlightMaterial color="#5c636c" selected={selected === "oilPan"} />
        </mesh>
        <PartLabel text={PARTS.oilPan.label} visible={showLabels && selected === "oilPan"} />
      </group>
      <group position={[plug[0] + 0.08, plug[1] - 0.52, plug[2] + 0.18]} onClick={(e) => { e.stopPropagation(); onSelect("drainPlug"); }}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.16, 12]} />
          <HighlightMaterial color="#c9a227" selected={selected === "drainPlug"} metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.05, 6]} />
          <HighlightMaterial color="#b8860b" selected={selected === "drainPlug"} metalness={0.7} />
        </mesh>
        <PartLabel text={PARTS.drainPlug.label} visible={showLabels && selected === "drainPlug"} />
      </group>
      <group position={[oil[0], oil[1] - 0.38, oil[2]]} onClick={(e) => { e.stopPropagation(); onSelect("oilVolume"); }}>
        <mesh>
          <boxGeometry args={[1.2, 0.12, 0.75]} />
          <meshStandardMaterial color={draining ? "#3d2208" : "#6b3e0d"} transparent opacity={draining ? 0.35 : 0.75} roughness={0.2} metalness={0.05} />
        </mesh>
        <PartLabel text={PARTS.oilVolume.label} visible={showLabels && selected === "oilVolume"} />
      </group>
      <group position={[pad[0] - 0.55, pad[1] + 0.05, pad[2] + 0.05]} onClick={(e) => { e.stopPropagation(); onSelect("filterHousing"); }}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.08, 16]} />
          <HighlightMaterial color="#2f3338" selected={selected === "filterHousing"} />
        </mesh>
        <PartLabel text={PARTS.filterHousing.label} visible={showLabels && selected === "filterHousing"} />
      </group>
      <group position={[filter[0] - 0.82, filter[1] + 0.05, filter[2] + 0.05]} onClick={(e) => { e.stopPropagation(); onSelect("oilFilter"); }}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.42, 20]} />
          <HighlightMaterial color="#d8d3c4" selected={selected === "oilFilter"} metalness={0.2} roughness={0.5} />
        </mesh>
        <PartLabel text={PARTS.oilFilter.label} visible={showLabels && selected === "oilFilter"} />
      </group>
      <group position={[stick[0] + 0.35, stick[1] + 0.95, stick[2]]} onClick={(e) => { e.stopPropagation(); onSelect("dipstick"); }}>
        <mesh>
          <cylinderGeometry args={[0.018, 0.018, 1.1, 8]} />
          <HighlightMaterial color="#9aa3ad" selected={selected === "dipstick"} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <boxGeometry args={[0.08, 0.04, 0.04]} />
          <HighlightMaterial color="#c44b2b" selected={selected === "dipstick"} />
        </mesh>
        <PartLabel text={PARTS.dipstick.label} visible={showLabels && selected === "dipstick"} />
      </group>
      <group position={[cap[0] - 0.15, cap[1] + 0.88, cap[2]]} onClick={(e) => { e.stopPropagation(); onSelect("fillCap"); }}>
        <mesh>
          <cylinderGeometry args={[0.09, 0.09, 0.07, 16]} />
          <HighlightMaterial color="#1f4d2a" selected={selected === "fillCap"} />
        </mesh>
        <PartLabel text={PARTS.fillCap.label} visible={showLabels && selected === "fillCap"} />
      </group>
      <DrainStream active={draining} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#16181c" roughness={0.9} metalness={0.2} />
      </mesh>
    </group>
  );
}
