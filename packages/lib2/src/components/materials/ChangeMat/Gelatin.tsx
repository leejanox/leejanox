import { Center, useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import { useControls } from 'leva';
import * as THREE from 'three';

const pi = Math.PI;
const pi2 = Math.PI * 2;
const piHalf = Math.PI / 2;

export default function GelatinousCube() {

  const bananna = useGLTF('/models/bananya_birbo.glb');
  const { nodes, materials } = useGLTF('/models/gelatinous_cube-transformed.glb')as unknown as {
    nodes: {
      cube1: THREE.Mesh;
      cube2: THREE.Mesh;
    };
    materials: {
      cube_mat: THREE.Material;
    };
  };

  const config = useControls('Gelatin Material', {
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.5, min: 0, max: 5, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 3, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.01 },
    attenuationDistance: { value: 1, min: 0.1, max: 10, step: 0.1 },
    attenuationColor: '#ffffff',
    opacity: { value: 1, min: 0, max: 1, step: 0.01 },
  });

  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      transmission: config.transmission,
      roughness: config.roughness,
      thickness: config.thickness,
      ior: config.ior,
      clearcoat: config.clearcoat,
      clearcoatRoughness: config.clearcoatRoughness,
      attenuationDistance: config.attenuationDistance,
      attenuationColor: new THREE.Color(config.attenuationColor),
      transparent: true,
      color: new THREE.Color('white'),
      opacity: config.opacity,
      side: THREE.DoubleSide,
    });
  }, [config]);

  return (
      <Center>
        <mesh
          position={[-0.56, 0.38, -0.11]}
          geometry={nodes.cube1.geometry}
          material={glassMaterial}
        />
        <primitive object={bananna.scene} scale={1} position={[-.8,3.2,0]} rotation={[-pi2,pi/4,0]}/>
        <mesh
          position={[-0.56, 0.38, -0.11]}
          renderOrder={-100}
          geometry={nodes.cube2.geometry}
          material={materials.cube_mat}
          castShadow
        />
      </Center>
  );
}
