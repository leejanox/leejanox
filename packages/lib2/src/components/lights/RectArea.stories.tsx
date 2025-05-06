import type { Meta, StoryObj } from '@storybook/react';
import RectArea from './RectArea';
import CanvasWrapper from '../CanvasWrapper';
import { OrbitControls } from '@react-three/drei';

const meta: Meta<typeof RectArea> = {
  title: 'Light/RectArea',
  component: RectArea,
  decorators: [
    (Story) => (
      <CanvasWrapper camera={{ position: [8, 5, 8], fov: 50 }} shadows>
        <OrbitControls />
        <Story />
      </CanvasWrapper>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RectArea>;

export const Default: Story = {
  args: {},
  render: () => <RectArea />,
};