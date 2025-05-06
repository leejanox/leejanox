import type { Meta, StoryObj } from '@storybook/react';
import RoundedGeometry from './RoundedGeometry';
import CanvasWrapper from '../CanvasWrapper';
import RoundedExtrude from './RoundedExtrude';

const meta: Meta<typeof RoundedGeometry> = {
  title: 'Geometry/CustomGeometry',
  component: RoundedGeometry,
  decorators:[
    (Story) => (
      <CanvasWrapper camera={{ position: [0, 0, 3], fov: 75 }}>
        <Story/>
      </CanvasWrapper>
    ),
  ]
};

export default meta;

type Story = StoryObj<typeof RoundedGeometry>;

export const Default: Story = {
  args: {
    width: 1.5,
    height: 1.8,
    radius: 0.2,
    segments: 12,
  },
  render: (args) => <RoundedGeometry {...args}/>
};

export const Extrude: Story = {
    args: {
        width: 1.5,
        height: 1.8,
        radius: 0.,
        segments: 0,
    },
    render: (args) => <RoundedExtrude {...args}/>,
}