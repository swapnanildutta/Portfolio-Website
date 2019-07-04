export default`
  precision mediump float;
  uniform sampler2D texture;
  varying vec4 vColor;
  void main() {
      vec4 color = vec4(texture2D(texture, gl_PointCoord));
      gl_FragColor = color * vColor;
  }
`;
