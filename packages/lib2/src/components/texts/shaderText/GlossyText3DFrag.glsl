precision highp float;

varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform vec3 uColor;
uniform float uAlpha;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);

    // fresnel -> 카메라 기준 가장자리 부분 밝기
    float fresnel = pow(1.0 - dot(viewDir, normal), 2.);


    vec3 baseColor = uColor;
    vec3 lightColor = vec3(1.0); // 하얀 반짝임

    vec3 finalColor = mix(baseColor, lightColor, fresnel * 0.7);
    //가장자리도 더 투명하게?
    float edgeAlpha = mix(1.,.0,fresnel * .4);

    gl_FragColor = vec4(finalColor, edgeAlpha* uAlpha);
}


// // GlossyText3D.frag.glsl
// precision highp float;

// varying vec3 vPos;

// uniform float uTime;
// uniform float uAlpha;
// uniform vec3 uColor;

// void main() {
//     vec2 normXY = vPos.xy * 0.5 + 0.5; // [-1,1] → [0,1]
//     float dist = distance(normXY, vec2(0.5));
//     float fresnel = pow(1.0 - dist, 3.0);
//     float highlight = smoothstep(0.3, 0.0, dist);
//     highlight = pow(highlight, 2.0);

//     vec3 baseColor = uColor;
//     vec3 glossy = baseColor + vec3(1.0) * highlight * 0.6;
//     vec3 fresnelEdge = vec3(1.0) * fresnel * 0.4;

//     vec3 finalColor = mix(glossy, fresnelEdge + glossy, fresnel);
//     gl_FragColor = vec4(finalColor, uAlpha);
// }
