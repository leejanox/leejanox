import React, { JSX, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import CanvasWrapper from './CanvasWrapper'
import { useFrame } from '@react-three/fiber';

type geomCfg = {
    width: number,
    height: number,
    depth: number,
    widthSegments: number,
    heightSegments: number
}
type matCfg = {
    color: string,
    wireframe: boolean,
    transparent: boolean,
    opacity: number
}
type BoxProps = {
    speed: number,
    geomCfg: geomCfg,
    matCfg: matCfg
} 
function Box({speed,geomCfg,matCfg,...props}: BoxProps) {

    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state)=>{
        const time = state.clock.getElapsedTime();
        if(!meshRef.current || !speed) return;
        meshRef.current.rotation.x = time * speed;
    });

    return(
        <mesh ref={meshRef} {...props}>
            <boxGeometry args={[geomCfg.width,geomCfg.height,geomCfg.depth,geomCfg.widthSegments,geomCfg.heightSegments]}/>
            <meshStandardMaterial {...matCfg} />
        </mesh>            
    )
}


export default function SpinningBox({...args}: BoxProps){


    return (
        <CanvasWrapper camera={{ position:[2,2,2], fov: 75 }}>
            <ambientLight intensity={2}/>
            <OrbitControls/>
            <axesHelper args={[5]} />

            <Box {...args}/>
        </CanvasWrapper>
    )
}
