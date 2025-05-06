varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform sampler2D uTexture;
uniform float uAlpha;

void main() {
    //vec2 newUv = vUv;
    //vec2 newUv = vPosition.xy/vec2(240.,480.)+vec2(.6); // 현재 UV 좌표에서 각 축에 대해 UV 좌표를 0.5만큼 조정
    //gl_FragColor = vec4(newUv, 0., 1.); // vUv를 색으로 사용
    vec4 tt = texture2D(uTexture, vUv);
    gl_FragColor = vec4(tt.rgb, tt.a * uAlpha); //alpha crossfade
    if(gl_FragColor.r <.1 && gl_FragColor.g < 0.1 && gl_FragColor.b < 0.1) discard;
}