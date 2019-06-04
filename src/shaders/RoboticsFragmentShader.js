export default`
  precision highp float;
  uniform float time;
  varying vec4 vColor;
  varying float lifeProgress;
  void main() {
    float depth = gl_FragCoord.z / gl_FragCoord.w / 5.0;
    float opacity = clamp(0.2, 1.0, depth);
    vec4 color = vColor;
    color.a = sin(lifeProgress * 100.0) * opacity;
    gl_FragColor = color;
  }
`;
