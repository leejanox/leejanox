import React ,{useRef} from 'react'
//import { useFrame } from '@react-three/fiber'
import { Text3D,Text3DProps } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva';

type CustomText3DProps = Text3DProps & {
    displayText: string
    children: THREE.Material | React.ReactElement | React.ReactElement[]
}
const CustomText3D = ({children,displayText,...props}:CustomText3DProps) => {
    const meshRef = useRef<THREE.Mesh>(null!);

    //rotationSpeed,
    const {  fontSize } = useControls({
        //rotationSpeed: { value: 0, min: 0, max: 0.1, step: 0.001 },
        fontSize: { value: 0.5, min: 0.1, max: 2, step: 0.1 },
    });
    
    // useFrame(() => {
    // if (meshRef.current) {
    //     meshRef.current.rotation.y += rotationSpeed;
    // }
    // });
    
    return (
        <Text3D ref={meshRef} {...props} size={fontSize}>
            {displayText}
            {children??null}
        </Text3D>
    ); 
}
export default CustomText3D

