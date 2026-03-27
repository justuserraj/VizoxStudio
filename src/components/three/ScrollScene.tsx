"use client";

import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function ScrollParticles({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null);
  const count = 500;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = (Math.random() - 0.5) * 15;

    const color = new THREE.Color(
      Math.random() > 0.5 ? "#7C4DFF" : "#A78BFF"
    );
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y = time * 0.05 + scrollProgress * Math.PI;
    ref.current.rotation.x = Math.sin(time * 0.1) * 0.2 + scrollProgress * 0.5;

    const posAttr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 1] += Math.sin(time + i) * 0.002;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ScrollTorus({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x = scrollProgress * Math.PI * 2;
    ref.current.rotation.y = scrollProgress * Math.PI;
    ref.current.scale.setScalar(0.8 + scrollProgress * 0.4);
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={ref}>
        <torusGeometry args={[1.5, 0.3, 32, 100]} />
        <MeshDistortMaterial
          color="#7C4DFF"
          metalness={0.8}
          roughness={0.15}
          distort={0.2}
          speed={2}
          emissive="#7C4DFF"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function ScrollSphere({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.position.x = Math.sin(scrollProgress * Math.PI * 2) * 3;
    ref.current.position.y = Math.cos(scrollProgress * Math.PI * 2) * 2;
    ref.current.scale.setScalar(0.5 + Math.sin(time * 2) * 0.1);
  });

  return (
    <mesh ref={ref} position={[3, 0, -2]}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial
        color="#FF6B9D"
        metalness={0.9}
        roughness={0.1}
        emissive="#FF6B9D"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export function ScrollScene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 3, 3]} intensity={0.8} color="#7C4DFF" />
          <pointLight position={[-3, -3, -3]} intensity={0.4} color="#FF6B9D" />

          <ScrollParticles scrollProgress={scrollProgress} />
          <ScrollTorus scrollProgress={scrollProgress} />
          <ScrollSphere scrollProgress={scrollProgress} />

          <EffectComposer>
            <Bloom intensity={0.5} luminanceThreshold={0.4} luminanceSmoothing={0.9} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
