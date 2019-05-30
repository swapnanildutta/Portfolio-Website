import React, { useEffect, useRef, useContext } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import {
  WebGLRenderer, PerspectiveCamera, Scene, DirectionalLight, AmbientLight, Fog,
  Mesh, Color, InstancedBufferGeometry, BufferAttribute, InstancedBufferAttribute,
  Vector4, RawShaderMaterial, DoubleSide, Clock
} from 'three';
import { AppContext } from '../app/App';
import { usePrefersReducedMotion } from '../utils/Hooks';

function RoboticsScene() {
  const { currentTheme } = useContext(AppContext);
  const width = useRef(window.innerWidth);
  const height = useRef(window.innerHeight);
  const container = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();
  const SceneRoot = useRef(function() {
    function defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        let descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }());

  useEffect(() => {
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Class already exists.");
      }
    }

    const gwGreen = {
      mainColor: 0x8eb934,
      mainEmissive: 0,
      secondaryColor: 0xfec23e,
      secondaryEmissive: 0,
      detailColor: 0xfec23e,
      detailEmissive: 0
    };

    const gwOrange = {
      mainColor: 0xfec23e,
      mainEmissive: 0,
      secondaryColor: 0x8eb934,
      secondaryEmissive: 0,
      detailColor: 0x8eb934,
      detailEmissive: 0
    };

    const ParticleSystem = function() {
      function ParticleSystem() {
        _classCallCheck(this, ParticleSystem);
        this.time = 0.0;
        const triangles = 1;
        const instances = 2000;
        const geometry = new InstancedBufferGeometry();

        const vertices = new BufferAttribute(new Float32Array(triangles * 3 * 3), 3);
        const unit = 0.055;
        vertices.setXYZ(0, unit, -unit, 0);
        vertices.setXYZ(1, -unit, unit, 0);
        vertices.setXYZ(2, 0, 0, unit);
        geometry.addAttribute('position', vertices);

        const offsets = new InstancedBufferAttribute(new Float32Array(instances * 3), 3, false, 1);
        const dist = 60;
        for (let i = 0, ul = offsets.count; i < ul; i++) {
          offsets.setXYZ(i, (Math.random() - 0.5) * dist, (Math.random() - 0.5) * dist, (Math.random() - 0.5) * dist);
        }
        geometry.addAttribute('offset', offsets);

        const colors = new InstancedBufferAttribute(new Float32Array(instances * 4), 4, false, 1);

        const threeColor = new Color();
        let count = 1;
        for (let _i = 0, _ul = colors.count; _i < _ul; _i++) {
          if (count === 1) {
            var c = threeColor.setHex(gwGreen.mainColor);
            colors.setXYZW(_i, c.r, c.g, c.b, 1);
            count = 0;
          } else {
            c = threeColor.setHex(gwOrange.mainColor);
            colors.setXYZW(_i, c.r, c.g, c.b, 1);
            count = 1;
          }

        }
        geometry.addAttribute('color', colors);

        const timeOffsets = new InstancedBufferAttribute(new Float32Array(instances * 1), 1, false, 1);

        for (let _i2 = 0, _ul2 = timeOffsets.count; _i2 < _ul2; _i2++) {
          timeOffsets.setX(_i2, Math.random());
        }
        geometry.addAttribute('timeOffset', timeOffsets);

        const vector = new Vector4();
        const orientationsStart = new InstancedBufferAttribute(new Float32Array(instances * 4), 4, false, 1);
        for (let _i3 = 0, _ul3 = orientationsStart.count; _i3 < _ul3; _i3++) {
          vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
          vector.normalize();
          orientationsStart.setXYZW(_i3, vector.x, vector.y, vector.z, vector.w);
        }
        geometry.addAttribute('orientationStart', orientationsStart);

        const orientationsEnd = new InstancedBufferAttribute(new Float32Array(instances * 4), 4, false, 1);
        for (let _i4 = 0, _ul4 = orientationsEnd.count; _i4 < _ul4; _i4++) {
          vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
          vector.normalize();
          orientationsEnd.setXYZW(_i4, vector.x, vector.y, vector.z, vector.w);
        }
        geometry.addAttribute('orientationEnd', orientationsEnd);

        const material = new RawShaderMaterial({
          uniforms: {
            time: {
              value: 5.0
            },
            sineTime: {
              value: 5.0
            }
          },
          vertexShader: '\n        precision highp float;\n        uniform float time;\n        uniform mat4 modelViewMatrix;\n        uniform mat4 projectionMatrix;\n        attribute vec3 position;\n        attribute vec3 offset;\n        attribute vec4 color;\n        attribute vec4 orientationStart;\n        attribute vec4 orientationEnd;\n        attribute float timeOffset;\n        varying vec4 vColor;\n        varying float lifeProgress;\n\n        void main(){\n\n          vec3 vPosition = offset;\n\n          lifeProgress = mod(time+timeOffset,1.0);\n\n          vPosition = offset * lifeProgress + position;\n          vec4 orientation = normalize(mix(orientationStart, orientationEnd, lifeProgress));\n          vec3 vcV = cross(orientation.xyz, vPosition);\n          //orientation.w *= time*5.0;\n          vPosition = vcV * (2.0 * orientation.w) + (cross(orientation.xyz, vcV) * 2.0 + vPosition);\n          vColor = color;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );\n        }\n        ',
          fragmentShader: '\n      precision highp float;\n      uniform float time;\n      varying vec4 vColor;\n      varying float lifeProgress;\n\n      void main() {\n        float depth = gl_FragCoord.z / gl_FragCoord.w / 5.0;\n        float opacity = clamp(0.2, 1.0, depth);\n        vec4 color = vColor;\n        color.a = sin(lifeProgress*100.0)*opacity;\n        gl_FragColor = color;\n      }\n      ',
          side: DoubleSide,
          transparent: true
        });

        const mesh = new Mesh(geometry, material);
        mesh.frustumCulled = false;
        this.mesh = mesh;
      }
      SceneRoot.current(ParticleSystem, [{
        key: 'update',
        value: function update(
          dt) {
          this.time += 0.0001;
          this.mesh.material.uniforms.time.value = Math.sin(this.time);
        }
      }]);
      return ParticleSystem;
    }();

    const scene = new Scene();

    scene.fog = new Fog(0xfec23e, 2, 10);

    const camera = new PerspectiveCamera(60, width.current / height.current, 0.1, 60);

    const renderer = new WebGLRenderer({
      alpha: false,
      antialias: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(currentTheme.colorBackground, 1);
    renderer.setSize(width.current, height.current);
    container.current.appendChild(renderer.domElement);

    function handleWindowResize() {
      renderer.setSize(width.current, height.current);
      camera.aspect = width.current / height.current;
      camera.updateProjectionMatrix();
    }

    const render = function render() {
      if (prefersReducedMotion) return;
      const delta = clock.getDelta();
      particles.update(delta);
      renderer.render(scene, camera);
      window.requestAnimationFrame(render);
    };

    if (!prefersReducedMotion) {
      window.addEventListener('resize', handleWindowResize, false);
    }

    const ambientLight = new AmbientLight(currentTheme.colorPrimary, 1.0);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xeeeeee);
    directionalLight.position.set(-1, -1, -1);
    directionalLight.position.normalize();
    scene.add(directionalLight);

    camera.position.y = 1.7;
    camera.position.z = 0.5;

    const particles = new ParticleSystem();
    particles.mesh.position.y = 4;
    scene.add(particles.mesh);

    const clock = new Clock();
    render();
  }, [currentTheme, prefersReducedMotion]);

  return (
    <RoboticsContainer ref={container} aria-hidden />
  );
}

const AnimBackgroundFade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const RoboticsContainer = styled.div`
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

export default React.memo(RoboticsScene);
