import React, { useRef } from 'react'
import * as THREE from 'three'
import Car from './Car'
import Track from './Track'
import { useFrame, useThree } from '@react-three/fiber'
import { EnvironmentCube } from '@react-three/drei'
import Card,{CardRefHandle} from './Card'
import gsap from 'gsap'


const MovingCar = () => {

    //커브 설정
    //catmulRomCurve3 -> centripetal: 지나친 튕김,진동 방지 , 0.5: 곡률 조정, closed: true -> 시작점과 끝점 연결
    // const curve = new THREE.CatmullRomCurve3(points, true,'centripetal', 0.5); //곡선 설정
    // const curvePoints = curve.getPoints(50); //곡선 포인트 설정
    //큐빅 베지어 커브도 생성 가능
    const curve2 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(20, 0, -15), // 시작점
    new THREE.Vector3(-20, 0, -2), // 제어점1
    new THREE.Vector3(10, 0, ), // 제어점2
    new THREE.Vector3(-1, 0, 1) // 끝점
    );
    //const curvePoints2 = curve2.getPoints(50); //곡선 포인트 설정

    //차 이동
    const carRef = React.useRef<THREE.Group>(null!);
    const progress = useRef(0);
    const scale = 0.3; // initialScale
    //카드
    const cardRef = useRef<CardRefHandle>(null!);
    //gsap 한 번만 실행하도록
    const revealed = useRef(false);

    //camera -> dollyZoom 할거임
    const { camera } = useThree();

    useFrame((state,delta)=>{
        const time = state.clock.getElapsedTime();
        if(!carRef.current) return;

        if(progress.current === 0) state.clock.start();
        //delta = frame 마다 .016초초
        //progress.current += delta * 0.1; //차 속도
        progress.current += delta * 0.1 * time**2.1; //t = 가속도

        if(progress.current > 0 && progress.current < 1.){
            //진행 시작하고 가까이 오면 scale 증가 progress랑 비례로 증가
            const incrementScale = THREE.MathUtils.lerp(scale,1.7,progress.current);
            //carRef.current.scale.set(incrementScale,incrementScale,incrementScale);
            carRef.current.scale.setScalar(incrementScale); //차 스케일 설정
    
            //차 위지
            const pos = curve2.getPoint(progress.current); //차 위치
            carRef.current.position.set(pos.x,pos.y,pos.z); //차 위치 설정
            //차 머리 돌리기
            //탄젠트가 접선인데 곡선 그린거 접선 방향으로 머리 돌아감
            const tangent = curve2.getTangent(progress.current).normalize(); //차 진행 방향
            const lookAt = new THREE.Vector3().addVectors(pos,tangent); //차 진행 방향에 따라 머리 돌리기
            carRef.current.lookAt(lookAt); //차 머리 돌리기
        }
        //if(progress.current > 1) return; //진행이 1이 넘어가면 return
        if(progress.current >= 1.1) {
            progress.current = 1.1; //progress.current가 1.1이 넘으면 1.1로 고정
            carRef.current.scale.set(1.7,1.7,1.7); //scale 고정
            const targetPos = new THREE.Vector3(4.5,1,2.5); //마지막에 차가 바라볼 위치 = 카메라 마지막 위치
            camera.position.lerp(targetPos,.005);
            const carTarget = camera.position.clone();
            carTarget.y = 0; //카메라 y값을 0으로 고정
            carRef.current.lookAt(carTarget); //차 머리 돌리기
            if(camera instanceof THREE.PerspectiveCamera) { //camera가 perspectiveCamera 인거 알려줘야 fov 접근 가능
                camera.fov = THREE.MathUtils.lerp(30, 50, .2); // FOV 점점 넓게 (줌 아웃 느낌)
                camera.updateProjectionMatrix(); // FOV 바꿨으면 필수
            }

            //좀 뚝뚝 끊김
            // carRef.current.position.set(-2,0,3); //차 위치 고정
            // const targetPos = new THREE.Vector3();
            // camera.position.lerp(new THREE.Vector3(2, 1, 7), 0.01); //카메라 위치 설정
            // camera.getWorldPosition(targetPos); //차 위치 가져오기
            // carRef.current.lookAt(targetPos.x,0,targetPos.z); //차 머리 돌리기

        //card
        //!camera.position === targetPos -> camera.position하고 targetPos 는 객체 참조, === 는 주소 비교 -> 무조건 false
        //!lerp 는 매 프레임 부동 소수점 단위로 변해서 정확하게 같은 값이 될 수 없음
        const distance = camera.position.distanceTo(targetPos); 
        // if( distance < .01 && cardRef.current) {
        //     cardRef.current.position.set(0,-4,0); //카드 위치 설정
        //     gsap.to(cardRef.current.position, 
        //         {y:1, duration: 1,ease:'circ.in'}
        //     ); 
        // }
        //opacity 제어
        // const boxRef = useRef<THREE.Mesh>(null);
        // const textRef = useRef<THREE.Mesh>(null);
        if(distance < .1 && cardRef.current && !revealed.current) {
            revealed.current = true; //한 번만 실행되도록
            const {box, text} = cardRef.current; //box, text는 Card.tsx에서 ref로 설정한거
            gsap.to(box.material,{opacity:1, duration: .5, ease:'circ.in'}); //text opacity
            gsap.to(text.material,{opacity:1, duration: .5, ease:'circ.in'}); //box opacity
            //gsap.to(portalRef.current,{opacity:1, duration: 1, ease:'circ.in'}); //portal opacity
        }

        //아 별로임 끝나고 줌하는걸로 해야 할듯;
        // //카메라 위치 설정 dollyZoom = 카메라 
        // const dollyZoom = 10 - progress.current * 8; //progress 늘어날수록 줄어듬
        // camera.position.set(pos.x + 5,pos.y + 2,pos.z + dollyZoom); //카메라 위치 설정
        // camera.lookAt(pos); //카메라가 차를 바라보도록 설정

        // if(camera instanceof THREE.PerspectiveCamera) { //camera가 perspectiveCamera 인거 알려줘야 fov 접근 가능
        //     camera.fov = THREE.MathUtils.lerp(30, 90, progress.current); // FOV 점점 넓게 (줌 아웃 느낌)
        //     camera.updateProjectionMatrix(); // FOV 바꿨으면 필수
        // }
        // if(progress.current >= 1.) {
        //     camera.position.lerp(new THREE.Vector3(0, 2, .1), 0.1); //카메라 위치 설정
        //     camera.lookAt(carRef.current.position);

        //     return;
        // }
        }
    });


    
    return (
        <>
            <EnvironmentCube files={'/hdrs/qwantani_dusk_2_1k.hdr'} background/>
            {/* <directionalLight position={[10, 10, 10]} intensity={4} castShadow/> */}
            <Car ref={carRef}/>
            <Card ref={cardRef} position={[1.3,.6,0]} rotation-y={THREE.MathUtils.degToRad(45)} scale={[.4,.4,.4]}/>
            {/*차 어떻게 움직일지 색이랑 포인트 넣어주면 트랙에 선 생기게*/}
            <Track /*points={curvePoints2} trackColor='yellow'*//>
        </>
    )
}

export default MovingCar