//!FBO 계산 수행(useFrame 등)
import { useFrame } from '@react-three/fiber'
import { useSimulationFBO } from '../hooks/useSimulationFBO'
import * as THREE from 'three'
import simVertex from '../shaders/simVertex.glsl?raw'
import simFragment from '../shaders/simFragment.glsl?raw'
import { useRef } from 'react'

type Props = {
  width: number
  fbo1: THREE.WebGLRenderTarget
  fbo2: THREE.WebGLRenderTarget
  setCurrTexture: ( texture: THREE.Texture ) => void
}
const FBOCompute = ({ width, fbo1, fbo2 , setCurrTexture}: Props) => {

  const { scene, camera, material } = useSimulationFBO(width,simVertex, simFragment);

  //pingpong : fbo1과 fbo2를 번갈아가며 사용하기 위해서 사용
  const toggle = useRef(false); //값이 바뀌어도 리렌더링 되지 않음.

  useFrame(({gl,clock})=>{

    if(!material) return;

    const read = toggle.current ? fbo2 : fbo1; 
    const write = toggle.current ? fbo1 : fbo2; 

    material.uniforms.uTime.value = clock.getElapsedTime(); 
    material.uniforms.uPositions.value = read.texture;//toggle.current ? fbo1.texture : fbo2.texture; //fbo1과 fbo2를 번갈아가며 사용

    gl.setRenderTarget(toggle.current ? fbo1 : fbo2); //fbo1에 그리기
    gl.render(scene, camera); //장면과 카메라를 그리기
    gl.setRenderTarget(null); //fbo1에 그린 후, 다시 기본 렌더 타겟으로 설정
    
    setCurrTexture(write.texture); //현재 텍스쳐를 설정
    toggle.current = !toggle.current; //toggle 값을 바꿔줌
  });

  return null //실제로 화면에 그리지 x
}

export default FBOCompute