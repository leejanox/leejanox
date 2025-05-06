import { MeshPortalMaterial, useCursor } from "@react-three/drei";
import * as THREE from 'three'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Text } from "@react-three/drei";
import  { RoundedShape } from "../../geometries/RoundedGeometry"

type CardProps = {
    //children?: React.ReactNode;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
}

export type CardRefHandle = {
    group: THREE.Group;
    box: THREE.Mesh;
    text: THREE.Mesh;
}

const Card = forwardRef<CardRefHandle, CardProps>(({children,...props},ref) => {

    //Ref
    const cardRef = useRef<THREE.Group>(null);

    const [displayText, setDisplayText] = useState('Mouse Over'); //text

    //opacity 제어
    //const portalRef = useRef(null);
    const boxRef = useRef<THREE.Mesh>(null);
    const textRef = useRef<THREE.Mesh>(null);    
    
    useImperativeHandle(ref,()=>({
        group: cardRef.current!,
        box: boxRef.current!,
        text: textRef.current!
    }),[]); //부모에서 ref로 접근할 수 있도록 설정

    //hover ->
    const [hovered, hover] = useState(false);
    useCursor(hovered); //hovered가 true일때만 cursor 변경

    const handlePointerOver = () => {
        hover((prev)=> !prev); 
        setDisplayText('Double Click?');
        if(cardRef.current){
            cardRef.current.scale.set(.5,.5,.5); //hover시 scale 증가
        }
    }

    const handlePointerOut = () => {
        hover((prev)=> !prev); 
        setDisplayText('Mouse Over');
        if(cardRef.current){
            cardRef.current.scale.set(.4,.4,.4); //hover시 scale 감소소
        }
    }

    //mesh
    const shape = RoundedShape({width:3.4,height:2. , radius:.5})
    const geom = new THREE.ShapeGeometry(shape,12); //geometry 생성
    
    return (
        <group ref={cardRef} {...props} scale={[.4,.4,.4]}
            onPointerOver={(e)=>{ e.stopPropagation(); handlePointerOver();}} 
            onPointerOut={(e)=>{e.stopPropagation(); handlePointerOut();}}
            onDoubleClick={(e)=>{e.stopPropagation(); alert('click');}}
        >
            <Text ref={textRef} material-transparent material-opacity={0}
                font={'/fonts/cute.ttf'} fontSize={.51} color={'#fff'} letterSpacing={0.03} position={[0,0,0.1]} 
            >
                {displayText}
            </Text>
            <mesh castShadow>
                <primitive attach="geometry" object={geom}/>
                <MeshPortalMaterial side={THREE.DoubleSide} 
                    resolution={1024} blur={0} transparent opacity={0} 
                >
                    <mesh ref={boxRef}>
                        <planeGeometry args={[3.4,2]}/>
                        <meshStandardMaterial color="skyblue" transparent opacity={0}/>
                    </mesh>
                </MeshPortalMaterial>
            </mesh>
        </group>
    );
});


export default Card