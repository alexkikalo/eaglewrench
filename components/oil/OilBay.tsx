"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { ProceduralOilSystem } from "@/components/oil/ProceduralOilSystem";
import { GltfOilSystem } from "@/components/oil/GltfOilSystem";
import type { PartId } from "@/lib/oil-content";

const useGlb = process.env.NEXT_PUBLIC_USE_GLB === "true";

type BayProps = {
  explode: number;
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  draining: boolean;
  autoRotate: boolean;
  camera: { position: [number, number, number]; target: [number, number, number] };
  resetToken: number;
};

function CameraRig({
  camera,
  resetToken,
}: {
  camera: { position: [number, number, number]; target: [number, number, number] };
  resetToken: number;
}) {
  const { camera: cam, controls } = useThree();
  const target = useRef(new THREE.Vector3(...camera.target));
  const goal = useRef(new THREE.Vector3(...camera.position));

  useEffect(() => {
    goal.current.set(...camera.position);
    target.current.set(...camera.target);
  }, [camera, resetToken]);

  useFrame((_, dt) => {
    cam.position.lerp(goal.current, Math.min(1, dt * 3));
    const ctrl = controls as unknown as { target?: THREE.Vector3 } | null;
    if (ctrl?.target) ctrl.target.lerp(target.current, Math.min(1, dt * 3));
    cam.lookAt(target.current);
  });

  return null;
}

function Lights() {
  return (
    <>
      <hemisphereLight args={["#f3ead2", "#3d433c", 1.05]} />
      <ambientLight intensity={0.72} />
      <directionalLight position={[4, 6, 3]} intensity={1.85} castShadow color="#fff4d8" />
      <directionalLight position={[-3, 2.4, -2]} intensity={0.55} color="#9ec4ff" />
      <spotLight position={[-2.4, 5.2, 2.4]} intensity={1.15} color="#ffd978" angle={0.55} penumbra={0.55} />
      <pointLight position={[0.2, 0.4, 2.4]} intensity={0.7} color="#ffe7b0" />
    </>
  );
}

export function OilBay(props: BayProps) {
  return (
    <div className="h-full min-h-[320px] w-full bg-[#2a3038] shadow-bay">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: props.camera.position, fov: 42, near: 0.1, far: 40 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#2a3038"]} />
        <fog attach="fog" args={["#2a3038", 12, 28]} />
        <Lights />
        <Suspense fallback={null}>
          {useGlb ? (
            <GltfOilSystem
              explode={props.explode}
              selected={props.selected}
              onSelect={props.onSelect}
              showLabels
            />
          ) : (
            <ProceduralOilSystem
              explode={props.explode}
              selected={props.selected}
              onSelect={props.onSelect}
              draining={props.draining}
              showLabels
            />
          )}
        </Suspense>
        <CameraRig camera={props.camera} resetToken={props.resetToken} />
        <OrbitControls
          makeDefault
          enableDamping
          autoRotate={props.autoRotate}
          autoRotateSpeed={0.6}
          minDistance={1.2}
          maxDistance={8}
          maxPolarAngle={Math.PI * 0.92}
        />
      </Canvas>
    </div>
  );
}
