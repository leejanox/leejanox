varying vec2 vUv;

void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.); // local좌표를 camera 기준 좌표로 변환
    gl_Position = projectionMatrix * mvPosition; // camera 기준 좌표를 clip 좌표로 변환
}