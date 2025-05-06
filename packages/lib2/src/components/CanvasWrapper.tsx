
import { Canvas,CanvasProps } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface CanvasWrapperProps extends CanvasProps {
    children: React.ReactNode
}
export default function CanvasWrapper({children, ...props}:CanvasWrapperProps) {
    return (
        <div className="" style={{width:'100vw', height:'100vh',margin:'0',padding:'0',boxSizing:'border-box'}}>
            <Canvas {...props}>
                {/* <pointLight position={[0,4,2]} intensity={1} color={0x124a} distance={10}/> */}
                <ambientLight intensity={1} />
                <OrbitControls/>
                <axesHelper args={[5]} />
                {children}
            </Canvas>
        </div>
    )
}
