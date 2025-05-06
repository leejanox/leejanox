import React from 'react';
import CanvasWrapper from '../../CanvasWrapper'
import type { Meta, StoryObj } from '@storybook/react';
import MovingCar from './MovingCar';

const meta: Meta<typeof MovingCar> = {
  title: 'Scene/MovingCar',
  component: MovingCar,
  decorators: [
    (Story) => (
      <CanvasWrapper camera={{ position: [-4, 1, 5], fov: 50 }}>
        <Story />
      </CanvasWrapper>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MovingCar>;

export const Default: Story = {
  args: {},
  render: (args) => <MovingCar/>
};