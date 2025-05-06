
import type { Meta, StoryObj } from '@storybook/react';
import WaterColor from './WaterColor';
import CanvasWrapper from '../CanvasWrapper';

const meta: Meta<typeof WaterColor> = {
  title: 'Effects/WaterColor',
  component: WaterColor,
};

export default meta;

type Story = StoryObj<typeof WaterColor>;

//Default
const WaterColorStory = () => {
    return (
        <CanvasWrapper camera={{position:[0,0,10],fov:70}} style={{backgroundColor:'black'}}>
            <directionalLight position={[0,0,10]} intensity={1.5}/>
            <WaterColor />
        </CanvasWrapper>
    );
}
export const Default: Story = {
  args: {},
  render: (args) => <WaterColorStory/>
};