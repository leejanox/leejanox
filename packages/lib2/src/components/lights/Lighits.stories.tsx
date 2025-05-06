import type { Meta, StoryObj } from '@storybook/react';
import My_Scene from '../scenes/My_Scene';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import My_SpotLight from './My_SpotLight';
import { Environment } from '@react-three/drei';

const meta: Meta<typeof My_Scene> = {
  title: 'Light/lights',
  component: My_Scene,
  decorators: [
    (Story) => (
        <Canvas camera={{position:[2,2,2]}} style={{ width: '100%', height: '100vh' }}>
            <axesHelper args={[5]} />
            <OrbitControls/>
            <Story />
        </Canvas>
    ),
  ]
};

export default meta;

type Story = StoryObj<typeof My_Scene>;

//ambienbt light
export const Default: Story = {
  args: {},
  render: (args) => (
    <>
        <ambientLight intensity={5}/>
        {/* <directionalLight
            position={[5, 10, 5]}
            intensity={10}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
        /> */}
        <My_Scene/>
    </>
  )
};

//spotlight
export const SpotLight: Story = {
  render: () => (
    <>
        {/* <spotLight position={[0, 5, 0]} angle={Math.PI / 4} penumbra={1} intensity={1} color="white" distance={10} /> */}
        <My_SpotLight quantity={4} radius={3} speed={.01} lightColor={['aliceblue','lightgreen','lightpink','aquamarine']}/>
        <My_Scene/>
    </>
  )
};


export const HDREnvironment: Story = {
    //바닥 색은 환경광으로 입혀야 이쁘게 나오는듯
  render: () => (
    <>
        <Environment files={'/hdrs/qwantani_dusk_2_1k.hdr'} background={false} 
            blur={.4} //bluring 효과 적용 0~1 : 1이 최대
            resolution={1024} //해상도
        />
        <My_Scene/>
    </>
  )
};

export const StoryHemisphereLight: Story = {
    render:() => (
        <>
            <hemisphereLight args={['#00f', '#f00', 5]}
                //장면 위, 장면 아래, 빛의 세기 
                //position={[0, 5, 0]}
            />
            <My_Scene/>
        </>
    )
}