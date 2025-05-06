import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
const MultySelect = () => {

    const PI = Math.PI;
    const PI2 = Math.PI / 2;

    const mesh = useMemo(()=> 
        new THREE.Mesh(
            new THREE.SphereGeometry(1, 16, 16),
            new THREE.MeshBasicMaterial({ color: 'white' })
        ),
    []);

    const {camera, pointer ,raycaster, scene, gl} = useThree();
    const raycasterRef = useRef<THREE.Raycaster>(raycaster);
    
    const handleClick = (e:any) => {

        e.stopPropagation(); //이벤트 전파 방지
        raycasterRef.current.setFromCamera(pointer, camera); //카메라에서 마우스 위치로 ray를 쏨
        const intersects = raycasterRef.current.intersectObjects(scene.children); //ray와 교차하는 객체들
        if(intersects.length > 0) {
            const firstIntersect = intersects[0]; //첫번째 교차점
            const object = firstIntersect.object; //교차한 객체
            const point = firstIntersect.point; //교차한 점
            console.log('click', object.name, point); //교차한 객체와 점 출력
        }
    }

    useFrame(()=>{
        gl.domElement.addEventListener('click', handleClick); //click 이벤트 리스너 추가
        return () => gl.domElement.removeEventListener('click', handleClick); //cleanup: click 이벤트 리스너 제거
    })

    return (
        <>
            {Array.from({length: 5}).map((_,i) => {
                const x = Math.cos(PI2 * i) * 2;
                const y = Math.sin(PI2 * i) * 2;
                const z = Math.sin(PI * i) * .2;
                return (
                    <mesh key={i} name={`sphere${i}`} position={[x, y, z]} rotation={[PI2, PI, 0]}>
                        <primitive object={mesh.geometry} attach="geometry" />
                        <primitive object={mesh.material} attach="material" />
                    </mesh>
                )
            })}
        </>
    );
}

export default MultySelect