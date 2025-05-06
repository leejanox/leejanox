import { CubeCamera , MeshRefractionMaterial} from "@react-three/drei"
import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import {RGBELoader} from "three-stdlib";

export type TextureReflectorMatProps = {
    url?: string; // url prop을 통해 외부에서 텍스처를 전달받을 수 있도록 설정
    resolution?: number; // CubeCamera의 해상도
}
const TextureReflectorMat = ({url,resolution}:TextureReflectorMatProps) => {

        //보석표면에 반사되는 주변환경에 대한 이미지가 필요함
    //주변환경에 대한 이미지는 HDR 이미지가 필요함
    //HDR 이미지 로더
    const texture = useLoader(RGBELoader,url??'/hdrs/qwantani_dusk_2_1k.hdr');
    //cube 카메라를 통해 6개면의 반사이미지를 얻을 수 있다.
    //CubeCamera는 해상도, 프레임, 그리고 반사될 환경 이미지를 지정 -> 주변환경 이미지는 texture로 지정
    //그리고 CubeCamera는 자식으로 콜백함수를 가지는데 자식으로 mesh를 넣어준다

    const {...config} = useControls({
        bounces: {value: 2, min: 0, max: 4, step: 0.1},               // 굴절된 빛이 물체에서 반사된 후 다시 다른 표면에서 반사되는 횟수 (0에서 4까지, 반사 횟수 조정)
        aberrationStrength: {value: 0.03, min: 0, max: 1, step: 0.01},  // 색상 이상 강도: 굴절 시 색상 왜곡 정도 (0에서 1까지, 값이 클수록 더 강한 색상 왜곡)
        ior: {value: 2.75, min: 1, max: 3, step: 0.1},                  // 굴절률 (Index of Refraction): 물질의 굴절률 (보통 1보다 크며, 2.75는 다이아몬드 정도)
        fresnel: {value: 0, min: 0, max: 1, step: 0.1},                 // 프레넬 효과 강도: 물체 표면에서 반사되는 양 (0에서 1까지, 입사각에 따라 반사 정도 조정)
        fastChroma: {value:true}                                       // 빠른 색상 이상 계산 사용 여부: true로 설정하면 색상 이상 효과를 더 빠르게 처리
    })

    return (
        <>
            <CubeCamera resolution={resolution??1024} frames={1} envMap={texture}>
                {(texture) => (
                    <mesh>
                        <dodecahedronGeometry />
                        <MeshRefractionMaterial
                            envMap={texture}
                            toneMapped={false}
                            color='white'
                            {...config}
                        />
                    </mesh>
                )}
            </CubeCamera>
        </>
    )
}

export default TextureReflectorMat