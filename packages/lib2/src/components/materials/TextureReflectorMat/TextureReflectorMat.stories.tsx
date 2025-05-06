import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CanvasWrapper from '../../CanvasWrapper';
import TextureReflectorMat,{TextureReflectorMatProps} from './TextureReflectorMat';

const meta: Meta<typeof TextureReflectorMat> = {
    title: 'Material/TextureReflectorMat',
    component: TextureReflectorMat,
    decorators: [
        (Story) => (
            <CanvasWrapper camera={{ position: [5, 5, 5], fov: 50 }}>
                <Story />
            </CanvasWrapper>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof TextureReflectorMat>;

export const Default: Story = {
  args: {
    resolution: 1024,
},
  render: (args:TextureReflectorMatProps) => (
    <>
      <TextureReflectorMat {...args}/>
    </>
  )
};