import '../styles/demo3.scss'
import ReactPlayer from 'react-player'
import gsap from 'gsap'
import { CustomEase } from 'gsap/all'
import { useEffect } from 'react'
//CustiomEase 플러그인 등록
gsap.registerPlugin(CustomEase)
function LoadingContent(){

        
    //"M0,0 C0.126,0.382 0.328,1.036 1,1" 
    //"M0,0" -> 시작점 (0,0) = Move to 0,0
    //"C0.126,0.382 0.328,1.036 1,1" -> 곡선의 제어점 (0.126,0.382) (0.328,1.036)와 끝점 (1,1) = Curve to
    const customEase = CustomEase.create('myEase','.87,0,.13,1') //cubic-bezier(x1=첫 제어점 x좌표(시간), y1=첫 제어점 y좌표(진행률), x2=두 번째 제어점 x좌표, y2=두 번째 제어점 y좌표) 형태 -> customEase가 자동으로 해석해서 곡선으로 만듦
    // 시작하자마자 빠르게 튀고 -> 중간 빠르게 지나감 -> 끝에 가서 느리게 멈춤
    const progressCounter = document.getElementById('counter')

    useEffect(()=>{
        gsap.set('.video-container',{
            scale:0,
            rotation:-20,
        })
    
        gsap.to('.hero',{
            clipPath:'polygon(0% 45%, 25% 45%, 25% 55% , 0% 55%)',
            duration:1.5,
            ease:customEase,
            delay:1
        })
    
        gsap.to('.hero',{
            clipPath:'polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)',
            duration:2,
            ease:customEase,
            delay:3,
    
            onStart:()=>{
                gsap.to('.progress-bar',{
                    width:'100vw',
                    duration:2,
                    ease:customEase,
                });
                gsap.to(progressCounter,{
                    innerHTML:100,
                    duration:2,
                    ease:customEase,
                    snap: {innerHTML:1},
                });
            }
        })
    
        gsap.to('.hero',{
            clipPath:'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration:1,
            ease:customEase,
            delay:5,
    
            onStart:() => {
                gsap.to('.video-container',{
                    scale:1,
                    rotation:0,
                    clipPath:'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    duration:1.25,
                    ease:customEase,
                });
    
                gsap.to('.progress-bar',{
                    opacity:0,
                    duration:0.3,
                });
    
                gsap.to('.logo',{
                    left:'0%',
                    transform:'translate(0%)',
                    duration:1.25,
                    ease:customEase,
    
                    onStart:() =>{
                        gsap.to('.char.anim-out h1',{
                            y:'100%',
                            duration:1,
                            stagger:-0.075,
                            ease:customEase,
                        });
    
                        gsap.to('.char.anim-in h1',{
                            x:'-1200%',
                            duration:1,
                            ease:customEase,
                            delay:0.25,
                        });
                    }
                })
            }
        });
    
        gsap.to(['.title span','.coordinates span'],{
            y:'0%',
            duration:1,
            stagger:0.125,
            ease:'power3.Out',
            delay:5.75,
        })
    },[]);




    return(
        <>
            <div className="hero">
                <div className="progress-bar">
                    <p>loading</p>
                    <p>/<span id='counter'>0</span></p>
                </div>
            </div>
            <div className="video-container">
                <ReactPlayer
                    url='https://youtu.be/q-JBZfgpF4M?si=YzugvsBwnllTDuhX'
                    controls={false} //기본 컨트롤러 숨기기
                    playing={true} //자동재생
                    loop={true} //반복재생
                    muted={true} //음소거
                    width='100vw' //너비 100%
                    height='100vh' //높이 100%
                />
            </div>

            <nav>
                <p>&#9679;</p>
                <p>&#9679;</p>
            </nav>

            <footer>
                <p>hi</p>
                <p>my</p>
                <p>name</p>
                <p>is</p>
                <p>janox</p>
            </footer>

            <div className="title">
                <h1>.............</h1>
                <h1>...............</h1>
                <h1>.............</h1>
                <p><span>( .........)</span></p>
            </div>

            <div className="coordinates">
                <p><span>leeeeeee</span></p>
                <p><span>janoxxxx</span></p>
            </div>

            <div className="logo">
                <div className="cahr"><h1>l</h1></div>
                <div className="cahr anim-out"><h1>e</h1></div>
                <div className="cahr anim-out"><h1>e</h1></div>
                <div className="cahr anim-out"><h1>j</h1></div>
                <div className="cahr anim-out"><h1>a</h1></div>
                <div className="cahr anim-out"><h1>n</h1></div>
                <div className="cahr anim-out"><h1>o</h1></div>
                <div className="cahr anim-in"><h1>x</h1></div>
            </div>
        </>
    )
}

const Demo3 = () => {
  return (
    <div className='container'>
        <LoadingContent/>
    </div>
  )
}

export default Demo3