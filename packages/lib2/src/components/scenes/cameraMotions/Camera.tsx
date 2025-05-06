import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, OrthographicCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { useRef, useState } from 'react';
import * as THREE from 'three';

const Camera = () => {

    //구체 추적용
    const sphereRef = useRef<THREE.Mesh>(null);
    const { camera } = useThree();

    const {
        cameraType, // perspective or orthographic
        fov,
        zoom,
        autoRotate,
        enableTrack, // enable camera tracking
        enableDollyZoom, //영화형 줌
        useMouse, // enable mouse control
    } = useControls({
        cameraType: { options: ['perspective', 'orthographic'], value: 'perspective' },
        fov: { value: 50, min: 10, max: 120, step: 1 },
        zoom: { value: 50, min: 10, max: 200, step: 1 },
        autoRotate: true,
        enableTrack: false,
        enableDollyZoom: false,
        useMouse: false,
    });

    const [time, setTime] = useState(0);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        setTime(t);

        if (sphereRef.current) {
            sphereRef.current.position.x = Math.sin(t) * 3;
            sphereRef.current.position.z = Math.cos(t) * 3;
        }

        if (enableTrack) {
            //돌고 있는 공을 따라가는데 perspective는 얼빡임
            camera.position.set(Math.sin(t) * 5, 2, Math.cos(t) * 5);
            if (sphereRef.current) camera.lookAt(sphereRef.current.position);
        }

        if (enableDollyZoom && camera instanceof THREE.PerspectiveCamera) {
            //fov와 z 위치를 반대로 변화시켜 영화 같은 줌 효과
            camera.fov = 75 - Math.sin(t) * 30; // fov 값 증가 ↔ 감소
            camera.position.z = 5 + Math.sin(t) * 2; // z 값 감소 ↔ 증가

            //fov, zoom 값 바꾸려면 반드시 updateProjectionMatrix()를 호출해야 한다.
            //updateProjectionMatrix()는 카메라의 투영 행렬을 업데이트하여 카메라의 시야를 변경하는 메서드
            //투명 행렬은 초기 카메라 생성될때만 한 번 계산되기 때문
            camera.updateProjectionMatrix();
        }

        if (useMouse) {
            const { x, y } = state.pointer;
            camera.position.x = x * 10;
            camera.position.y = y * 5 + 2;
            camera.lookAt(0, 0, 0);
        }
    });

    return (
        <>
            {cameraType === 'perspective' ? (
                <PerspectiveCamera makeDefault fov={fov} position={[5, 5, 5]} />
            ) : (
                <OrthographicCamera makeDefault zoom={zoom} position={[5, 5, 5]} />
            )}

            <OrbitControls autoRotate={autoRotate} />

            <ambientLight intensity={0.3} />
            <directionalLight castShadow position={[5, 10, 5]} intensity={1} />

            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            <mesh ref={sphereRef} position={[0, 1, 0]} castShadow>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial color="tomato" />
            </mesh>
        </>
    );
};

export default Camera;
