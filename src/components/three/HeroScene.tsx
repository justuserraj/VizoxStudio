"use client";

import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { ParticleField } from "./ParticleField";
import { FloatingGeometry } from "./FloatingGeometry";

function CameraRig({ mousePos }: { mousePos: { x: number; y: number } }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x += (mousePos.x * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mousePos.y * 1 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function GlowingOrb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.position.x = Math.sin(time * 0.3) * 0.5;
    ref.current.position.y = Math.cos(time * 0.4) * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} position={[0, 0, -2]}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#7C4DFF"
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={3}
          emissive="#7C4DFF"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function GradientPlane() {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#0D001A") },
    uColor2: { value: new THREE.Color("#2A004F") },
    uColor3: { value: new THREE.Color("#7C4DFF") },
  }), []);

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={ref} position={[0, 0, -8]} scale={[30, 20, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;
          
          void main() {
            vec2 uv = vUv;
            float noise = sin(uv.x * 3.0 + uTime * 0.3) * cos(uv.y * 3.0 + uTime * 0.2) * 0.1;
            vec3 color = mix(uColor1, uColor2, uv.y + noise);
            color = mix(color, uColor3, smoothstep(0.3, 0.8, uv.x + uv.y + noise) * 0.15);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

function SceneContent({ mousePos }: { mousePos: { x: number; y: number } }) {
  return (
    <>
      <CameraRig mousePos={mousePos} />

      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={1} color="#7C4DFF" />
      <pointLight position={[5, -3, -3]} intensity={0.5} color="#FF6B9D" />

      <GradientPlane />
      <ParticleField count={1500} mousePos={mousePos} />
      <FloatingGeometry mousePos={mousePos} />
      <GlowingOrb />

      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette
          offset={0.3}
          darkness={0.7}
          blendFunction={BlendFunction.NORMAL}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0005, 0.0005)}
        />
      </EffectComposer>

      <Environment preset="night" />
    </>
  );
}

export function HeroScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setDpr(Math.min(window.devicePixelRatio, 2));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={isMobile ? 1 : dpr}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <SceneContent mousePos={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
}
