precision highp float;

uniform sampler2D uPositions;
uniform float uTime;

varying vec2 vUv;

void main() {
    //기본
    // // 현재 위치값 가져오기
    vec4 pos = texture2D(uPositions, vUv);
    gl_FragColor = vec4(vUv, 0.0, 1.0); // 색상은 uv좌표로 설정

    // float r = sin(uTime) * 0.5 + 0.5; // sin함수는 [-1,1] 범위이므로 [0,1]로 보정
    // float g = sin(uTime)  * 0.5 + 0.5; // sin함수는 [-1,1] 범위이므로 [0,1]로 보정
    // float b = sin(uTime) * 0.5 + 0.5; // sin함수는 [-1,1] 범위이므로 [0,1]로 보정
    // float a = 1.0; // alpha값은 1로 고정

    // // // 시각화를 위해 [-1,1] → [0,1] 보정
    // // vec2 color = pos.xy * 0.5 + 0.5;
    // // gl_FragColor = vec4(color, 0.0, 1.0);
    // gl_FragColor = vec4(r, g, b, a);

    // //위치, 시간 기반
    // vec4 pos = texture2D(uPositions, vUv);
    // vec2 color = pos.xy * 0.5 + 0.5;

    // gl_FragColor = vec4(color.x, color.y * sin(uTime), 0.5, 1.0);

}
