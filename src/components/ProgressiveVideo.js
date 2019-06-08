import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import 'intersection-observer';

const prerender = navigator.userAgent === 'ReactSnap';

function ProgressiveVideo(props) {
  const { className, style, reveal, delay = 0, src, placeholder } = props;
  const [loaded, setLoaded] = useState(false);
  const [intersect, setIntersect] = useState(false);
  const containerRef = useRef();

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const Video = entry.target;
          setIntersect(true);
          observer.unobserve(Video);
        }
      });
    });

    observer.observe(containerRef.current);

    return function cleanUp() {
      observer.disconnect();
    };
  }, []);

  return (
    <VideoContainer
      className={className}
      style={style}
      ref={containerRef}
      reveal={reveal}
      intersect={intersect}
      loaded={loaded}
      delay={delay}
    >
      {reveal &&
        <VideoFade intersect={intersect} delay={delay}>
          <VideoElements
            delay={delay}
            onLoad={onLoad}
            loaded={loaded}
            intersect={intersect}
            src={src}
            placeholder={placeholder}
          />
        </VideoFade>
      }
      {!reveal &&
        <VideoElements
          onLoad={onLoad}
          loaded={loaded}
          intersect={intersect}
          src={src}
          placeholder={placeholder}
        />
      }
    </VideoContainer>
  );
};

function VideoElements(props) {
  const { src, placeholder } = props;

  return (
    <React.Fragment>
      <VideoActual
        autoPlay
        muted
        loop
        playsInline
        poster={placeholder}
      >
        <source src={src} type="video/mp4" />
      </VideoActual>
    </React.Fragment>
  );
}

const AnimVideoReveal = keyframes`
  0% {
    transform: scale3d(0, 1, 1);
    transform-origin: left;
  }
  49% {
    transform: scale3d(1, 1, 1);
    transform-origin: left;
  }
  50% {
    transform: scale3d(1, 1, 1);
    transform-origin: right;
  }
  100% {
    transform: scale3d(0, 1, 1);
    transform-origin: right;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  transform: translate3d(0, 0, 0);
  display: grid;
  grid-template-columns: 100%;

  ${props => props.reveal && css`
    &:before {
      content: '';
      background: ${props => props.theme.colorAccent};
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: scale3d(0, 1, 1);
      transform-origin: left;
      z-index: 16;
      animation: ${props.intersect && !prerender && css`
        ${AnimVideoReveal} 1.8s ${props.theme.curveFastoutSlowin} ${props.delay + 200}ms
      `};
    }
  `}
`;

const VideoFade = styled.div`
  opacity: ${props => props.intersect ? 1 : 0};
  transition: opacity 0.4s ease ${props => props.delay + 1000}ms;
  transform: translate3d(0, 0, 0);
  position: relative;
  display: grid;
  grid-template-columns: 100%;
`;

const VideoActual = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  opacity: ${props => props.autoPlay ? 1 : 0};
  grid-column: 1;
  grid-row: 1;
  object-fit: cover;
`;

export default React.memo(ProgressiveVideo);
