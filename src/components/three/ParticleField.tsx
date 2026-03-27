"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  mousePos?: { x: number; y: number };
}

export function ParticleField({ count = 2000, mousePos }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, velocities, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const primaryColor = new THREE.Color("#7C4DFF");
    const secondaryColor = new THREE.Color("#A78BFF");
    const accentColor = new THREE.Color("#FF6B9D");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 25;
      positions[i3 + 1] = (Math.random() - 0.5) * 25;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

      const colorChoice = Math.random();
      let color: THREE.Color;
      if (colorChoice < 0.6) color = primaryColor;
      else if (colorChoice < 0.85) color = secondaryColor;
      else color = accentColor;

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 0.5;
    }

    return { positions, velocities, colors, sizes };
  }, [count]);

  const particleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.8)");
    gradient.addColorStop(0.7, "rgba(255,255,255,0.2)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const posAttr = meshRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    const time = state.clock.elapsedTime;
    const mx = mousePos?.x ?? 0;
    const my = mousePos?.y ?? 0;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      posArray[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.01) * 0.002;
      posArray[i3 + 1] +=
        velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.01) * 0.002;
      posArray[i3 + 2] += velocities[i3 + 2];

      // Mouse influence
      const dx = mx * 5 - posArray[i3];
      const dy = -my * 5 - posArray[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 5) {
        const force = (5 - dist) * 0.001;
        posArray[i3] -= dx * force;
        posArray[i3 + 1] -= dy * force;
      }

      // Wrap around
      if (posArray[i3] > 12.5) posArray[i3] = -12.5;
      if (posArray[i3] < -12.5) posArray[i3] = 12.5;
      if (posArray[i3 + 1] > 12.5) posArray[i3 + 1] = -12.5;
      if (posArray[i3 + 1] < -12.5) posArray[i3 + 1] = 12.5;
      if (posArray[i3 + 2] > 10) posArray[i3 + 2] = -10;
      if (posArray[i3 + 2] < -10) posArray[i3 + 2] = 10;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={particleTexture || undefined}
        sizeAttenuation
      />
    </points>
  );
}
