import * as THREE from 'three'
import { useGLTF } from '@react-three/drei';
import { ComponentProps } from 'react';

type ModelProps = {
    url: string
} & Omit<ComponentProps<'primitive'>, 'object'>;

const pi = Math.PI;
const pi2 = Math.PI * 2;
const piHalf = Math.PI / 2;
const ShadowModel = ({url,...props}:ModelProps) => {

    const gltf = useGLTF(url);

    gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.frustumCulled = false; //반사 누락 방지
        }
    });

    return <primitive object={gltf.scene} {...props} />;
}

export default ShadowModel