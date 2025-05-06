varying vec2 vUv;

void main() {
    vec2 newUV = vUv + vec2(0.1); // 현재 UV 좌표에서 각 축에 대해 UV 좌표를 0.5만큼 조정
    gl_FragColor = vec4(newUV, 0., 1.); // vUv를 색으로 사용
}