// src/pages/HomePage.tsx
import { Title, Text, Button, Stack, Group, Container } from '@mantine/core';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

// A more "out of the box" 3D component
function AnimatedShapes() {
  const groupRef = useRef<THREE.Group>(null);

  // This hook rotates the group of shapes on every frame
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* A cluster of 3 distorted spheres */}
      <mesh position={[1, 1, -1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial color="#CED4DA" distort={0.5} speed={2} />
      </mesh>
      <mesh position={[-1.5, -1, 1]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshDistortMaterial color="#495057" distort={0.6} speed={1.5} />
      </mesh>
      <mesh position={[0.5, -1.5, -1.5]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial color="#868E96" distort={0.4} speed={2.5} />
      </mesh>
    </group>
  );
}

export function HomePage() {
  return (
    <Container size="lg" style={{ height: 'calc(100vh - 120px)' }}>
      <Group grow align="center" style={{ height: '100%' }}>
        <Stack gap="xl">
          <Title order={1} style={{ fontSize: '3.5rem' }}>
            Unlock Your AI's True Potential
          </Title>
          <Text size="xl" c="dimmed">
            Transform simple ideas into masterfully engineered prompts. PromptPilot is the intelligent co-founder for your AI-driven tasks.
          </Text>
          <Group>
            <Button size="lg" component={Link} to="/login" color="silver" variant="filled">
              Get Started
            </Button>
            <Button size="lg" variant="default">
              Get Extension
            </Button>
          </Group>
        </Stack>
        <div style={{ height: '500px', width: '100%' }}>
          <Canvas>
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <AnimatedShapes />
          </Canvas>
        </div>
      </Group>
    </Container>
  );
}