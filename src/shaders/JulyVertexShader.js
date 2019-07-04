export default`
  precision mediump float;
  attribute vec3 position;
  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;
  uniform float size;
  attribute float adjustSize;
  uniform vec3 cameraPosition;
  varying float distanceCamera;
  attribute vec3 velocity;
  attribute vec4 color;
  varying vec4 vColor;
  void main() {
      vColor = color;
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * adjustSize * (100.0 / length(modelViewPosition.xyz));
      gl_Position = projectionMatrix * modelViewPosition;
  }
`;
