import { useGLTF } from '@react-three/drei';
import React,{forwardRef, useImperativeHandle, useRef} from 'react'
import * as THREE from 'three'

type CarProps = {
    modelUrl?:string,
}

const Car = forwardRef<THREE.Group,CarProps>(({modelUrl,...props},ref) => {

    const carRef = useRef<THREE.Group|null>(null);
    const car = useGLTF(modelUrl || '/models/porsche.glb');
    
    //밖에서 ref로 접근할 수 있도록 설정
    useImperativeHandle(ref,()=>carRef.current!,[]);

    return (
        <group ref={carRef}>
            <primitive object={car.scene} {...props} castShadow/>
        </group>
    )
});

export default Car