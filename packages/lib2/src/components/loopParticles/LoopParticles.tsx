import * as THREE from 'three'
import vt from './loopParticlesVertex.glsl?raw'
import fg from './loopParticlesFragment.glsl?raw'

type Props = {}


const LoopParticles = (props: Props) => {
  return (
    <>
        <mesh>
            <planeGeometry args={[100,100,20,20]}/>
            <shaderMaterial
                uniforms={{
                    uTime: { value: 0 },
                    uColor: { value: new THREE.Color(0x00ff00) },
                    uSize: { value: 0.1 },
                    uSpeed: { value: 1.0 },
                }}
                vertexShader={vt}
                fragmentShader={fg}
                transparent
            />
        </mesh>
    </>
  )
}

export default LoopParticles