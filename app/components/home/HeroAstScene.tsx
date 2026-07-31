"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";

function AstGraph({ mouse }: { mouse: MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);

  const { positions, links } = useMemo(() => {
    const nodes: [number, number, number][] = [
      [0, 0, 0],
      [-1.4, 0.8, -0.4],
      [1.5, 0.6, -0.3],
      [-1.1, -1.0, 0.2],
      [1.2, -0.9, 0.4],
      [0.1, 1.4, -0.8],
      [-0.2, -1.5, -0.6],
      [2.0, 0.1, -1.1],
      [-2.0, 0.2, -0.9],
      [0.8, 0.3, 1.0],
      [-0.7, 0.4, 1.1],
      [0.3, -0.2, -1.6],
    ];
    const edges: [number, number][] = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [1, 8],
      [2, 7],
      [3, 10],
      [4, 9],
      [5, 7],
      [6, 11],
      [9, 10],
    ];
    return { positions: nodes, links: edges };
  }, []);

  useFrame(() => {
    if (!group.current) return;
    // Max ~15deg tilt toward cursor
    const targetX = THREE.MathUtils.clamp(mouse.current.y * 0.26, -0.26, 0.26);
    const targetY = THREE.MathUtils.clamp(mouse.current.x * 0.26, -0.26, 0.26);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.06);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.06);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={group} position={[1.1, 0.1, 0]}>
        {links.map(([a, b], i) => {
          const start = new THREE.Vector3(...positions[a]);
          const end = new THREE.Vector3(...positions[b]);
          const mid = start.clone().lerp(end, 0.5);
          const dir = end.clone().sub(start);
          const len = dir.length();
          const quat = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            dir.clone().normalize()
          );
          return (
            <mesh key={i} position={mid.toArray()} quaternion={quat}>
              <cylinderGeometry args={[0.012, 0.012, len, 6]} />
              <meshBasicMaterial color="#94a3b8" transparent opacity={0.4} />
            </mesh>
          );
        })}
        {positions.map((p, i) => (
          <mesh key={`n-${i}`} position={p}>
            <sphereGeometry args={[i === 0 ? 0.12 : 0.055 + (i % 3) * 0.01, 16, 16]} />
            <meshStandardMaterial
              color={i === 0 ? "#2563eb" : i % 2 === 0 ? "#38bdf8" : "#6366f1"}
              emissive={i === 0 ? "#1d4ed8" : "#0ea5e9"}
              emissiveIntensity={0.3}
              roughness={0.35}
              metalness={0.15}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function HeroAstScene() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 4, 2]} intensity={1.05} />
        <AstGraph mouse={mouse} />
        <EffectComposer>
          <DepthOfField focusDistance={0.018} focalLength={0.035} bokehScale={2} height={480} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
