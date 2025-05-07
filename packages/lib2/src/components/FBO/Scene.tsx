import FBOCompute from "./components/FBOCompute"
import { useFBOs } from './hooks/useFBOs'
import * as THREE from 'three'
import { useState } from 'react'


const Scene = () => {

    const [fbo1, fbo2 ] = useFBOs(512, 512); //FBO 생성
    const [currentTexture, setCurrentTexture] =useState<THREE.Texture>(null!);

    return(
        <>
            <FBOCompute width={512} fbo1={fbo1} fbo2={fbo2} setCurrTexture={setCurrentTexture} />
            {currentTexture && (
                <mesh>
                    <planeGeometry args={[2, 2]} />
                    <meshBasicMaterial map={currentTexture} />
                </mesh>
            )}
        </>
    )
}

export default Scene