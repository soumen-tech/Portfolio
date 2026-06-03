import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function FloatingBlob({ position, color, speed, distort, size }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
      meshRef.current.rotation.y += speed * 0.003;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={speed * 0.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
}

function FloatingRing({ position, color, speed, size }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.15) * 0.5;
    }
  });
  return (
    <Float speed={speed * 0.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <Torus ref={meshRef} args={[size, size * 0.15, 32, 64]} position={position}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Torus>
    </Float>
  );
}

function FloatingGem({ position, color, speed, size }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed * 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });
  return (
    <Float speed={speed * 0.6} rotationIntensity={0.8} floatIntensity={1}>
      <Icosahedron ref={meshRef} args={[size, 0]} position={position}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.05}
          metalness={1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Icosahedron>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const mesh = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#f472b6" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#fce7f3" />
        <pointLight position={[-3, 3, 2]} intensity={0.8} color="#ec4899" />
        <pointLight position={[3, -2, -2]} intensity={0.5} color="#f43f5e" />
        <pointLight position={[0, 4, 0]} intensity={0.3} color="#f9a8d4" />

        <FloatingBlob position={[-3, 1.5, -2]} color="#ec4899" speed={1.5} distort={0.4} size={1.2} />
        <FloatingBlob position={[3.5, -1, -3]} color="#db2777" speed={1.2} distort={0.3} size={0.9} />
        <FloatingBlob position={[0, -2.5, -1]} color="#f472b6" speed={1.8} distort={0.5} size={0.7} />
        <FloatingRing position={[2, 2, -2]} color="#f9a8d4" speed={1} size={0.8} />
        <FloatingRing position={[-2.5, -1.5, -3]} color="#ec4899" speed={1.3} size={0.6} />
        <FloatingGem position={[4, 0.5, -1]} color="#f472b6" speed={1.1} size={0.4} />
        <FloatingGem position={[-1, 3, -2]} color="#fda4af" speed={0.9} size={0.35} />
        <Particles />
      </Canvas>
    </div>
  );
}
