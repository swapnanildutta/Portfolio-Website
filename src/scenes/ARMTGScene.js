import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { Texture, Application, WebGLRenderer, Container, Sprite } from 'pixi.js';
import { usePrefersReducedMotion } from '../utils/hooks';

function ARMTGScene() {
  const container = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const media = ["data:image/png;base64,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"].map(m => Texture.from(m));

    class Icosaedro {
      constructor() {
        this.progress = 0;
        this.scene = null;
        this.sprite = null;
        this.app = null;
        this.bunny = null;
        this.interval = null;
        this.particles = [];
        this.init();
      }

      init() {
        clearInterval(this.interval);
        this.particles = [];

        this.app = new Application(window.innerWidth, window.innerHeight, {
          antialias: true,
          transparent: true
        });

        if (!this.app.renderer instanceof WebGLRenderer) {
          this.app.renderer.context.mozImageSmoothingEnabled = false;
          this.app.renderer.context.webkitImageSmoothingEnabled = false;
        }

        container.current.appendChild(this.app.view);
        const scene = new Container();
        this.app.stage.addChild(scene);
        this.app.view.style['transform'] = 'translatez(0)';
        this.interval = setInterval(function() {
          if (this.cleanup) {
            return this.particles = [];
          }
          this.particles.push(
            new Particle(this.app, scene, {
              speed: 1 + Math.random() * 4,
              media: this.progress % 20 === 1 ? 2 : 0
            }));
          this.progress++;
        }.bind(this), 20);
      }

      update() {
        if(!prefersReducedMotion) {
          this.particles = this.particles.filter(function(p) {
            return p.move();
          });
          this.animation = requestAnimationFrame(this.update.bind(this));
        }
      }

      resize() {
        container.current.innerHTML = '';
        this.init();
      }
    }

    class Particle {
      constructor(app, scene, options) {
        this.app = app;
        this.scene = scene;
        this.destroy = icosaedro.cleanup || false;
        this.a = [0.5, 1, 1.5][Math.round(Math.random() * 2)];
        this.steps = window.innerWidth / 5;
        this.scale = 0.5 * Math.random();
        this.rotation = [0.02, 0.04, 0.06, 0.08][Math.round(Math.random() * 3)];
        this.siner = 300 * Math.random();
        this.speed = options.speed;
        this.progress = 0;
        this.texture = new Sprite(media[0]);
        this.texture.tint = [0.344, 0.4346, 0.7444, 0.992222][Math.round(Math.random() * 3)] * 0xFFFFFF;
        this.texture.cacheAsBitmap = true;
        this.texture.anchor.set(0.5);

        this.behaviours();
        this.render();
        this.move();
      }

      behaviours() {
        window.addEventListener('resize', function() {
          this.destroy = true;
        }.bind(this));
      }

      render() {
        this.scene.addChild(this.texture);
      }

      move() {
        let x = this.progress;
        let y = this.app.renderer.height / 6 + this.siner + this.a * Math.sin(this.progress / this.steps) * 130;

        this.texture.x = -50 + x;
        this.texture.y = y;
        this.texture.scale.x = this.scale;
        this.texture.scale.y = this.scale;
        this.texture.rotation += this.rotation;
        this.progress = this.progress + this.speed;

        if (x > this.app.renderer.width + 100 || this.destroy === true) {
          this.scene.removeChild(this.texture);
          return false;
        } else {
          return true;
        }
      }

      radians(degrees) {
        return degrees * Math.PI / 180;
      }
    }

    function debounce(func, wait, immediate) {
      let timeout;
      return () => {
        const context = this,
          args = arguments;
        const later = () => {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    const icosaedro = new Icosaedro();
    icosaedro.update();

    const onResize = debounce(() => {
      icosaedro.resize();
    }, 200);

    window.addEventListener('resize', onResize);

    return function cleanup() {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(icosaedro.animation);
      icosaedro.cleanup = true;
    };
  }, [prefersReducedMotion]);

  return (
    <ARMTGContainer ref={container} aria-hidden />
  );
}

const AnimBackgroundFade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 0.6; }
`;

const ARMTGContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition-property: background;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 1s;
  background: rgba(8, 9, 38, ${props => props.theme.id === 'dark' ? 1 : 0});

  canvas {
    position: absolute;
    animation-duration: 3s;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};
    animation-fill-mode: forwards;
    opacity: 0;
    animation-name: ${AnimBackgroundFade};
  }
`;

export default React.memo(ARMTGScene);
