import type { Meta, StoryObj } from '@storybook/react';
import CanvasWrapper from '../../CanvasWrapper';
import GlossyText3D,{GlossyText3DProps} from './GlossyText3D';

const meta: Meta<typeof GlossyText3D> = {
  title: 'Text3D/GlossyText3D',
  component: GlossyText3D,
};

export default meta;


type StoryGlossy = StoryObj<typeof GlossyText3D>;
//glossy 
export const Glossy: StoryGlossy = {
  args: {
    displayText: 'Glossy',
      font:'/fonts/Inter_Medium_Regular.json',
  
      position: [-1.1,0.2,.8],
      letterSpacing: .07, //bevel 쓰면 글자 겹쳐서 간격 좀 띄우는게 나을듯
  
      //조금 둥근 느낌
      bevelEnabled: true,
      bevelSize: 0.05,
      height: 0.05,
  
      curveSegments: 24, //곡선만 세그먼트 많아져서 부드럽고, x 같은경우는 별로 티 안남 24가 적당한듯
      bevelSegments: 12, //바벨 세그먼트 너무 촘촘할 필요 없어보임
       
      bevelOffset: 0.015, //너무 크면 뚱뚱해보임
      bevelThickness: 0.04, //wireframe 키면 보이는데 너무 커지면 글자 반갈죽
  },
  render: (args:GlossyText3DProps) => (
    <CanvasWrapper camera={{ position: [-1.4, 1, 2.6] ,fov: 50}}>
      <GlossyText3D {...args}/>
    </CanvasWrapper>
  )
};