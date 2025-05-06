//안댐 그냥 primitive 쓰셈
import { extend } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';

//등록
extend({ MeshTransmissionMaterial: MeshTransmissionMaterial as any});

declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshTransmissionMaterial: any;
        }
    }
}