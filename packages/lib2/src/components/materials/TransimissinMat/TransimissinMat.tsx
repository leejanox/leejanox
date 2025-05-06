import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from 'three';
import { useControls } from "leva";

const TransimissinMat = () => {

    const {...config} = useControls({
        transmissionSampler: false,                                      // 굴절 샘플러 활성화 여부: true로 설정하면 더 많은 샘플을 사용하여 굴절 효과를 계산 (비활성화 상태로 두면 성능 향상)
        backside: false,                                                 // 반대면 렌더링 여부: true로 설정하면 두께가 있는 물체의 뒷면을 렌더링 (예: 유리나 물체의 반대면 렌더링)
        samples: { value: 10, min: 1, max: 32, step: 1 },                 // 샘플 수: 굴절 및 투과 계산을 위한 샘플의 수 (1에서 32까지, 값이 클수록 더 높은 품질)
        resolution: { value: 2048, min: 256, max: 2048, step: 256 },      // 해상도: 텍스처 해상도 (256에서 2048까지, 값이 클수록 텍스처가 선명해지지만 성능에 부담을 줄 수 있음)
        transmission: { value: 1, min: 0, max: 1 },                       // 투과율: 물체가 빛을 얼마나 투과하는지 (0은 완전히 불투명, 1은 완전히 투명)
        roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },            // 표면 거칠기: 0은 완전 매끄러운 표면, 1은 거친 표면 (거칠기 값에 따라 빛 반사 정도 조정)
        thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },           // 두께: 물체의 두께 (투명 물체의 두께에 따라 빛의 흡수 정도가 달라짐)
        ior: { value: 1.5, min: 1, max: 5, step: 0.01 },                  // 굴절률 (IOR, Index of Refraction): 물질의 빛 굴절 정도 (예: 유리: 1.5, 물: 1.33)
        chromaticAberration: { value: 0.06, min: 0, max: 1 },             // 색상 이상 강도: 빛이 굴절되며 색상이 일그러지는 현상 (0은 이상 없음, 1은 강한 색상 이상)
        anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },           // 이방성: 빛의 굴절 방향에 따라 물질의 특성이 달라지는 정도 (0은 이방성 없음, 1은 최대 이방성)
        distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },           // 왜곡 정도: 물체의 표면에서 빛이 왜곡되는 정도 (0은 왜곡 없음, 1은 최대 왜곡)
        distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },   // 왜곡 스케일: 왜곡 효과의 크기 (0.01에서 1까지 조정 가능)
        temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },   // 시간적 왜곡: 시간에 따른 물체의 굴절 및 왜곡 효과의 변화 정도 (0은 시간적 왜곡 없음, 1은 최대 왜곡)
        clearcoat: { value: 1, min: 0, max: 1 },                          // 클리어코트 효과: 물체 표면에 추가적인 반사층을 추가 (0은 추가 반사 없음, 1은 최대 반사)
        attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 }, // 감쇠 거리: 빛이 물체를 통과하면서 얼마나 빨리 감쇠되는지 (값이 클수록 물체가 빛을 더 많이 흡수)
        attenuationColor: '#ffffff',                                      // 감쇠 색상: 빛이 감쇠되면서 물체의 색상에 영향을 미치는 색 (기본값: 흰색)
        color: '#c9ffa1',                                                 // 물체의 기본 색상: 이 색상은 물체의 외형 색상을 설정
        bg: '#839681'                                                    // 배경 색상: 장면의 배경 색상 (여기서는 다소 푸른 회색 계열로 설정)
    })

    return (
        <>
            <mesh>
                <dodecahedronGeometry />
                <MeshTransmissionMaterial
                    {...config}

                    background={new THREE.Color(config.bg)}
                />
            </mesh>
        </>
    )
}

export default TransimissinMat