export default`
  precision highp float;
  uniform float time;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  attribute vec3 position;
  attribute vec3 offset;
  attribute vec4 color;
  attribute vec4 orientationStart;
  attribute vec4 orientationEnd;
  attribute float timeOffset;
  varying vec4 vColor;
  varying float lifeProgress;
  void main() {
    vec3 vPosition = offset;
    lifeProgress = mod(time + timeOffset, 1.0);
    vPosition = offset * lifeProgress + position;
    vec4 orientation = normalize(mix(orientationStart, orientationEnd, lifeProgress));
    vec3 vcV = cross(orientation.xyz, vPosition);
    orientation.w *= time*5.0;
    vPosition = vcV * (2.0 * orientation.w) + (cross(orientation.xyz, vcV) * 2.0 + vPosition);
    vColor = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
  }
`;
