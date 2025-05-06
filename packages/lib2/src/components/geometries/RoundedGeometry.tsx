import * as THREE from 'three';

export type RoundedGeometryProps = {
  width?: number;
  height?: number;
  radius?: number;
  segments?: number;
}

export const RoundedShape = ({width,height,radius,segments}:RoundedGeometryProps) => {
  if ( !width || !height || !radius || !segments) {
    width = 1; height = 1; radius = 0.2; segments = 12;
  }

  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  //const geometry = new THREE.ShapeGeometry(shape, segments);

  return shape
}

const RoundedGeometryMesh = ({width,height,radius,segments}:RoundedGeometryProps) => {
  if ( !width || !height || !radius || !segments) {
    width = 1; height = 1; radius = 0.2; segments = 12;
  }

  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geometry = new THREE.ShapeGeometry(shape, segments);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="skyblue" side={THREE.DoubleSide} />
    </mesh>
  )
}

export default RoundedGeometryMesh