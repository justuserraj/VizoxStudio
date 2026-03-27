"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

export function Logo3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} scale={0.8}>
        {/* V letter shape using extruded geometry */}
        <mesh position={[-1.8, 0, 0]}>
          <boxGeometry args={[0.3, 1.5, 0.3]} />
          <meshStandardMaterial
            color="#7C4DFF"
            metalness={0.9}
            roughness={0.1}
            emissive="#7C4DFF"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[-0.9, -0.5, 0]} rotation={[0, 0, 0.35]}>
          <boxGeometry args={[0.3, 1, 0.3]} />
          <meshStandardMaterial
            color="#7C4DFF"
            metalness={0.9}
            roughness={0.1}
            emissive="#7C4DFF"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[0.9, -0.5, 0]} rotation={[0, 0, -0.35]}>
          <boxGeometry args={[0.3, 1, 0.3]} />
          <meshStandardMaterial
            color="#7C4DFF"
            metalness={0.9}
            roughness={0.1}
            emissive="#7C4DFF"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[1.8, 0, 0]}>
          <boxGeometry args={[0.3, 1.5, 0.3]} />
          <meshStandardMaterial
            color="#7C4DFF"
            metalness={0.9}
            roughness={0.1}
            emissive="#7C4DFF"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Dot */}
        <mesh position={[2.8, -0.4, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#FF6B9D"
            metalness={0.9}
            roughness={0}
            emissive="#FF6B9D"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}
