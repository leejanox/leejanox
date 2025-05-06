import React from 'react'
import { MeshReflectorMaterial} from "@react-three/drei";
import { useControls } from "leva";

const ReflectorMat = () => {

    
    //meshReflectorMaterial : 다른 mesh가 반사되는 재질 -> drei에서 제공 (거울, 대리석등에서 다른 객체가 반사되는 듯한 효과)
    //속성
    //blur resolution mixBlur mixStrength depthScale minDepthThreshold maxDepthThreshold color metalness

    const {mirror,blur1,blur2,mixBlur,mixStrength,roughness,
            depthScale,minDepthThreshold,maxDepthThreshold,metalness} = useControls({
                mirror: {value: 0.8, min: 0, max: 1, step: 0.05},          // 미러 반사 강도: 0에서 1까지, 적당한 0.05 간격
                blur1: {value: 0.3, min: 0, max: 1, step: 0.05},           // 첫 번째 blur: 0에서 1까지, 작은 값
                blur2: {value: 0.3, min: 0, max: 1, step: 0.05},           // 두 번째 blur: 0에서 1까지, 작은 값
                mixBlur: {value: 0.2, min: 0, max: 1, step: 0.05},         // mixBlur: 0에서 1까지, 적당한 간격
                mixStrength: {value: 0.5, min: 0, max: 1, step: 0.05},      // 반사 강도의 혼합 정도: 0에서 1까지
                roughness: {value: 0.1, min: 0, max: 1, step: 0.05},        // 표면 거칠기: 0에서 1까지, 부드러운 표면
                depthScale: {value: 0.7, min: 0, max: 1, step: 0.05},       // 깊이 스케일: 0에서 1까지
                minDepthThreshold: {value: 0.4, min: 0, max: 1, step: 0.05}, // 최소 깊이 임계값
                maxDepthThreshold: {value: 1, min: 0, max: 1, step: 0.05},  // 최대 깊이 임계값
                metalness: {value: 0.5, min: 0, max: 1, step: 0.05},        // 금속성 정도: 0에서 1까지
            });

    return (
        <>
            <mesh receiveShadow position={[0,-0.6,0]} rotation={[-Math.PI/2,0,0]}>
                <planeGeometry args={[10,10]}/>
                <MeshReflectorMaterial
                    mirror={mirror}
                    blur={[blur1,blur2]}
                    resolution={2048}
                    mixBlur={mixBlur}
                    mixStrength={mixStrength}
                    roughness={roughness}
                    depthScale={depthScale}
                    minDepthThreshold={minDepthThreshold}
                    maxDepthThreshold={maxDepthThreshold}
                    color='#fff'
                    metalness={metalness}
                />
            </mesh>

            <mesh position={[0,0,0]} castShadow>
                <boxGeometry/>
                <meshStandardMaterial color="cyan"/>
            </mesh>
        </>
    )
}

export default ReflectorMat