import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CanvasWrapper from '../../CanvasWrapper';
import { Environment } from '@react-three/drei';
import ReflectorMat from './ReflectorMat';

const meta: Meta<typeof ReflectorMat> = {
    title: 'Material/ReflectorMat',
    component: ReflectorMat,
    decorators: [
        (Story) => (
            <CanvasWrapper camera={{ position: [5, 5, 5], fov: 50 }}>
                <Story />
            </CanvasWrapper>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof ReflectorMat>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <>
      <Environment preset="city" background={false} />
      <ReflectorMat />
    </>
  )
};