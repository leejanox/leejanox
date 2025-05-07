
import type { Meta, StoryObj } from '@storybook/react';
import Scene from './Scene';
import CanvasWrapper from '../../components/CanvasWrapper';

const meta: Meta<typeof Scene> = {
  title: 'FBO/Scene',
  component: Scene,
  decorators:[
    (Story) => (
        <CanvasWrapper>
          <Story />
        </CanvasWrapper>
    ),
  ]
};

export default meta;

type Story = StoryObj<typeof Scene>;

export const Default: Story = {
  args: {},
  render: (args) => <Scene/>
};