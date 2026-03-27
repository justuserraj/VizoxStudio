"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";

export function FloatingGeometry({ mousePos }: { mousePos?: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const mx = mousePos?.x ?? 0;
    const my = mousePos?.y ?? 0;

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05 + mx * 0.3;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1 + my * 0.1;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3;
      torusRef.current.rotation.y = time * 0.2;
      torusRef.current.position.y = Math.sin(time * 0.5) * 0.5;
    }

    if (sphereRef.current) {
      sphereRef.current.position.x = Math.sin(time * 0.3) * 3;
      sphereRef.current.position.y = Math.cos(time * 0.4) * 2;
      sphereRef.current.position.z = Math.sin(time * 0.2) * 2;
    }

    if (octaRef.current) {
      octaRef.current.rotation.x = time * 0.4;
      octaRef.current.rotation.z = time * 0.3;
      octaRef.current.position.x = Math.cos(time * 0.25) * 4;
      octaRef.current.position.y = Math.sin(time * 0.35) * 3;
    }

    if (knotRef.current) {
      knotRef.current.rotation.x = time * 0.15;
      knotRef.current.rotation.y = time * 0.25;
      knotRef.current.position.y = Math.cos(time * 0.3) * 1.5;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.2 + 1;
      ringRef.current.rotation.z = time * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Torus */}
      <mesh ref={torusRef} position={[0, 0, 0]}>
        <torusGeometry args={[2, 0.4, 32, 100]} />
        <MeshDistortMaterial
          color="#7C4DFF"
          metalness={0.8}
          roughness={0.2}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Glass Sphere */}
      <mesh ref={sphereRef} position={[3, 1, -2]} scale={0.8}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.95}
          roughness={0.05}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#A78BFF"
        />
      </mesh>

      {/* Octahedron */}
      <mesh ref={octaRef} position={[-4, -1, -3]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#FF6B9D"
          metalness={0.9}
          roughness={0.1}
          emissive="#FF6B9D"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Torus Knot */}
      <mesh ref={knotRef} position={[-2, 2, -4]} scale={0.6}>
        <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
        <meshStandardMaterial
          color="#7C4DFF"
          metalness={0.7}
          roughness={0.2}
          emissive="#7C4DFF"
          emissiveIntensity={0.2}
          wireframe
        />
      </mesh>

      {/* Ring */}
      <mesh ref={ringRef} position={[2, -2, -3]}>
        <torusGeometry args={[1.5, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#A78BFF"
          metalness={1}
          roughness={0}
          emissive="#A78BFF"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Small floating spheres */}
      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingOrb key={i} index={i} />
      ))}
    </group>
  );
}

function FloatingOrb({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / 8) * Math.PI * 2;
  const radius = 5 + Math.random() * 3;

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    const speed = 0.2 + index * 0.05;
    ref.current.position.x = Math.cos(time * speed + angle) * radius;
    ref.current.position.y = Math.sin(time * speed * 0.7 + angle) * (radius * 0.6);
    ref.current.position.z = Math.sin(time * speed + angle) * radius * 0.5;
    ref.current.scale.setScalar(0.1 + Math.sin(time + index) * 0.05);
  });

  const colors = ["#7C4DFF", "#A78BFF", "#FF6B9D", "#00D4FF"];

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={colors[index % colors.length]}
        emissive={colors[index % colors.length]}
        emissiveIntensity={1}
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
}
