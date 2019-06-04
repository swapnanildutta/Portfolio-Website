import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import {
  TextureLoader, RepeatWrapping, LinearFilter, Camera, Scene, PlaneBufferGeometry,
  Vector2, ShaderMaterial, Mesh, WebGLRenderer
} from 'three';
import VertShader from '../shaders/BellsVertexShader';
import FragmentShader from '../shaders/BellsFragmentShader';
import Noise from '../assets/BellsGC/noise.png';
import { usePrefersReducedMotion } from '../utils/Hooks';

function BellsScene() {
  const container = useRef();
  const camera = useRef();
  const scene = useRef();
  const renderer = useRef();
  const uniforms = useRef();
  const texture = useRef();
  const init = useRef();
  const onWindowResize = useRef();
  const animate = useRef();
  const render = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(Noise, ((tex) => {
      texture.current = tex;
      texture.current.wrapS = RepeatWrapping;
      texture.current.wrapT = RepeatWrapping;
      texture.current.minFilter = LinearFilter;
      init.current();
      animate.current();
    }));
  });

  useEffect(() => {
    init.current = () => {
      camera.current = new Camera();
      camera.current.position.z = 1;

      scene.current = new Scene();

      const geometry = new PlaneBufferGeometry(2, 2);

      uniforms.current = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new Vector2() },
        u_noise: { type: "t", value: texture.current },
        u_mouse: { type: "v2", value: new Vector2() }
      };

      const material = new ShaderMaterial({
        uniforms: uniforms.current,
        vertexShader: VertShader,
        fragmentShader: FragmentShader
      });
      material.extensions.derivatives = true;

      const mesh = new Mesh(geometry, material);
      scene.current.add(mesh);

      renderer.current = new WebGLRenderer();
      renderer.current.setPixelRatio(window.devicePixelRatio);

      container.current.appendChild(renderer.current.domElement);

      onWindowResize.current();
      window.addEventListener('resize', onWindowResize.current, false);
    };
  });

  useEffect(() => {
    onWindowResize.current = (event) => {
      renderer.current.setSize(window.innerWidth, window.innerHeight);
      uniforms.current.u_resolution.value.x = renderer.current.domElement.width;
      uniforms.current.u_resolution.value.y = renderer.current.domElement.height;
    };
  });

  useEffect(() => {
    animate.current = () => {
      if(!prefersReducedMotion) {
        requestAnimationFrame(animate.current);
        render.current();
      }
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    render.current = () => {
      uniforms.current.u_time.value += 0.01;
      renderer.current.render(scene.current, camera.current);
    };
  });

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
