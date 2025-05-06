import { useControls } from 'leva';
import React from 'react';
import * as THREE from 'three'

type TorusKnotMeshProps = {
    material?: React.ReactNode | THREE.Material// material prop을 통해 외부에서 재질을 전달받을 수 있도록 설정
}
const TorusKnotMesh = ({material}:TorusKnotMeshProps) => {

    const {radius, tube, radialSegments, tubularSegments,p} = useControls({
        radius: { value: 1, min: 0.1, max: 2, step: 0.1 }, // 토러스의 반지름
        tube: { value: 0.25, min: 0.1, max: 1, step: 0.1 }, // 토러스의 두께
        tubularSegments: { value: 64, min: 3, max: 128, step: 1 },// 원형 세그먼트 수
        radialSegments: { value: 8, min: 3, max: 32, step: 1 }, // 방사형 세그먼트 수
    })

    const geom = new THREE.TorusKnotGeometry(radius, tube, tubularSegments,radialSegments)
    const mat = new THREE.MeshStandardMaterial({ color: 'orange' });


    return (
        <mesh>
            <primitive attach="geometry" object={geom} />
            { React.isValidElement(material)
                ? material
                : <primitive attach="material" object={mat} />
            }
        </mesh>
    )

}

export default TorusKnotMesh