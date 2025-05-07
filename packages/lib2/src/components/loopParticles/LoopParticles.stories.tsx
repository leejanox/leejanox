
import type { Meta, StoryObj } from '@storybook/react';
import Scene from './Scene';
import CanvasWrapper from '../../components/CanvasWrapper';

const meta: Meta<typeof Scene> = {
  title: 'Particles/LoopParticles',
  component: Scene,
  decorators:[
    (Story) => (
        <CanvasWrapper camera={{ position: [0, 0, 100] , fov: 70 ,near: 0.1, far: 1000 }}  style={{background: 'black'}}>
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