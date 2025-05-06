import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { RoundedShape, RoundedGeometryProps } from '../geometries/RoundedGeometry'
import { LineSegments2 } from 'three-stdlib'
import { LineGeometry } from 'three-stdlib'
import { LineMaterial } from 'three-stdlib'
import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'

const LineMesh = ({ width, height, radius, segments }: RoundedGeometryProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const { size } = useThree()

  const { linewidth, color } = useControls('Line', {
    linewidth: { value: 2, min: 0., max: 2, step: 0.1 },
    color: '#000000',
  })

  useEffect(() => {
    if (!groupRef.current) return

    // 1. Rounded shape → extruded geometry
    const shape = RoundedShape({ width, height, radius, segments })
    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: false,
    }
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // 2. Edges → positions
    const edges = new THREE.EdgesGeometry(geometry)
    const positions: number[] = []
    const edgePos = edges.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < edgePos.count; i++) {
      positions.push(edgePos.getX(i), edgePos.getY(i), edgePos.getZ(i))
    }

    // 3. LineGeometry + LineMaterial + LineSegments2
    const lineGeometry = new LineGeometry()
    lineGeometry.setPositions(positions)

    const lineMaterial = new LineMaterial({
      color,
      linewidth,
      toneMapped: false,
    })

    const line = new LineSegments2(lineGeometry, lineMaterial)
    line.computeLineDistances()
    lineMaterial.resolution.set(size.width, size.height)

    // 4. 추가
    groupRef.current.clear() // 이전 라인 제거
    groupRef.current.add(line)
  }, [width, height, radius, segments, linewidth, color, size])

  return <group ref={groupRef} />
}

export default LineMesh
