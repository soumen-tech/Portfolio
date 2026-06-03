import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

function SmallBlob({ position, color, speed, size }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += speed * 0.004;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.2) * 0.15;
    }
  });
  return (
    <Float speed={speed} floatIntensity={1}>
      <Sphere ref={ref} args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial color={color} distort={0.3} speed={speed * 0.4} roughness={0.2} metalness={0.8} transparent opacity={0.5} />
      </Sphere>
    </Float>
  );
}

function BgParticles() {
  const count = 100;
  const ref = useRef();
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 16;
      p[i * 3 + 1] = (Math.random() - 0.5) * 16;
      p[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#f472b6" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function BackgroundScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={0.4} color="#ec4899" />
        <pointLight position={[-3, -2, 2]} intensity={0.3} color="#f472b6" />
        <SmallBlob position={[-4, 2, -4]} color="#ec4899" speed={1} size={0.6} />
        <SmallBlob position={[4, -1.5, -5]} color="#db2777" speed={0.8} size={0.5} />
        <SmallBlob position={[0, 3, -6]} color="#f9a8d4" speed={1.2} size={0.4} />
        <BgParticles />
      </Canvas>
    </div>
  );
}
