import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { RoundedShape,RoundedGeometryProps } from './RoundedGeometry'

const RoundedExtrude = ({width,height,radius,segments}:RoundedGeometryProps) => {
    
    if ( !width || !height || !radius || !segments) {
        width = 1
        height = 1
        radius = 0.02
        segments = 12
    }

    const groupRef = useRef<THREE.Group>(null!);

    const shape = RoundedShape({width,height,radius,segments});
    const extrudeSettings = {
        Depth:.4,
        bevelEnabled: false,
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const edgs = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xaaFFaa });
    const line = new THREE.LineSegments(edgs, lineMaterial);

    useEffect(()=>{
        if(!groupRef.current) return
        groupRef.current.add(line);
    },[]);

    return(
        <group ref={groupRef} >
            {/* <mesh geometry={geometry}>
                <meshStandardMaterial color="black" side={THREE.DoubleSide} />
            </mesh> */}
        </group>
    )
}

export default RoundedExtrude