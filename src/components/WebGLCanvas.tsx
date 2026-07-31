"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

// ─── Gradient Plane Shaders ─────────────────────────────────────────────────

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  
  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    
    // Distance to mouse for liquid hover effect
    float dist = distance(uv, uMouse);
    float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.02 * exp(-dist * 5.0);
    
    uv += ripple;

    // Base color gradient (dark aesthetic)
    vec3 color = mix(vec3(0.04, 0.04, 0.05), vec3(0.09, 0.09, 0.12), uv.y + uv.x * 0.5);
    
    // Add grainy noise
    float noise = (rand(uv * (uTime + 1.0)) - 0.5) * 0.08;
    
    gl_FragColor = vec4(color + noise, 1.0);
  }
`;

// ─── Scene (original gradient + grain + ripple — untouched) ─────────────────

function Scene() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1.0 - (e.clientY / window.innerHeight); // Invert Y
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Lerp mouse for smoothness
      materialRef.current.uniforms.uMouse.value.lerp(mouse.current, 0.05);
    }
  });

  return (
    <mesh>
      {/* Plane covers the screen */}
      <planeGeometry args={[20, 20, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

// ─── Particle Shaders ───────────────────────────────────────────────────────

const particleVertexShader = `
  attribute float aSize;
  attribute float aOpacity;
  attribute vec3 aColor;

  varying float vOpacity;
  varying vec3 vColor;

  uniform float uPixelRatio;

  void main() {
    vOpacity = aOpacity;
    vColor = aColor;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying float vOpacity;
  varying vec3 vColor;

  void main() {
    // Soft circle with radial falloff
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.15, d) * vOpacity;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// ─── Particles Component ────────────────────────────────────────────────────

const PARTICLE_COUNT = 80;
const ATTRACT_RADIUS = 0.3;
const ATTRACT_STRENGTH = 0.012;
const BRIGHTEN_AMOUNT = 0.45;

const ACCENT_COLORS = [
  new THREE.Color("#e3f794"), // Lime
  new THREE.Color("#00e5ff"), // Cyan
  new THREE.Color("#ffd700"), // Gold
];

function Particles() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Smoothed mouse in NDC (-1..1) space, matching the world-space particle coords
  const mouseWorld = useRef(new THREE.Vector2(0, 0));

  // Track raw mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Map to world-space range that matches the viewport
      mouseWorld.current.x =
        ((e.clientX / window.innerWidth) - 0.5) * viewport.width;
      mouseWorld.current.y =
        ((1.0 - e.clientY / window.innerHeight) - 0.5) * viewport.height;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [viewport.width, viewport.height]);

  // Pre-compute per-particle data
  const [particleData] = useState(() => {
      const hw = viewport.width * 0.55;
      const hh = viewport.height * 0.55;

      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const basePositions = new Float32Array(PARTICLE_COUNT * 3);
      const sizes = new Float32Array(PARTICLE_COUNT);
      const opacities = new Float32Array(PARTICLE_COUNT);
      const baseOpacities = new Float32Array(PARTICLE_COUNT);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const speeds = new Float32Array(PARTICLE_COUNT);
      const phases = new Float32Array(PARTICLE_COUNT * 2); // phaseX, phaseY

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = (Math.random() - 0.5) * hw * 2;
        const y = (Math.random() - 0.5) * hh * 2;
        const z = 0.01; // Just in front of the shader plane

        basePositions[i * 3 + 0] = x;
        basePositions[i * 3 + 1] = y;
        basePositions[i * 3 + 2] = z;

        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        sizes[i] = THREE.MathUtils.randFloat(0.008, 0.015);

        const opacity = THREE.MathUtils.randFloat(0.3, 0.8);
        opacities[i] = opacity;
        baseOpacities[i] = opacity;

        const col = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
        colors[i * 3 + 0] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;

        speeds[i] = THREE.MathUtils.randFloat(0.15, 0.45);
        phases[i * 2 + 0] = Math.random() * Math.PI * 2;
        phases[i * 2 + 1] = Math.random() * Math.PI * 2;
      }

      return { positions, basePositions, sizes, opacities, baseOpacities, colors, speeds, phases };
    });

  const { positions, basePositions, sizes, opacities, baseOpacities, colors, speeds, phases } = particleData;

  const uniforms = useMemo(
    () => ({
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }),
    []
  );

  // Animate every frame
  useFrame((state) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const opaAttr = geo.getAttribute("aOpacity") as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    const mx = mouseWorld.current.x;
    const my = mouseWorld.current.y;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Sinusoidal drift from base position
      const sx = speeds[i];
      const px = phases[i * 2];
      const py = phases[i * 2 + 1];

      let x = basePositions[i3 + 0] + Math.sin(t * sx + px) * 0.12;
      let y = basePositions[i3 + 1] + Math.cos(t * sx * 0.8 + py) * 0.09;

      // Mouse attraction
      const dx = mx - x;
      const dy = my - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let opacity = baseOpacities[i];

      if (dist < ATTRACT_RADIUS) {
        const influence = 1.0 - dist / ATTRACT_RADIUS; // 1 at center, 0 at edge
        // Pull toward cursor
        x += dx * influence * ATTRACT_STRENGTH;
        y += dy * influence * ATTRACT_STRENGTH;
        // Brighten
        opacity = Math.min(1.0, opacity + influence * BRIGHTEN_AMOUNT);
      }

      posAttr.setXYZ(i, x, y, positions[i3 + 2]);
      opaAttr.setX(i, opacity);
    }

    posAttr.needsUpdate = true;
    opaAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-aOpacity"
          args={[opacities, 1]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Root Canvas ────────────────────────────────────────────────────────────

export default function WebGLCanvas() {
  return (
    <div className="w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: false }}
      >
        <Scene />
        <Particles />
      </Canvas>
    </div>
  );
}
