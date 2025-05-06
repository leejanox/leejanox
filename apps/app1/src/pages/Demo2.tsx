import { Canvas, useFrame, useThree} from '@react-three/fiber'
import '../styles/demo2.scss'
import * as THREE from 'three'
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { Environment } from '@react-three/drei'
import {Car, Track} from '@janox/lib2'
import {Card,CardRefHandle} from '@janox/lib2'
import gsap from 'gsap'

function Overlay({reset}:{reset:()=>void}) {
    return (
        <div className="overlay">
            <h1>Moving Car</h1>
            <p>3D Animation with React Three Fiber</p>
            <button onClick={reset}>다시 보기</button>
        </div>
    )
}

//movingCar
type ContentProps = {
    reset:()=>void;
}
const Content = forwardRef<ContentProps,{camera: THREE.PerspectiveCamera}>(({camera},ref) => {

    //curve
    const curve2 = new THREE.CubicBezierCurve3(
        new THREE.Vector3(10, 0, -15), // 시작점
        new THREE.Vector3(-30, 0, -2), // 제어점1
        new THREE.Vector3(10, 0, ), // 제어점2
        new THREE.Vector3(-1, 0, 1) // 끝점
    );

    //ref
    const carRef = useRef<THREE.Group>(null!); //차
    const progress = useRef(0); //차 진행상태
    const cardRef = useRef<CardRefHandle>(null!); //카드
    const revealed = useRef(false); //gsap용

    //setup
    //const { camera } = useThree();
    const scale = 0.3; // 차 초기 스케일

    //ref 연결
    useImperativeHandle(ref, () => ({
        reset() {
            if(!carRef.current) return; //차가 없으면 리턴
            progress.current = 0; //차 진행상태 초기화
            carRef.current.scale.set(scale,scale,scale); //차 스케일 초기화
            carRef.current.position.set(10,0,-15); //차 위치 초기화
            carRef.current.rotation.set(0,0,0); //차 회전 초기화
            camera.position.set(4.5,1,2.5); //카메라 위치 초기화
            camera.lookAt(-.7,0,0); //카메라 바라보는 방향 초기화
            revealed.current = false; //gsap용 초기화
        }
    }));
    //animation
    useFrame((state,delta)=>{
        const time = state.clock.getElapsedTime();
        if(!carRef.current) return;        
        if(progress.current === 0) state.clock.start(); //시작할때만 시작
        progress.current += delta * 0.1 * time**2.1; //차 움직이는 속도 : time**2.1 해서 가속도

        //progress 0~1 사이일때만 실행
        if(progress.current > 0 && progress.current < 1.){
            //차 스케일 증가
            const incrementScale = THREE.MathUtils.lerp(scale,1.7,progress.current);  
            carRef.current.scale.setScalar(incrementScale); //차 스케일 설정
            
            //차 위치 설정
            const pos = curve2.getPoint(progress.current);
            carRef.current.position.set(pos.x,pos.y,pos.z);

            //차 머리 방향 설정
            const tangent = curve2.getTangent(progress.current).normalize();
            const lookAt = new THREE.Vector3().addVectors(pos,tangent);
            carRef.current.lookAt(lookAt); 
        }
        //progress.current가 1.1이 넘으면 1.1로 고정
        if(progress.current >= 1.1) {
            progress.current = 1.1;
            //const endPos = new THREE.Vector3(-1,0,1); //끝점
            //carRef.current.position.set(endPos.x, endPos.y, endPos.z);
            carRef.current.scale.set(1.7,1.7,1.7); //scale 고정

            //카메라 무빙도 같이 설정 -> 카메라 위치로 차 머리 방향 설정정
            const targetPos = new THREE.Vector3(4.5,1,2.5);
            camera.position.lerp(targetPos,.005);
            const carTarget = camera.position.clone();
            carTarget.y = 0; 
            carRef.current.lookAt(carTarget); //차 머리 돌리기
            
            //!고쳐야 할듯... 왜 스토리북이랑 다름..
            if(camera instanceof THREE.PerspectiveCamera) { 
                camera.fov = THREE.MathUtils.lerp(30, 50, .5); // FOV 점점 넓게 (줌 아웃 느낌)
                camera.updateProjectionMatrix(); // FOV 바꿨으면 필수
            }

            const distance = camera.position.distanceTo(targetPos); //카메라가 마지막 설정위치에 도달했는지 체크

            //카드 애니메이션
            if(distance < .2 && cardRef.current && !revealed.current) {
                revealed.current = true; //한 번만 실행되도록
                const {box, text} = cardRef.current; 
                gsap.to(box.material,{opacity:1, duration: 1, ease:'circ.in'});
                gsap.to(text.material,{opacity:1, duration: 1, ease:'circ.in'});
            }
        }
    });

    return (
        < >
            <Environment files={'/hdrs/qwantani_dusk_2_1k.hdr'} background/>
            <Car ref={carRef}/>
            <Card ref={cardRef} position={[1.3,.6,0]} rotation-y={THREE.MathUtils.degToRad(45)} scale={[.4,.4,.4]}/>
            <Track points={curve2.getPoints(50)}/>
        </>
    )
});
const Demo2 = () => {
    //reset 함수
    const contentRef = useRef<ContentProps>(null!); //Content ref
    const reset = () => {
        if(!contentRef.current) return; //ref가 없으면 리턴
        contentRef.current.reset(); //reset 함수 실행
    }
    //camera 가져다 쓰는 방식이 문제인듯?
    const myCamera = useMemo(()=>{
        const cam = new THREE.PerspectiveCamera(
            50, //fov
            window.innerWidth / window.innerHeight, //aspect ratio
            0.1, //near
            1000 //far
        )
        cam.position.set(4.5,1,2.5); //카메라 위치 설정
        cam.lookAt(-.7,0,0); //카메라 바라보는 방향 설정
        return cam;
    },[])

  return (
    <div className="container">
        <Overlay reset={reset}/>
        <Canvas camera={myCamera}>
            <axesHelper args={[5]}/>
            <Content ref={contentRef} camera={myCamera}/>
        </Canvas>
    </div>
  )
}

export default Demo2