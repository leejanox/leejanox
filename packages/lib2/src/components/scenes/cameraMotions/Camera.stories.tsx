import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Camera from './Camera';
import CanvasWrapper from '../../CanvasWrapper';

const meta: Meta<typeof Camera> = {
  title: 'Camera/Camera',
  component: Camera,
    decorators: [
        (Story) => (
            <CanvasWrapper camera={{ position: [0, 0, 5], fov: 50 }}>
                <Story />
            </CanvasWrapper>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Camera>;

export const Default: Story = {
  args: {},
  render: (args) => <Camera/>
};