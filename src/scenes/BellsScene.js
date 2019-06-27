import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import {
  Camera, Scene, PlaneBufferGeometry, Vector2, ShaderMaterial, Mesh, WebGLRenderer
} from 'three';
import VertShader from '../shaders/BellsVertexShader';
import FragmentShader from '../shaders/BellsFragmentShader';
import { usePrefersReducedMotion } from '../utils/hooks';

function BellsScene() {
  const container = useRef();
  const camera = useRef();
  const scene = useRef();
  const renderer = useRef();
  const mesh = useRef();
  const uniforms = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const containerRef = container.current;

    const init = () => {
      camera.current = new Camera();
      camera.current.position.z = 1;

      scene.current = new Scene();

      const geometry = new PlaneBufferGeometry(2, 2);

      uniforms.current = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new Vector2() },
        u_mouse: { type: "v2", value: new Vector2() }
      };

      const material = new ShaderMaterial({
        uniforms: uniforms.current,
        vertexShader: VertShader,
        fragmentShader: FragmentShader
      });
      material.extensions.derivatives = true;

      mesh.current = new Mesh(geometry, material);
      scene.current.add(mesh.current);

      renderer.current = new WebGLRenderer();
      renderer.current.setPixelRatio(window.devicePixelRatio);

      container.current.appendChild(renderer.current.domElement);
    };

    init();

    return function cleanup() {
      scene.current.remove(mesh.current);
      mesh.current.geometry.dispose();
      mesh.current.material.dispose();
      mesh.current = null;
      renderer.current.dispose();
      renderer.current.forceContextLoss();
      scene.current.dispose();
      camera.current = null;
      uniforms.current = null;
      renderer.current.context = null;
      renderer.current.domElement = null;
      containerRef.innerHTML = '';
    };
  });

  useEffect(() => {
    const onWindowResize = () => {
      renderer.current.setSize(window.innerWidth, window.innerHeight);
      uniforms.current.u_resolution.value.x = renderer.current.domElement.width;
      uniforms.current.u_resolution.value.y = renderer.current.domElement.height;
    };

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    return function cleanup() {
      window.removeEventListener('resize', onWindowResize, false);
    };
  });

  useEffect(() => {
    let animation;

    const animate = () => {
      animation = requestAnimationFrame(animate);
      uniforms.current.u_time.value += 0.01;
      renderer.current.render(scene.current, camera.current);
    };

    if(!prefersReducedMotion) {
      animate();
    }

    return function cleanup() {
      cancelAnimationFrame(animation);
    };
  }, [prefersReducedMotion]);

  return (
    <BellsContainer ref={container} aria-hidden />
  );
}

const AnimBackgroundFade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 0.4; }
`;

const BellsContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  canvas {
    position: absolute;
    animation-duration: 3s;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};
    animation-fill-mode: forwards;
    opacity: 0;
    animation-name: ${AnimBackgroundFade};
  }
`;

export default React.memo(BellsScene);
