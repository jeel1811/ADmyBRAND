'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { throttle } from '@/lib/utils';

interface ParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  density?: number;
  mouseInteraction?: boolean;
}

function Particles({
  count = 2000,
  color = '#0BC5EA',
  size = 0.02,
  speed = 0.1,
  density = 1.5,
  mouseInteraction = true,
}: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport, mouse } = useThree();
  
  // Generate random particles
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorObj = new THREE.Color(color);
    const { width, height, depth } = {
      width: viewport.width * density,
      height: viewport.height * density,
      depth: 2,
    };

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * width;
      positions[i3 + 1] = (Math.random() - 0.5) * height;
      positions[i3 + 2] = (Math.random() - 0.5) * depth;
      
      // Add slight color variation
      const colorVariation = 0.1;
      colors[i3] = colorObj.r + (Math.random() - 0.5) * colorVariation;
      colors[i3 + 1] = colorObj.g + (Math.random() - 0.5) * colorVariation;
      colors[i3 + 2] = colorObj.b + (Math.random() - 0.5) * colorVariation;
    }
    
    return { positions, colors };
  }, [count, color, viewport.width, viewport.height, density]);

  // Animation and mouse interaction
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Mouse interaction
    const mouseX = mouse.x * viewport.width / 2;
    const mouseY = mouse.y * viewport.height / 2;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Basic animation - gentle floating
      positions[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.2 + i * 0.1) * speed * 0.01;
      positions[i3] += Math.cos(state.clock.elapsedTime * 0.2 + i * 0.1) * speed * 0.01;
      
      // Reset particles that go out of bounds
      if (Math.abs(positions[i3]) > viewport.width * density / 2) {
        positions[i3] = (Math.random() - 0.5) * viewport.width * density;
      }
      if (Math.abs(positions[i3 + 1]) > viewport.height * density / 2) {
        positions[i3 + 1] = (Math.random() - 0.5) * viewport.height * density;
      }
      
      // Mouse interaction
      if (mouseInteraction) {
        const dx = mouseX - positions[i3];
        const dy = mouseY - positions[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 1;
        
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.03;
          positions[i3] -= dx * force;
          positions[i3 + 1] -= dy * force;
        }
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} limit={count}>
      <PointMaterial
        transparent
        vertexColors
        size={size}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
    </Points>
  );
}

interface ParticleBackgroundProps {
  className?: string;
  color?: string;
  density?: number;
  particleCount?: number;
  particleSize?: number;
  speed?: number;
  mouseInteraction?: boolean;
}

export function ParticleBackground({
  className,
  color = '#0BC5EA',
  density = 1.5,
  particleCount = 2000,
  particleSize = 0.02,
  speed = 0.1,
  mouseInteraction = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = throttle(() => {
      if (canvasRef.current) {
        canvasRef.current.style.width = '100%';
        canvasRef.current.style.height = '100%';
      }
    }, 100);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 1], fov: 75, near: 0.01, far: 1000 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute' }}
      >
        <Particles
          count={particleCount}
          color={color}
          size={particleSize}
          speed={speed}
          density={density}
          mouseInteraction={mouseInteraction}
        />
      </Canvas>
    </div>
  );
}