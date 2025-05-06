import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { useControls } from 'leva';
const FollowerMouse = () => {

    //ref
    const meshRef = useRef<THREE.Mesh>(null!);
    const rayRef  = useRef<THREE.Raycaster>(new THREE.Raycaster());
    //https://threejs.org/docs/?q=plane#api/en/math/Plane
    //const planeRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0,0,1),0)); //z축을 기준으로 하는 평면->2차원 움직임만 따라옴
    const intersectRef = useRef<THREE.Vector3>(new THREE.Vector3()); //교차점
    
    //leva setting
    const { zPlane } = useControls('Plane',{
        zPlane: { value: 0, min: -100, max: 100, step: 1 }, //z축 평면 위치
    });
    const plane =  new THREE.Plane();

    //마우스 위치 + 카메라
    const { camera, pointer } = useThree();

    //dummy
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(5,20,20),
        new THREE.MeshBasicMaterial({color:'white'})
    );

    useFrame(()=>{
        if(!meshRef.current || !rayRef.current) return;
        //plane equation: z = zPlane -> normal(0,0,1) , constant: -zPlane
        plane.set(new THREE.Vector3(0,0,1), -zPlane); //평면의 normal벡터와 constant값 설정
        rayRef.current.setFromCamera(pointer, camera); //카메라에서 마우스 위치로 ray를 쏨
        rayRef.current.ray.intersectPlane(plane, intersectRef.current); //ray와 평면의 교차점 계산
        //meshRef.current.position.lerp(intersectRef.current, 0.1); //교차점으로 mesh 이동
        meshRef.current.position.copy(intersectRef.current); //교차점으로 mesh 이동
    });

    return (
        <>
            <mesh ref={meshRef}>
                <primitive object={mesh.geometry} attach="geometry" />
                <primitive object={mesh.material} attach="material" />
            </mesh>
        </>
    );
}

export default FollowerMouse