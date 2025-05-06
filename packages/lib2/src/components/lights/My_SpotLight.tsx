import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export type My_SpotLightProps = {
    quantity?: number;
    radius?: number;
    lightColor?: string[];

} & React.ComponentProps<'group'> & {
    speed?: number;
}

const My_SpotLight = ({quantity,radius,lightColor,speed,...props}:My_SpotLightProps) => {

    const Dquantity = 4; // 광원의 개수
    const Dradius = 5; // 광원이 위치할 원 반지름
    const DlightColor = ['aliceblue','lightgreen','lightpink','aquamarine']; // 광원의 색상

    const groupRef = useRef<THREE.Group>(null!);

    useFrame(()=>{
        if(groupRef.current){
            groupRef.current.rotation.y += speed??.01;
        };
    })

    return (
        <group ref={groupRef} {...props}>
            {[...Array(quantity?? Dquantity )].map((_,index)=>{
                const position = [index*((radius??Dradius)*2)-(radius??Dradius),25,0];
                const angle = (position[0]+(radius??Dradius))/(radius??Dradius)*10;

                return (
                    <spotLight key={index} position={[position[0],position[1],position[2]]} 
                    //색, 강도, 거리, 각도, 페너브라, 감도, 거리
                    args={[(lightColor??DlightColor)[index],3000,50,angle,.8,2]} />
                )
            })}

        </group>
    )
}

export default My_SpotLight