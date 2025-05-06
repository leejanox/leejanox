import { useRef,useMemo } from 'react'
import * as THREE from 'three'
import { Text3D, Text3DProps } from '@react-three/drei'
import { useControls } from 'leva'
import vt from '../shaders/vertices/GlossyText3D.glsl?raw'
import fg from '../shaders/fragments/GlossyText3D.glsl?raw'
import { useFrame } from '@react-three/fiber'

type GlossyText3DProps = Text3DProps & {
    displayText: string
}

const GlossyText3D = ({displayText,...props}:GlossyText3DProps) => {

    //ref
    const matRef = useRef<THREE.ShaderMaterial>(null!);

    const { fontSize , rotationX , wireframe,uAlpha, uColor} = useControls({
        fontSize: { value: .5, min: 0.1, max: 5, step: 0.1 },
        rotationX : { value: -.4, min: -Math.PI, max: Math.PI, step: 0.1 },
        wireframe: { value: false },
        uAlpha: { value: 0.7, min: 0, max: 1, step: 0.1 },
        uColor: "#de31ac"
    });
    //material
    // const material = new THREE.MeshStandardMaterial({
    //     color: new THREE.Color(0x00ff00),
    //     metalness: 0.8,
    //     roughness: 0.2
    // });

    const shaderMaterial = useMemo(()=> new THREE.ShaderMaterial({
        uniforms:{
            uTime:{value:0.},
            uAlpha:{value:0.},
            uColor:{value:new THREE.Color('#de31ac')},
        },
        vertexShader: vt,
        fragmentShader: fg,
        wireframe: false,
    }),[vt,fg]);

    //연결
    useFrame((state)=>{
        const time = state.clock.getElapsedTime();
        if(!matRef.current) return;
        matRef.current.uniforms.uTime.value = time;
        matRef.current.uniforms.uAlpha.value = uAlpha;
        matRef.current.uniforms.uColor.value.set(uColor);
        matRef.current.wireframe = wireframe;

    })

    return (
        <>
            <Text3D size={fontSize} rotation-x={rotationX} {...props}>
                {displayText}
                <primitive attach="material" ref={matRef} object={shaderMaterial}/>
            </Text3D>
        </>
    )
}

export default GlossyText3D