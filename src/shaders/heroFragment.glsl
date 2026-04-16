// Smooth noise-based gradient that reacts to cursor position
// Creates organic, slowly shifting color fields

uniform float uTime;
uniform vec2 uMouse;    // normalized cursor position (0-1)
uniform vec2 uResolution;
uniform vec3 uColorA;   // deep dark blue
uniform vec3 uColorB;   // accent blue
uniform vec3 uColorC;   // subtle purple

// Simplex noise functions
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,   // (3.0-sqrt(3.0))/6.0
    0.366025403784439,   // 0.5*(sqrt(3.0)-1.0)
    -0.577350269189626,  // -1.0 + 2.0 * C.x
    0.024390243902439    // 1.0 / 41.0
  );
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Cursor influence — subtle displacement of noise coordinates
  vec2 mouseInfluence = (uMouse - 0.5) * 0.3;

  // Multiple noise layers at different scales and speeds
  float n1 = snoise(uv * 2.0 + uTime * 0.05 + mouseInfluence);
  float n2 = snoise(uv * 4.0 - uTime * 0.03 + mouseInfluence * 0.5);
  float n3 = snoise(uv * 1.5 + uTime * 0.02);

  // Combine noise layers
  float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

  // Map noise to color mix
  float mixA = smoothstep(-0.5, 0.5, noise);
  float mixB = smoothstep(0.0, 1.0, n2 + 0.3);

  // Blend three colors based on noise
  vec3 color = mix(uColorA, uColorB, mixA * 0.4);
  color = mix(color, uColorC, mixB * 0.15);

  // Subtle vignette — darken edges
  float vignette = 1.0 - smoothstep(0.3, 0.9, length(uv - 0.5));
  color *= 0.85 + vignette * 0.15;

  gl_FragColor = vec4(color, 1.0);
}
