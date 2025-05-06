import React from 'react'
import * as THREE from 'three'
import { Line, MeshReflectorMaterial } from '@react-three/drei'

const pi = Math.PI

// const points = [ //커브 포인트
//   new THREE.Vector3(0.2,0,-4),
//   new THREE.Vector3(-1,0,-3),
//   new THREE.Vector3(-1.5,0,-1.8),
//   new THREE.Vector3(-1.6,0,-0.5),
//   new THREE.Vector3(-1,0,0.8),
//   new THREE.Vector3(0.5,0,1.3),
// ]

type TrackProps = {
  points?: THREE.Vector3[]; //커브 포인트
  trackColor?: string; //트랙 색상
}
const Track = ({points,trackColor}:TrackProps) => {

  //트랙 재질 설정
  const matConfig = {
    mirror:1.,
    color: '#fff',
    roughness: .2,
    metalness: .85,
    side: THREE.DoubleSide,
    //나머지 설정들은 별로 상관 없을듯
  }

  //커브 설정
  //catmulRomCurve3 -> centripetal: 지나친 튕김,진동 방지 , 0.5: 곡률 조정, closed: true -> 시작점과 끝점 연결
  // const curve = new THREE.CatmullRomCurve3(points, true,'centripetal', 0.5); //곡선 설정
  // const curvePoints = curve.getPoints(50); //곡선 포인트 설정
  //큐빅 베지어 커브도 생성 가능
  const curve2 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(2, 0, -15), // 시작점
    new THREE.Vector3(-20, 0, -2), // 제어점1
    new THREE.Vector3(10, 0, ), // 제어점2
    new THREE.Vector3(-1, 0, 1) // 끝점
  );
  const curvePoints2 = curve2.getPoints(50); //곡선 포인트 설정

  return (
    <group>
      <mesh receiveShadow rotation-x={-pi/2}>
        <planeGeometry args={[100,100]}/>
        <MeshReflectorMaterial {...matConfig}/>
      </mesh>
      {trackColor && <Line points={points??curvePoints2} color={trackColor} lineWidth={2} dashed={false}/>}
    </group>
  )
}

export default Track