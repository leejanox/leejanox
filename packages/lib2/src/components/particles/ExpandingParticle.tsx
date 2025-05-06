import vt from './ExpandingParticleVertex.glsl?raw'
import fg from './ExpandingParticleFrag.glsl?raw'
import { useRef} from 'react'
import { forwardRef , useImperativeHandle } from 'react'
import { useMemo } from "react"
import * as THREE from "three"
import { useFrame } from '@react-three/fiber'
//import { useControls } from 'leva'

type ExpandingParticleProps = {
    texture?: THREE.Texture; //texture로 쓸 이미지
    //texture?: string; //texture로 쓸 이미지
    levaUniforms?: {
        uAlpha?: number; //alpha값
        uDistortion?: number; //distortion값
    };
};


const ExpandingParticle = forwardRef<THREE.Group,ExpandingParticleProps>(
    ({texture,levaUniforms,...props},ref) => {
        //leva
        // const { distortion ,uAlpha} = useControls({
        //     distortion: { value: 0, min: 0, max: 1, step: 0.1 },
        //     uAlpha: { value: 0, min: 0, max: 1, step: 0.1 }, //alpha값
        // });

        //ref
        const groupRef = useRef<THREE.Group>(null!);
        const matRef = useRef<THREE.ShaderMaterial>(null!);
        //120,240,180,380

        //TextureLoader().load가 비동기라 계속 context lost 에러 -> state 관리해도 잘 안됨 
        //const tt1 = useLoader(THREE.TextureLoader,'/textures/fxn/1_1.jpg'); //useLoader쓰면 걍 해결;
        //const ttProps = useLoader(THREE.TextureLoader,texture??'/textures/fxn/1_1.jpg'); 
        //const tt2 = useLoader(THREE.TextureLoader,'/textures/fxn/2_1.jpg');
        //const tt3 = useLoader(THREE.TextureLoader,'/textures/fxn/3_1.jpg');

        //geometry -> 480px*960px
        const geom = useMemo(()=> new THREE.PlaneGeometry(240.,480.,480,960),[]);
        //shaderMaterial & uniforms
        const mat = useMemo(()=> new THREE.ShaderMaterial({
            uniforms:{
                uTime: { value: 0 }, //scene time
                uTexture: { value: texture }, //texture로 쓸 이미지
                //utexture : { value: texture?? new THREE.Texture()}, //texture로 쓸 이미지
                uDistortion: { value:levaUniforms?.uDistortion?? 0. }, //distortion값
                uAlpha: { value: levaUniforms?.uAlpha ?? 1. }, //alpha값
            },
            vertexShader: vt,
            fragmentShader: fg,
            side: THREE.DoubleSide, //양면으로 보이게
            transparent: true, //반투명, glow,alpha discard 등 shader 투명 연산 제대로 하기 위해 설정
            depthWrite: false, //depth buffer에 쓰지 않음
            blending: THREE.NormalBlending,
            //blending: THREE.AdditiveBlending, //혼합모드 -> 키면 개 별로임; bloom이 나음
            toneMapped: false, //THREE가 자동으로 톤 매핑하는것 방지
        }),[texture,JSON.stringify(levaUniforms)]); 

        useFrame((state)=>{
            const time = state.clock.getElapsedTime();
            if(!matRef.current) return;
            matRef.current.uniforms.uTime.value = time; //uniform에 시간값 넣기
            matRef.current.uniforms.uTexture.value = texture; //uniform에 texture값 넣기
            if(levaUniforms?.uAlpha !== undefined ) matRef.current.uniforms.uAlpha.value = levaUniforms.uAlpha; //uniform에 alpha값 넣기
            if(levaUniforms?.uDistortion !== undefined) matRef.current.uniforms.uDistortion.value = levaUniforms.uDistortion; //uniform에 distortion값 넣기
//            matRef.current.uniforms.uDistortion.value = distortion; //uniform에 distortion값 넣기
        });

        useImperativeHandle(ref, () => groupRef.current); //ref로 material에 접근할 수 있게 하기 위해 설정

        return (
            <group ref={groupRef}{...props}>
                <points>
                    <primitive attach="geometry" object={geom}/>
                    <primitive attach="material" ref={matRef} object={mat}/>
                    {/* <meshStandardMaterial color={"red"} transparent={true} opacity={1} wireframe/> */}
                </points>
            </group>
        );
    }
);
export default ExpandingParticle