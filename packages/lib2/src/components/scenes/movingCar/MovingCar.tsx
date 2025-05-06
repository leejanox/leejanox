import React, { useRef } from 'react'
import * as THREE from 'three'
import Car from './Car'
import Track from './Track'
import { useFrame, useThree } from '@react-three/fiber'

const MovingCar = () => {

    //커브 설정
    //catmulRomCurve3 -> centripetal: 지나친 튕김,진동 방지 , 0.5: 곡률 조정, closed: true -> 시작점과 끝점 연결
    // const curve = new THREE.CatmullRomCurve3(points, true,'centripetal', 0.5); //곡선 설정
    // const curvePoints = curve.getPoints(50); //곡선 포인트 설정
    //큐빅 베지어 커브도 생성 가능
    const curve2 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(2, 0, -15), // 시작점
    new THREE.Vector3(-20, 0, -2), // 제어점1
    new THREE.Vector3(10, 0, ), // 제어점2
    new THREE.Vector3(-1, 0, 1) // 끝점
    );
    //const curvePoints2 = curve2.getPoints(50); //곡선 포인트 설정

    //차 이동
    const carRef = React.useRef<THREE.Group>(null!);
    const progress = useRef(0);
    const scale = 0.3; // initialScale

    //camera -> dollyZoom 할거임
    const { camera } = useThree();


    useFrame((state,delta)=>{
        const time = state.clock.getElapsedTime();
        if(!carRef.current) return;

        if(progress.current === 0) state.clock.start();
        //delta = frame 마다 .016초초
        //progress.current += delta * 0.1; //차 속도
        progress.current += delta * 0.1 * time**3.6; //t = 가속도
        if(progress.current > 1) return; //진행이 1이 넘어가면 return

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

        //아 별로임 끝나고 줌하는걸로 해야 할듯;
        // //카메라 위치 설정 dollyZoom = 카메라 
        // const dollyZoom = 10 - progress.current * 8; //progress 늘어날수록 줄어듬
        // camera.position.set(pos.x + 5,pos.y + 2,pos.z + dollyZoom); //카메라 위치 설정
        // camera.lookAt(pos); //카메라가 차를 바라보도록 설정

        // if(camera instanceof THREE.PerspectiveCamera) { //camera가 perspectiveCamera 인거 알려줘야 fov 접근 가능
        //     camera.fov = THREE.MathUtils.lerp(30, 90, progress.current); // FOV 점점 넓게 (줌 아웃 느낌)
        //     camera.updateProjectionMatrix(); // FOV 바꿨으면 필수
        // }
    });

    
    return (
        <>
            <directionalLight position={[10, 10, 10]} intensity={4} castShadow/>
            <Car ref={carRef}/>
            {/*차 어떻게 움직일지 색이랑 포인트 넣어주면 트랙에 선 생기게*/}
            <Track /*points={curvePoints2} trackColor='yellow'*//>
        </>
    )
}

export default MovingCar