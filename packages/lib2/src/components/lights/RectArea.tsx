import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RectAreaLightUniformsLib } from "three/examples/jsm/Addons.js";
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";
import * as THREE from 'three';
import { useEffect, useRef, useMemo } from "react";
import { useControls } from "leva";

const RectArea = () => {
  const smSpherePivotRef = useRef<THREE.Group | null>(null);
  const light = useRef<THREE.RectAreaLight | null>(null);

  const { lightIntensity, torusMetalness, sphereRotationSpeed } = useControls('Scene Controls', {
    lightIntensity: { value: 20, min: 1, max: 50, step: 1 },
    torusMetalness: { value: 0.9, min: 0, max: 1, step: 0.05 },
    sphereRotationSpeed: { value: 70, min: 0, max: 200, step: 1 },
  });

  useFrame((state) => {
    if (smSpherePivotRef.current) {
      smSpherePivotRef.current.rotation.y = THREE.MathUtils.degToRad(state.clock.elapsedTime * sphereRotationSpeed);
    }
  });

  useHelper(light, RectAreaLightHelper);

  useEffect(() => {
    RectAreaLightUniformsLib.init();
  }, []);

  const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
  const torusMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#9b59b6',
    roughness: 0.5,
    metalness: torusMetalness,
  }), [torusMetalness]);

  const torusMeshes = useMemo(() => {
    return new Array(8).fill(null).map((_, index) => (
      <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
        <mesh geometry={torusGeometry} material={torusMaterial} position={[3, 0.5, 0]} />
      </group>
    ));
  }, [torusMaterial]);

  return (
    <>
      <rectAreaLight
        ref={light}
        color='#ffffff'
        intensity={lightIntensity}
        width={1}
        height={5}
        position={[0, 5, 0]}
        rotation-x={THREE.MathUtils.degToRad(-90)}
      />

      <mesh position={[0, 0, 0]} rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color='#2c3e50' roughness={0.5} metalness={0.5} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, 0, 0]} rotation-x={THREE.MathUtils.degToRad(-90)}>
        <sphereGeometry args={[1.5, 128, 128, 0, Math.PI]} />
        <meshStandardMaterial color='#ffffff' roughness={0.1} metalness={0.2} />
      </mesh>

      {torusMeshes}

      <group name="smSpherePivot" ref={smSpherePivotRef}>
        <mesh position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.2, 64, 64]} />
          <meshStandardMaterial color='#e74c3c' roughness={0.2} metalness={0.3} />
        </mesh>
      </group>
    </>
  );
};

export default RectArea;