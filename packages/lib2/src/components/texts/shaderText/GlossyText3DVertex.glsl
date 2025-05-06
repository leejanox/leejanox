varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

    gl_Position = projectionMatrix * viewMatrix * vec4(vWorldPosition, 1.0);
}


// //varying vec2 vUv;
// varying vec3 vPos; //local vertex

// uniform float uTime;
// uniform float uAlpha;

// //float PI = 3.14159265359;

// void main() {
//     //vUv = uv;
//     vPos = position;

//     vec4 mvPosition = modelViewMatrix * vec4(position, 1.); //local좌표를 camera 기준 좌표로 변환
//     gl_Position = projectionMatrix * mvPosition; //camera 기준 좌표를 clip 좌표로 변환
// }