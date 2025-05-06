varying vec2 vUv;
varying vec3 vPosition; 

uniform vec2 uResolution; // 화면 해상도 :vec4
uniform sampler2D uTexture; // diffuse texture
uniform float uSize; // effect size
uniform vec2 uMouse; // time

void main() {
    vUv = uv;
    vPosition = position; // vertex의 위치를 vPosition에 저장
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.); // local좌표를 camera 기준 좌표로 변환
    gl_Position = projectionMatrix * mvPosition; // camera 기준 좌표를 clip 좌표로 변환
}