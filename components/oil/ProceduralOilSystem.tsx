"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { PARTS, type PartId } from "@/lib/oil-content";
import { drainLocal, filterLocal, type OilBayLayout } from "@/lib/vehicle/bay-layout";

type Props = {
  explode: number;
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  draining: boolean;
  showLabels: boolean;
  layout: OilBayLayout;
};

function useExplode(id: PartId, explode: number): [number, number, number] {
  const [x, y, z] = PARTS[id].explode;
  return [x * explode, y * explode, z * explode];
}

function Mat({
  color,
  selected,
  metalness = 0.4,
  roughness = 0.34,
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
      emissiveIntensity={selected ? 0.5 : 0}
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

function DrainStream({ active, origin }: { active: boolean; origin: [number, number, number] }) {
  const refs = useRef<THREE.Mesh[]>([]);
  const drops = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        x: Math.sin(i * 12.1) * 0.035,
        z: Math.cos(i * 9.7) * 0.035,
      })),
    [],
  );

  useFrame((_, dt) => {
    if (!active) return;
    refs.current.forEach((mesh) => {
      if (!mesh) return;
      mesh.position.y -= dt * 1.55;
      if (mesh.position.y < origin[1] - 1.05) mesh.position.y = origin[1] - 0.02;
    });
  });

  if (!active) return null;

  return (
    <group position={origin}>
      {drops.map((d, i) => (
        <mesh
          key={i}
          position={[d.x, -0.08 - (i % 5) * 0.1, d.z]}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#d27a1a" roughness={0.25} metalness={0.08} />
        </mesh>
      ))}
    </group>
  );
}

function VehicleGhost({ layout }: { layout: OilBayLayout }) {
  const pickup = layout.bodyClass === "pickup";
  const jeep = layout.bodyClass === "jeep";
  const tall = pickup || jeep;
  const railY = -0.92 + layout.ride * 0.15;
  const railLen = pickup ? 4.6 : jeep ? 3.4 : 3.8;
  const railGap = pickup ? 0.78 : 0.7;
  const floorY = railY + 0.12;

  return (
    <group>
      <mesh position={[-railGap, railY, 0.15]} castShadow>
        <boxGeometry args={[0.1, 0.12, railLen]} />
        <meshStandardMaterial color="#5a616b" metalness={0.45} roughness={0.48} />
      </mesh>
      <mesh position={[railGap, railY, 0.15]} castShadow>
        <boxGeometry args={[0.1, 0.12, railLen]} />
        <meshStandardMaterial color="#5a616b" metalness={0.45} roughness={0.48} />
      </mesh>
      <mesh position={[0, railY, -1.15]}>
        <boxGeometry args={[railGap * 2 + 0.12, 0.08, 0.14]} />
        <meshStandardMaterial color="#6a7180" metalness={0.35} roughness={0.5} />
      </mesh>
      <mesh position={[0, railY, 1.35]}>
        <boxGeometry args={[railGap * 2 + 0.12, 0.08, 0.14]} />
        <meshStandardMaterial color="#6a7180" metalness={0.35} roughness={0.5} />
      </mesh>
      {pickup ? (
        <>
          <mesh position={[0, floorY + 0.35, 1.85]} receiveShadow>
            <boxGeometry args={[1.7, 0.06, 1.7]} />
            <meshStandardMaterial color="#4c545e" roughness={0.7} metalness={0.18} />
          </mesh>
          <mesh position={[0, floorY + 0.85, -1.55]}>
            <boxGeometry args={[1.85, 1.1, 0.12]} />
            <meshStandardMaterial color="#3e4650" roughness={0.74} metalness={0.12} transparent opacity={0.55} />
          </mesh>
        </>
      ) : (
        <mesh position={[0, floorY + (tall ? 0.22 : 0.08), 0.2]} receiveShadow>
          <boxGeometry args={[1.55, 0.05, railLen * 0.72]} />
          <meshStandardMaterial color="#4a515b" roughness={0.72} metalness={0.16} transparent opacity={0.55} />
        </mesh>
      )}
      {([-1.55, 1.55] as const).map((z) =>
        ([-railGap, railGap] as const).map((x) => (
          <group key={`${x}-${z}`} position={[x, -1.18, z]}>
            <mesh>
              <boxGeometry args={[0.16, 0.42, 0.16]} />
              <meshStandardMaterial color="#c9a227" metalness={0.55} roughness={0.35} />
            </mesh>
            <mesh position={[0, -0.24, 0]}>
              <boxGeometry args={[0.32, 0.06, 0.32]} />
              <meshStandardMaterial color="#2b3038" metalness={0.2} roughness={0.6} />
            </mesh>
          </group>
        )),
      )}
    </group>
  );
}

