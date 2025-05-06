
import type { Meta, StoryObj } from '@storybook/react';
import ExpandingParticle from './ExpandingParticle';
import CanvasWrapper from '../CanvasWrapper';

import {useControls} from 'leva'

import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing' // postprocessing의 블렌드 함수

const meta: Meta<typeof ExpandingParticle> = {
  title: 'Particles/ExpandingParticle',
  component: ExpandingParticle,
};

export default meta;

type Story = StoryObj<typeof ExpandingParticle>;

//Default
const ParticleStory = () => {
  const tt1 = useLoader(THREE.TextureLoader,'/textures/fxn/1_1.jpg');
  return(
    <CanvasWrapper camera={{position:[0,0,500],fov:80}} style={{backgroundColor:'black'}}>
        <ExpandingParticle texture={tt1}/>
    </CanvasWrapper>
  );
}

export const Default: Story = {
  args: {
  },
  render: () => <ParticleStory/>
};

//Add leva -> 흠..useMemo로 shaderMaterial 만들어놔서 그런지 연결 안됨
const LevaParticleStory = () => {
  const {uAlpha,uDistortion} = useControls({
    uAlpha: { value: 0, min: 0, max: 1, step: 0.1 }, //alpha값
    uDistortion: { value: 0, min: 0, max: 1, step: 0.1 }, //distortion값
  });

  return (
    <CanvasWrapper camera={{position:[0,0,500],fov:80}} style={{backgroundColor:'black'}}>
        <ExpandingParticle levaUniforms={{uAlpha,uDistortion}}/>
    </CanvasWrapper>
  );
}

export const Leva: Story = {
  args: {
  },
  render: () => <LevaParticleStory/>
}

//Add Bloom Effect
const BloomParticleStory = () => {
  const tt1 = useLoader(THREE.TextureLoader,'/textures/fxn/1_1.jpg');
  return(
    <CanvasWrapper camera={{position:[0,0,500],fov:80}} style={{backgroundColor:'black'}}>
        <ExpandingParticle texture={tt1}/>
        <EffectComposer>
          <Bloom
            luminanceThreshold={.1} // bloom이 시작되는 밝기
            luminanceSmoothing={.9} // bloom이 시작된 후 얼마나 부드럽게 퍼질지
            intensity={2.1} // bloom의 강도
            blendFunction={BlendFunction.SCREEN} //add:덧셈블렌딩, screen:smooth투명,광효과블렌딩, Multiply:어둡게곱하기블렌딩, softlight:부드러운빛블렌딩
            kernelSize={2} // bloom의 크기
          />
        </EffectComposer>
    </CanvasWrapper>
  );
}

export const Blooming: Story = {
  args: {
  },
  render: () => <BloomParticleStory/>
}