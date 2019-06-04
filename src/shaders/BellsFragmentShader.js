export default`
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform sampler2D u_noise;

  vec2 hash2(vec2 p) {
    vec2 o = texture2D(u_noise, (p + 0.5) / 256.0, -100.0).xy;
    return o;
  }

  const int octaves = 5;

  float sinnoise(vec3 loc) {

    float t = u_time;
    vec3 p = loc;

    for (int i = 0; i < octaves; i++) {
      p += cos(p.yxz * 3. + vec3(0., t, 1.6)) / 3.;
      p += sin(p.yxz + t + vec3(t, 1.6, 0.)) / 2.;
      p *= 1.3;
    }

    p += fract(sin(p + vec3(13, 7, 3)) * 5e5) * .03 - .015;

    return length(p);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    float shade = sinnoise(vec3(uv * 5., 1.));
    shade = sin(shade) * .3 + .6;

    gl_FragColor = vec4(vec3(shade), 1.0);
  }
`;
