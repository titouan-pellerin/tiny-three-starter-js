uniform sampler2D uTexture1;
uniform float uTime;

varying vec2 vUv;

void main() {
    vec4 texture = texture2D(uTexture1, vUv);

    gl_FragColor = texture;
}