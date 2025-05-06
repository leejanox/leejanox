import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CanvasWrapper from '../../CanvasWrapper';
import { Environment } from '@react-three/drei';
import TransimissinMat from './TransimissinMat';

const meta: Meta<typeof TransimissinMat> = {
    title: 'Material/TransimissinMat',
    component: TransimissinMat,
    decorators: [
        (Story) => (
            <CanvasWrapper camera={{ position: [5, 5, 5], fov: 50 }}>
                <Story />
            </CanvasWrapper>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof TransimissinMat>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <>
      <Environment preset="city" background={false} />
      <TransimissinMat />
    </>
  )
};