function EngineBlock({ layout }: { layout: OilBayLayout }) {
  const { w, h, d } = layout.block;
  const y = layout.ride + h * 0.15;
  const v = layout.arch === "v6" || layout.arch === "v8";
  const boxer = layout.arch === "h4";

  return (
    <group position={[0, y, 0]}>
      <mesh castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color="#6d7580" metalness={0.3} roughness={0.46} />
      </mesh>
      {v ? (
        <>
          <mesh position={[-w * 0.22, h * 0.28, 0]} rotation={[0, 0, 0.42]} castShadow>
            <boxGeometry args={[w * 0.42, h * 0.42, d * 0.86]} />
            <meshStandardMaterial color="#5c646e" metalness={0.28} roughness={0.5} />
          </mesh>
          <mesh position={[w * 0.22, h * 0.28, 0]} rotation={[0, 0, -0.42]} castShadow>
            <boxGeometry args={[w * 0.42, h * 0.42, d * 0.86]} />
            <meshStandardMaterial color="#5c646e" metalness={0.28} roughness={0.5} />
          </mesh>
        </>
      ) : null}
      {boxer ? (
        <>
          <mesh position={[-w * 0.38, -0.02, 0]} castShadow>
            <boxGeometry args={[w * 0.28, h * 0.55, d * 0.82]} />
            <meshStandardMaterial color="#5a626c" metalness={0.28} roughness={0.5} />
          </mesh>
          <mesh position={[w * 0.38, -0.02, 0]} castShadow>
            <boxGeometry args={[w * 0.28, h * 0.55, d * 0.82]} />
            <meshStandardMaterial color="#5a626c" metalness={0.28} roughness={0.5} />
          </mesh>
        </>
      ) : null}
      <mesh position={[0, h * 0.52, 0]} castShadow>
        <boxGeometry args={[boxer ? w * 0.42 : w * 0.72, 0.12, d * 0.78]} />
        <meshStandardMaterial color="#3f464f" metalness={0.22} roughness={0.55} />
      </mesh>
      <mesh position={[0, h * 0.08, -d * 0.52]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.12, 14]} />
        <meshStandardMaterial color="#2f343c" metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  );
}

