import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Gelatin from './Gelatin';
import CanvasWrapper from '../../CanvasWrapper';
import { Environment } from '@react-three/drei';

const meta: Meta<typeof Gelatin> = {
  title: 'Material/Gelatin',
  component: Gelatin,
  decorators:[
    (Story) => (
        <CanvasWrapper shadows camera={{ position:[20,20,20], fov:25, aspect:window.innerWidth/window.innerHeight, near:0.1, far:1000}}>
            <ambientLight intensity={Math.PI}/>
            <Environment files={'/hdrs/dancing_hall_1k.hdr'}/>
            <Story/>
        </CanvasWrapper>
    ),
  ]
};

export default meta;

type Story = StoryObj<typeof Gelatin>;

export const Default: Story = {
  args: {},
  render: (args) => <Gelatin />
};