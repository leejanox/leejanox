
import type { Meta, StoryObj } from '@storybook/react';
import TorusMesh from './TorusKnotMesh';
import CanvasWrapper from '../CanvasWrapper';

const meta: Meta<typeof TorusMesh> = {
  title: 'Mesh/TorusMesh',
  component: TorusMesh,
  decorators:[
    (Story) => (
        <CanvasWrapper camera={{ position: [0, 0, 5], fov: 50 }}>
            <Story />
        </CanvasWrapper>
    ),
  ]
};

export default meta;

type Story = StoryObj<typeof TorusMesh>;

export const Default: Story = {
  args: {},
  render: (args) => <TorusMesh />
};

