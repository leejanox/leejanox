import type { Meta, StoryObj } from '@storybook/react';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';
import CanvasWrapper from '../CanvasWrapper';
import CustomText3D from './CustomText3D';
import GlossyText3D from './GlossyText3D';

const meta: Meta<typeof CustomText3D> = {
  title: 'THREE/CustomText3D',
  component: CustomText3D,
};

export default meta;

type Story = StoryObj<typeof CustomText3D>;

export const Default: Story = {
    args: {
        font: '/fonts/Inter_Medium_Regular.json',
        displayText: 'Hello',
        height: 0.1,
        bevelEnabled: true,
        bevelSize: 0.02,
        curveSegments: 12,
        position:[-.7,-.2,0],
    },
    render: (args) => (
        <CanvasWrapper camera={{ position: [0,0, 2], fov: 75 }}>
            <CustomText3D {...args}>
            <meshStandardMaterial color="blue" />
            </CustomText3D>
        </CanvasWrapper>
    ),
};

//material - physical
const material_physical = new THREE.MeshPhysicalMaterial({
    transmission:.5,
    roughness:.1,
    thickness:0.5,
    ior:1.24,
    metalness:.1,
    specularIntensity:1.,
    specularColor: new THREE.Color(.5,.5,.5),
    color:new THREE.Color(.5,.5,.5),
    clearcoat:.4,
    clearcoatRoughness:0,
    attenuationDistance: 1.,
    attenuationColor: new THREE.Color(.5,.5,.5),
    side:THREE.DoubleSide,
    transparent:true,
});

export const Physical: Story = {
    args:{
        font: '/fonts/Inter_Medium_Regular.json',
        displayText: 'Hello',
        height: 0.1,
        bevelEnabled: true,
        bevelSize: 0.02,
        curveSegments: 12,
        position:[-.8,-.2,0]
    },
    render: (args) => (
        <CanvasWrapper camera={{ position: [0,0,1.5], fov: 75 }}>
            <Environment preset="apartment" background={false} resolution={1024} />
            <CustomText3D {...args}>
                <primitive attach="material" object={material_physical} />
            </CustomText3D>
        </CanvasWrapper>
    ),
}

type StoryGlossy = StoryObj<typeof GlossyText3D>;
//glossy 
export const Glossy: StoryGlossy = {
  args: {
    displayText: 'Glossy',
      font:'/fonts/Inter_Medium_Regular.json',
  
      position: [-1.1,0.2,.8],
      letterSpacing: .07, //bevel 쓰면 글자 겹쳐서 간격 좀 띄우는게 나을듯
  
      //조금 둥근 느낌
      bevelEnabled: true,
      bevelSize: 0.05,
      height: 0.05,
  
      curveSegments: 24, //곡선만 세그먼트 많아져서 부드럽고, x 같은경우는 별로 티 안남 24가 적당한듯
      bevelSegments: 12, //바벨 세그먼트 너무 촘촘할 필요 없어보임
       
      bevelOffset: 0.015, //너무 크면 뚱뚱해보임
      bevelThickness: 0.04, //wireframe 키면 보이는데 너무 커지면 글자 반갈죽
  },
  render: (args) => (
    <CanvasWrapper camera={{ position: [-1.4, 1, 2.6] ,fov: 50}}>
      <GlossyText3D {...args}/>
    </CanvasWrapper>
  )
};