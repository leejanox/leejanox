import type { Meta, StoryObj } from '@storybook/react';
import CanvasWrapper from '../CanvasWrapper';
import LineMesh from './LineMesh';

const meta: Meta<typeof LineMesh> = {
    title: 'Mesh/LineMesh',
    component: LineMesh,
    decorators: [
        (Story) => (
            <CanvasWrapper camera={{ position: [0, 0, 2], fov: 50 }}>
                <Story />
            </CanvasWrapper>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof LineMesh>;

export const Default: Story = {
    args: {
        width: 2,
        height: 1.8,
        radius: 0,
        segments: 12,
    },
    render: (args) => <LineMesh {...args} />
};