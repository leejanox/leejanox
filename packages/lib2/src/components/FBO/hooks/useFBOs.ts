//! FBO buffer 생성용
import * as THREE from 'three'
import { useMemo } from 'react'
import { useThree } from '@react-three/fiber'


export function useFBOs(width: number, height: number) {

    const { gl } = useThree();

    //float texture 지원 여부 확인
    const isFloatTextureSupported = useMemo(() => {
        const context = gl.getContext(); //gl -> 객체 , context 불러와야함
        if (!context) return false; 
        return !!context.getExtension('OES_texture_float'); //float texture 지원 여부 확인
    },[gl]);
     
    //FBO 생성
    const [fbo1, fbo2] = useMemo(() => {
        const createFBO = () => new THREE.WebGLRenderTarget(width, height, {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
            type: isFloatTextureSupported ? THREE.FloatType : THREE.UnsignedByteType,
            depthBuffer: false,
            stencilBuffer: false,
        });
        return [createFBO(), createFBO()];
    },[width, height, isFloatTextureSupported]); 

    return [fbo1, fbo2]// as const; //as const : 타입을 고정시켜줌. 3D 배열로 고정됨.
}
