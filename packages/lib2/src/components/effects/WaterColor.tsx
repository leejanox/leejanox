import * as THREE from 'three'
import vt from '../shaders/vertices/WaterColor.glsl?raw'
import fg from '../shaders/fragments/WaterColor.glsl?raw'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

const pi = Math.PI;
const pi2 = Math.PI / 2;
/* 
1. 이전 텍스처 읽어오기
2. uMouse -> 색 변경
3. 변경 색 적용 
*/

const WaterColor = () => {

    //viewScene
    const fboScene = new THREE.Scene(); //렌더링할 씬

    const { gl, camera ,scene, pointer } = useThree();
    const { width:w, height:h } = gl.getSize(new THREE.Vector2()); //canvas의 width, height
    const plane = new THREE.Plane(new THREE.Vector3(0,0,1), 0); //z축을 기준으로 하는 평면->2차원 움직임만 따라옴

    //ref
    const planeRef = useRef<THREE.Mesh>(null!); //평면
    const planeMatRef = useRef<THREE.ShaderMaterial>(null!); //평면
    const viewref = useRef<THREE.Mesh>(null!)

    //    const mouseRef = useRef<THREE.Mesh>(null!);
    const rayRef  = useRef<THREE.Raycaster>(new THREE.Raycaster());
    const hitRef = useRef<THREE.Vector3>(new THREE.Vector3()); //교차점

    //FBO
    const bufferA = useRef(new THREE.WebGLRenderTarget(w,h)); //이전 텍스처
    const bufferB = useRef(new THREE.WebGLRenderTarget(w,h)); //현재 텍스처

    //mesh
    const planeGeom = new THREE.PlaneGeometry(20,20);
    // const mouseGeom = new THREE.SphereGeometry(.2,20,20);
    // const mouseMat = new THREE.MeshStandardMaterial({color:0xEFaaa0,side:THREE.DoubleSide});
    const planeMat = new THREE.ShaderMaterial({
        uniforms:{
            uTexture: {value: bufferA.current.texture}, //텍스처 쓸거임
            uMouse: {value: new THREE.Vector2(0.,0.)}, //마우스 위치
            uSize: {value: .05},
            uResolution: {value: new THREE.Vector2(w, h)}, //해상도
        },
        vertexShader: vt,
        fragmentShader: fg,
        transparent:true,
        //depthWrite:false,
        toneMapped:false,
        side:THREE.DoubleSide,
    });

    useFrame(()=>{

        //1.mouse
        if(!rayRef.current ) return;
        rayRef.current.setFromCamera(pointer, camera); //카메라에서 마우스 위치로 ray를 쏨
        //dummyRef.current.position.copy(rayRef.current.ray.direction); //바라봄
        rayRef.current.ray.intersectPlane(plane, hitRef.current);
//        mouseRef.current.position.lerp(hitRef.current,.15); //교차점으로 mesh 이동
        if(!planeMatRef.current || !hitRef.current ||!planeRef.current) return;
        //깨짐 -> 월드 좌표 기반 (카메라 돌리면 이상함)
        // //정규화 
        // //planGeo -> x: -10~10, y: -10~10, z: 0 -> -10 :0 , 0: .5 , +10 : 1
        // //uvX = (hitRef.current.x + 10) / 20; // uvY = (hitRef.current.y + 10) / 20; //0~1로 변환
        // //const uvX = (x - planeMinX) / (planeMaxX - planeMinX)
        // //const uvY = (y - planeMinY) / (planeMaxY - planeMinY)
        // const planeSize = {width:planeRef.current.scale.x, height:planeRef.current.scale.y};
        // const planePos = {x:planeRef.current.position.x, y:planeRef.current.position.y}; //중심

        // const planeMinX = planePos.x - planeSize.width / 2; //좌측
        // const planeMaxX = planePos.x + planeSize.width / 2; //우측
        // const planeMinY = planePos.y - planeSize.height / 2; //하단
        // const planeMaxY = planePos.y + planeSize.height / 2; //상단

        // const uvX = (hitRef.current.x - planeMinX) / (planeMaxX - planeMinX); //0~1로 변환
        // const uvY = (hitRef.current.y - planeMinY) / (planeMaxY - planeMinY); //0~1로 변환
        //planeMatRef.current.uniforms.uMouse.value.copy();
        const localHit = planeRef.current.worldToLocal(hitRef.current.clone());
        const planeWidth = planeRef.current.scale.x * 20;  // PlaneGeometry(20,20)
        const planeHeight = planeRef.current.scale.y * 20;
        const uvX = (localHit.x + planeWidth / 2) / planeWidth;
        const uvY = (localHit.y + planeHeight / 2) / planeHeight;

        planeMatRef.current.uniforms.uMouse.value.set(uvX, uvY); //마우스 위치

        //2.bufferA
        if(!bufferA.current || !bufferB.current) return;
        planeMatRef.current.uniforms.uTexture.value = bufferA.current.texture; //이전 텍스처
        //3. bufferB 에 렌더링
        gl.setRenderTarget(bufferB.current); //렌더링할 타겟 설정
        gl.render(scene, camera); //렌더링
        //4.출력
        gl.setRenderTarget(null); //렌더링 타겟 초기화
        //gl.render(scene, camera); //렌더링

        //5. swap
        const temp = bufferA.current; //이전 텍스처
        bufferA.current = bufferB.current; //현재 텍스처
        bufferB.current = temp; //이전 텍스처

        if(!viewref.current) return;
        (viewref.current.material as THREE.MeshBasicMaterial).map = bufferB.current.texture; //렌더링된 텍스처를 plane에 적용
        (viewref.current.material as THREE.MeshBasicMaterial).needsUpdate = true; //렌더링된 텍스처를 plane에 적용
    });

    //렌더링할 씬에 plane 추가
    useEffect(()=>{
        if(!planeRef.current) return;
        fboScene.add(planeRef.current); //렌더링할 씬에 plane 추가
    })

    return (
        <>
            <mesh ref={planeRef} position={[0,0,0]} rotation={[pi,0,0]}>
                <primitive object={planeGeom} attach="geometry" />
                <primitive  ref={planeMatRef} object={planeMat} attach="material" />
            </mesh>
            {/* <mesh ref={mouseRef}>
                <primitive object={mouseGeom} attach="geometry" />
                <primitive object={mouseMat} attach="material" />
            </mesh> */}
            <mesh ref={viewref} position={[0,0,.01]} rotation={[pi,0,0]}>
                <primitive object={planeGeom} attach="geometry" />
                <meshBasicMaterial map={bufferB.current.texture}/>
            </mesh>
        </>
    );
}

export default WaterColor