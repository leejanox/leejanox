import type { Meta, StoryObj } from '@storybook/react';
import FollowerMouse from './FollowerMouse';
import CanvasWrapper from '../CanvasWrapper';
import R3fClickHandler from './R3fClickHandler';
import MultySelect from './MultySelect';

const meta: Meta<typeof FollowerMouse> = {
    title: 'RayCaster/Mouse',
    component: FollowerMouse,
};

export default meta;

type Story = StoryObj<typeof FollowerMouse>;

//Default
const FollowerMeshStory = () => {
    return (
        <CanvasWrapper camera={{ position: [0, 0, 100], fov: 70 }} style={{ backgroundColor: 'black' }}>
            <FollowerMouse />
        </CanvasWrapper>
    );
}

export const Default: Story = {
    args: {},
    render: (args) => <FollowerMeshStory/>,
};

//R3fClickHandler
const R3fClickHandlerStory = () => {
    return (
        <CanvasWrapper camera={{ position: [0, 0, 5], fov: 70 }} style={{ backgroundColor: 'black' }}>
            <R3fClickHandler />
        </CanvasWrapper>
    );
}

export const R3fClick: Story = {
    args: {},
    render: (args) => <R3fClickHandlerStory/>,
}

//MultySelect
const MultySelectStory = () => {
    return (
        <CanvasWrapper camera={{ position: [0, 0, 5], fov: 70 }} style={{ backgroundColor: 'black' }}>
            <MultySelect/>
        </CanvasWrapper>
    );
}

export const MultySelected: Story = {
    args: {},
    render: (args) => <MultySelectStory/>,
}