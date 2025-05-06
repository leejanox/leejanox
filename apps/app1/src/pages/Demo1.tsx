import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef, useEffect, useState } from 'react'
import { useLoader,useFrame } from '@react-three/fiber'
import { ExpandingParticle } from '@janox/lib2'
import '../styles/demo1.scss'
import gsap from 'gsap'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing' // postprocessing의 블렌드 함수


const MainAnimation = ({active}:{active: number|'all'|null}) => {

  //state
  const [visible, setVisible] = useState<number[]>([]);
  const [bloomStrength, setBloomStrength] = useState(0.); //bloom 강도

  //texture
  const tt1= useLoader(THREE.TextureLoader, '1_1.jpg');
  const tt2= useLoader(THREE.TextureLoader, '2_1.jpg');
  const tt3= useLoader(THREE.TextureLoader, '3_1.jpg');

  //ref
  const gRef1 = useRef<THREE.Group>(null!);
  const gRef2 = useRef<THREE.Group>(null!);
  const gRef3 = useRef<THREE.Group>(null!);
  
  //setup
  const groupRefs = [gRef1, gRef2, gRef3];
  //const bloomStrength = useRef(0.); //bloom 강도 -> ref로 하면 값 변경해도 반영안댐
  //const visibleIndex = useRef(0); 

  //time
  useFrame((state)=>{
    const time = state.clock.getElapsedTime();
    groupRefs.forEach((ref)=>{
        if(!ref.current) return;
        const ref1 = (ref.current.children[0] as THREE.Points).material as THREE.ShaderMaterial;
        ref1.uniforms.uTime.value = time; //scene 시간으로 프레임마다 업데이트
    });
  });

  //animation
  const animateParticle = (index:number) => {
    if(visible.includes(index)) return; //이미 보이는 애는 return
    setVisible((prev) => [...prev, index]); 

    requestAnimationFrame(()=>{
      setTimeout(()=>{    
        const ref = groupRefs[index];
        if (!ref.current) return;
    
        const mat = (ref.current.children[0] as THREE.Points).material as THREE.ShaderMaterial;
        if(!mat.uniforms) return; 

        const distortionValue = { value : 0. }; //distortion 초기값 세팅
        const bloomValue = { value : 0. }; //bloom 초기값 세팅
        //console.log('currIndex : ',currIndex);
        //gsap:alpha
        gsap.fromTo(mat.uniforms.uAlpha,
          {value:0.},
          {value:1.,duration:2.5,delay:0.,ease:'power4.out',
              onComplete:()=>{
                  gsap.to(mat.uniforms.uAlpha,
                      {value:0,duration:1.2,delay:0.,ease:'power4.in'}
                  );
              }
          }
        );
        //gsap- distortion
        gsap.fromTo(distortionValue,
          //alpha 먼저 바뀌rp delat .2초
          {value:0.},
          {value:1.,duration:2.5,delay:.2,ease:'circ.out',
              onUpdate:()=>{
                mat.uniforms.uDistortion.value = distortionValue.value;
              },
              onComplete:()=>{
                  gsap.to(distortionValue,
                      {value:0.,duration:1.2,delay:0.,ease:'circ.in',
                        onUpdate:()=>{
                          mat.uniforms.uDistortion.value = distortionValue.value;
                        },
                        onComplete:()=>{
                          setVisible((prev)=> prev.filter((i)=> i !== index)); 
                        }
                      }
                  );
              }
          }
        );
        //gsap- bloom
        gsap.fromTo(bloomValue,
          {value:0.},
          {value:2.8,duration:2.5,delay:0.,ease:'power1',
            onUpdate:()=>{
              setBloomStrength(bloomValue.value); //bloom 강도 업데이트
            },
            onComplete:()=>{
              gsap.to(bloomValue,
                {value:0.,duration:1.2,delay:0.,ease:'power1',
                  onUpdate:()=>{
                    setBloomStrength(bloomValue.value);
                  }
                }
              );
            }
          },
        );
      },0);//비동기 처리
    }); //requestAnimationFrame을 통해서 애니메이션이 시작되도록 함
  }

  useEffect(()=>{
    if(active === null) return;
    if(active === 'all'){
      [0,1,2].forEach((i, index)=>{
        gsap.delayedCall(index*3.7,()=>{
          animateParticle(i);
        });
      });
    } else {
      animateParticle(active);
    }
    console.log('active : ',active);
  },[active]);

  return(
    <>
      {visible.includes(0) && (
        <ExpandingParticle ref={gRef1} texture={tt1}/>
      )}
      
      {visible.includes(1) && (
        <ExpandingParticle ref={gRef2} texture={tt2}/>
      )}
      
      {visible.includes(2) && (
        <ExpandingParticle ref={gRef3} texture={tt3}/>
      )}

      <EffectComposer>
        <Bloom  // glow effect
          luminanceThreshold={.1} // bloom이 시작되는 밝기
          luminanceSmoothing={.9} // bloom이 시작된 후 얼마나 부드럽게 퍼질지
          intensity={bloomStrength} // bloom의 강도
          blendFunction={BlendFunction.SCREEN} //add:덧셈블렌딩, screen:smooth투명,광효과블렌딩, Multiply:어둡게곱하기블렌딩, softlight:부드러운빛블렌딩
          kernelSize={2} // bloom의 크기
        />
      </EffectComposer>
    </>
  )
}

const Scene = ({active}:{active: number|'all'|null}) => {
  return (
    <Canvas camera={{position:[0,0,600],fov:70}}>
      <ambientLight intensity={0.5} />
      <MainAnimation active={active}/>
    </Canvas>
  )
}

interface OverlayProps {
  onClick: (index: number|'all') => void;
}
const Overlay = ({onClick}:OverlayProps) => {
  return (
    <div className="overlay">
      <header>header</header>
      <main>
        <div className="button group">
          <button onClick={()=>onClick(0)}>Texture1</button>
          <button onClick={()=>onClick(1)}>Texture2</button>
          <button onClick={()=>onClick(2)}>Texture3</button>
          <button onClick={()=>onClick('all')}>ALL</button>
        </div>
      </main>
      <footer>footer</footer>
    </div>
  )
}

const Demo1 = () => {

  const [active, setActive] = useState<number|'all'|null>(null);

    //texture preload
    useLoader.preload(THREE.TextureLoader, '1_1.jpg');
    useLoader.preload(THREE.TextureLoader, '2_1.jpg');
    useLoader.preload(THREE.TextureLoader, '3_1.jpg');

  return (
    <div className="container">
      <Overlay onClick={(i)=> setActive(i)}/>
      <Scene active={active}/>
    </div>
  )
}

export default Demo1