export function ProceduralOilSystem({
  explode,
  selected,
  onSelect,
  draining,
  showLabels,
  layout,
}: Props) {
  const panOff = useExplode("oilPan", explode);
  const plugOff = useExplode("drainPlug", explode);
  const filterOff = useExplode("oilFilter", explode);
  const padOff = useExplode("filterHousing", explode);
  const stickOff = useExplode("dipstick", explode);
  const capOff = useExplode("fillCap", explode);
  const oilOff = useExplode("oilVolume", explode);

  const { w, h, d } = layout.block;
  const filterPos = filterLocal(layout);
  const drainPos = drainLocal(layout);
  const panY = layout.ride - 0.38;
  const panW = Math.max(0.85, w * 0.92);
  const panD = Math.max(0.7, d * 0.72);
  const panH = 0.2 + layout.oilScale * 0.08;
  const oilH = Math.max(0.08, 0.07 + layout.oilScale * 0.07);
  const cartridge = layout.filterStyle === "cartridge";
  const capPos: [number, number, number] = [layout.arch === "h4" ? 0.08 : -0.12, layout.ride + h * 0.72, -d * 0.08];
  const stickPos: [number, number, number] = [w * 0.28, layout.ride + h * 0.15, d * 0.12];

  return (
    <group>
      <VehicleGhost layout={layout} />
      <EngineBlock layout={layout} />

      <group
        position={[panOff[0], panOff[1] + panY, panOff[2]]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect("oilPan");
        }}
      >
        <mesh castShadow>
          <boxGeometry args={[panW, panH, panD]} />
          <Mat color="#8a93a0" selected={selected === "oilPan"} metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, -panH * 0.35, 0]}>
          <boxGeometry args={[panW * 0.86, panH * 0.45, panD * 0.82]} />
          <Mat color="#6e7682" selected={selected === "oilPan"} />
        </mesh>
        <PartLabel text={PARTS.oilPan.label} visible={showLabels && selected === "oilPan"} />
      </group>

      <group
        position={[oilOff[0], oilOff[1] + panY + 0.02, oilOff[2]]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect("oilVolume");
        }}
      >
        <mesh>
          <boxGeometry args={[panW * 0.78, oilH, panD * 0.72]} />
          <meshStandardMaterial
            color={draining ? "#7a3f0c" : "#c46a14"}
            transparent
            opacity={draining ? 0.38 : 0.86}
            roughness={0.2}
            metalness={0.05}
          />
        </mesh>
        <PartLabel text={PARTS.oilVolume.label} visible={showLabels && selected === "oilVolume"} />
      </group>

      <group
        position={[drainPos[0] + plugOff[0], drainPos[1] + plugOff[1], drainPos[2] + plugOff[2]]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect("drainPlug");
        }}
      >
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.065, 0.15, 12]} />
          <Mat color="#c9a227" selected={selected === "drainPlug"} metalness={0.8} roughness={0.22} />
        </mesh>
        <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.045, 6]} />
          <Mat color="#b8860b" selected={selected === "drainPlug"} metalness={0.7} />
        </mesh>
        <PartLabel text={PARTS.drainPlug.label} visible={showLabels && selected === "drainPlug"} />
      </group>

      <group
        position={[filterPos[0] + padOff[0] * 0.4, filterPos[1] + padOff[1], filterPos[2] + padOff[2] * 0.4]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect("filterHousing");
        }}
      >
        {cartridge ? (
          <mesh>
            <cylinderGeometry args={[0.16, 0.16, 0.28, 16]} />
            <Mat color="#4a515a" selected={selected === "filterHousing"} />
          </mesh>
        ) : (
          <mesh rotation={[0, 0, layout.filterMount === "front-block" ? 0 : Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.07, 16]} />
            <Mat color="#4e555e" selected={selected === "filterHousing"} />
          </mesh>
        )}
        <PartLabel text={cartridge ? "Housing" : PARTS.filterHousing.label} visible={showLabels && selected === "filterHousing"} />
      </group>

      <group
        position={[
          filterPos[0] + filterOff[0] + (layout.filterMount === "passenger-block" ? 0.28 : 0),
          filterPos[1] + filterOff[1] + (cartridge ? 0.28 : layout.filterMount === "front-block" ? -0.28 : 0),
          filterPos[2] + filterOff[2] + (layout.filterMount === "front-block" && !cartridge ? -0.28 : 0),
        ]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect("oilFilter");
        }}
      >
        {cartridge ? (
          <>
            <mesh>
              <cylinderGeometry args={[0.13, 0.13, 0.22, 16]} />
              <Mat color="#d9d1bf" selected={selected === "oilFilter"} metalness={0.12} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.16, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.07, 16]} />
              <Mat color="#3f8f52" selected={selected === "oilFilter"} />
            </mesh>
          </>
        ) : (
          <mesh
            rotation={layout.filterMount === "front-block" ? [Math.PI / 2, 0, 0] : [0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.17, 0.17, 0.4, 18]} />
            <Mat color="#efe6d2" selected={selected === "oilFilter"} metalness={0.16} roughness={0.42} />
          </mesh>
        )}
        <PartLabel
          text={cartridge ? "Cartridge" : PARTS.oilFilter.label}
          visible={showLabels && selected === "oilFilter"}
        />
      </group>

      <group
        position={[stickPos[0] + stickOff[0], stickPos[1] + stickOff[1] + 0.55, stickPos[2] + stickOff[2]]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect("dipstick");
        }}
      >
        <mesh>
          <cylinderGeometry args={[0.016, 0.016, 0.95, 8]} />
          <Mat color="#9aa3ad" selected={selected === "dipstick"} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.075, 0.035, 0.035]} />
          <Mat color="#c44b2b" selected={selected === "dipstick"} />
        </mesh>
        <PartLabel text={PARTS.dipstick.label} visible={showLabels && selected === "dipstick"} />
      </group>

      <group
        position={[capPos[0] + capOff[0], capPos[1] + capOff[1], capPos[2] + capOff[2]]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect("fillCap");
        }}
      >
        <mesh>
          <cylinderGeometry args={[0.09, 0.09, 0.07, 16]} />
          <Mat color="#3f8f52" selected={selected === "fillCap"} />
        </mesh>
        <PartLabel text={PARTS.fillCap.label} visible={showLabels && selected === "fillCap"} />
      </group>

      <DrainStream active={draining} origin={drainPos} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.42, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#323840" roughness={0.8} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.2, -5]} receiveShadow>
        <planeGeometry args={[16, 8]} />
        <meshStandardMaterial color="#3f4752" roughness={0.86} metalness={0.08} />
      </mesh>
      <gridHelper args={[12, 24, "#d4a017", "#4e5660"]} position={[0, -1.41, 0]} />
    </group>
  );
}
