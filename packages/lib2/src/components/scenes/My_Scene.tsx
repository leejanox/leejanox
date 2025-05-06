import * as THREE from 'three'
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import ShadowModel from '../ShadowModel';

const pi = Math.PI;
const pi2 = Math.PI * 2;
const piHalf = Math.PI / 2;

const My_Scene = () => {

    useGLTF.preload('/models/tronald_dump_proto_series.glb');

    const reflectorConfig = {
        side:THREE.FrontSide,
        blur: .3,
        mixBlur:0.2,
        mixStrength:.5,
        roughness:.1,
        depthScale:.1,
        minDepthThreshold:.9,
        metalness:.8,
        color:'#d9d9d9',
        mirror:1.,
        resolution:1024,
        distortion:0.,
        temporal:false,
        reflectorOffset:0.,
    }

  return (
    <group>
        <ShadowModel url="/models/tronald_dump_proto_series.glb" position={[0, 0, 0]} rotation={[0, piHalf, 0]} scale={.01}/>

        <mesh position={[0, 0, 0]} rotation-x={-piHalf}>
            <planeGeometry args={[10, 10]} />
            <MeshReflectorMaterial {...reflectorConfig}/>
        </mesh>
    </group>
  )
}

export default My_Scene