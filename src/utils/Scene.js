import React, { useEffect, useRef } from 'react';
import { WebGLRenderer, Scene } from 'three';

export default function Scenes() {
  const container = useRef();
  const animation = useRef();

  useEffect(() => {

    const animate = () => {
      animation.current = requestAnimationFrame(animate);
      const effects = () => { effects.current ? effects.current.actions() : return false };
      effects();
      renderer.current.render(scene.current, camera.current);
    };

    animate();

    return cleanup(() => {
      cancelAnimationFrame(animation.current);
    });
  }, []);
}
