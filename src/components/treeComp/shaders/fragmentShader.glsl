// shaders/fragmentShader.glsl

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}

