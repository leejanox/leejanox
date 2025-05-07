//!계산용 씬 구성
import * as THREE from 'three'
import { useMemo } from 'react'

function createInitialPositionTexture(size = 1024) {
    const data = new Float32Array(size * size * 4)
    for (let i = 0; i < size * size; i++) {
      data[i * 4 + 0] = Math.random() * 2 - 1 // x [-1, 1]
      data[i * 4 + 1] = Math.random() * 2 - 1 // y [-1, 1]
      data[i * 4 + 2] = 0                     // z
      data[i * 4 + 3] = 1                     // w
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType)
    texture.needsUpdate = true
    return texture
}
export function useSimulationFBO(width:number,simVert:string, simFrag:string) {
    const scene = useMemo(() => new THREE.Scene, []);

    const camera = useMemo(()=>{
        const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
        cam.position.set(0, 0, .5);
        cam.lookAt(0, 0, 0);
        return cam;
    },[]);

    const initialTexture = createInitialPositionTexture(width)
    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uPositions: { value: initialTexture },
                uTime: { value: 0 },
            },
            vertexShader: simVert,
            fragmentShader: simFrag,
            transparent: true,
        })
    },[simVert, simFrag]);

    const quad = useMemo(()=>{
        const geo = new THREE.PlaneGeometry(200, 200,20,20);
        const mesh = new THREE.Mesh(geo, material);
        return mesh;
    },[material]);

    useMemo(()=>{
        scene.add(quad);
        // return () => {
        //     scene.remove(quad);
        // }
    },[scene, quad]); //scene과 quad가 바뀔때마다 실행됨.

    return { scene, camera, material}
}
