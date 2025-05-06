import type { Meta, StoryObj } from '@storybook/react';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';
import CanvasWrapper from '../CanvasWrapper';
import CustomText3D from './CustomText3D';

const meta: Meta<typeof CustomText3D> = {
  title: 'Text3D/CustomText3D',
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