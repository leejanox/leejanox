
const R3fClickHandler = () => {
  return (
    <>
      <mesh 
        name="clickable Sphere"
        onClick={(e) => {
          console.log('click', e.object.name, e.point);
          e.stopPropagation(); //이벤트 전파 방지
        }}
        onPointerOver={(e) => {
          e.object.scale.set(1.2, 1.2, 1.2); //scale up
          e.stopPropagation(); //이벤트 전파 방지
        }}
        onPointerOut={(e) => {
          e.object.scale.set(1, 1, 1); //scale down
          e.stopPropagation(); //이벤트 전파 방지
        }}
        onContextMenu={(e) => {
          console.log('right click', e.object.name, e.point);
          e.stopPropagation(); //이벤트 전파 방지
        }}
        onDoubleClick={(e) => {
          console.log('double click', e.object.name, e.point);
          e.stopPropagation(); //이벤트 전파 방지
        }}
      >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="orange" />
      </mesh>
    </>
  )
}

export default R3fClickHandler