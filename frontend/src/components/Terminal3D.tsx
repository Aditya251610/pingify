import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box } from '@react-three/drei';
import * as THREE from 'three';

function FloatingTerminal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group>
      {/* Terminal Screen */}
      <Box ref={meshRef} args={[4, 2.5, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
      
      {/* Screen Content */}
      <Box args={[3.8, 2.3, 0.05]} position={[0, 0, 0.06]}>
        <meshStandardMaterial color="#0a0a0a" />
      </Box>
      
      {/* Terminal Text */}
      <Text
        ref={textRef}
        position={[-1.5, 0.5, 0.1]}
        fontSize={0.15}
        color="#00ff88"
        font="/fonts/JetBrainsMono-Regular.woff"
        anchorX="left"
        anchorY="middle"
      >
        {`$ pingify monitor \\
  --url api.example.com \\
  --interval 10s \\
  --threshold 500ms
  
✅ HTTP 200 - 234ms
✅ HTTP 200 - 189ms
🚨 HTTP 200 - 678ms
✅ HTTP 200 - 156ms`}
      </Text>
      
      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle key={i} index={i} />
      ))}
    </group>
  );
}

function FloatingParticle({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.x = Math.sin(time * 0.5 + index) * 3;
      meshRef.current.position.y = Math.cos(time * 0.3 + index) * 2;
      meshRef.current.position.z = Math.sin(time * 0.7 + index) * 1;
      meshRef.current.scale.setScalar(Math.sin(time * 2 + index) * 0.02 + 0.03);
    }
  });

  return (
    <Box ref={meshRef} args={[0.05, 0.05, 0.05]}>
      <meshStandardMaterial 
        color={index % 3 === 0 ? "#00d4ff" : index % 3 === 1 ? "#a855f7" : "#00ff88"} 
        emissive={index % 3 === 0 ? "#00d4ff" : index % 3 === 1 ? "#a855f7" : "#00ff88"}
        emissiveIntensity={0.5}
      />
    </Box>
  );
}

export default function Terminal3D() {
  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        <FloatingTerminal />
      </Canvas>
    </div>
  );
}