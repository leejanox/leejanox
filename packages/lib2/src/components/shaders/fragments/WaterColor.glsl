varying vec2 vUv;
varying vec3 vPosition;

uniform vec2 uResolution; // 화면 해상도 :vec4
uniform sampler2D uTexture; // diffuse texture
uniform float uSize; // effect size
uniform vec2 uMouse; // time

void main() {
    //vec2 newUV = vUv + vec2(0.5); // 현재 UV 좌표에서 각 축에 대해 UV 좌표를 0.5만큼 조정
    //gl_FragColor = vec4(newUV, 0., 1.); // vUv를 색으로 사용

    vec4 prevColor = texture2D(uTexture, vUv); // diffuse texture에서 현재 UV 좌표에 해당하는 색을 가져옴
    float dist = distance(vPosition, vec3(uMouse,.0)); // 현재 uv좌표와와 마우스 위치 간의 거리 계산
    float size = smoothstep(uSize,.0 , dist); // 거리와 uSize를 사용하여 부드러운 경계의 크기를 계산
    vec3 newColor = mix(prevColor.rgb, vec3(1.0, 0.0, 0.5), size); // 현재 색과 새로운 색을 혼합
    gl_FragColor = vec4(newColor.rgb, 1.); // 혼합된 색을 최종 색으로 설정
}