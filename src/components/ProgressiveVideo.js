import React, {/* useState, useEffect, */useRef } from 'react';
import styled/*, { css, keyframes }*/ from 'styled-components/macro';
import 'intersection-observer';

function ProgressiveVideo(props) {
  const { className, style, srcSet, placeholder } = props;

//  const [setIntersect] = useState(false);
  const containerRef = useRef();

/*  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          setIntersect(true);
          observer.unobserve(image);
        }
      });
    });
  }, []);*/

  return (
    <ImageContainer className={className} style={style} ref={containerRef}>
      <VideoContainer>
        <Video
          autoPlay
          muted
          loop
          playsInline
          poster={placeholder}
        >
          <source src={srcSet} type="video/mp4" />
        </Video>
      </VideoContainer>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  position: relative;
  transform: translate3d(0, 0, 0);
`;
/*
const AnimVideo = keyframes`
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
*/
const VideoContainer = styled.div`
  width: 100%;
  height: auto;
  transition: opacity 0.4s ease;
  pointer-events: none;
  display: block;
  overflow: hidden;
  position: relative;
  z-index: 1;
/*  transform: scale3d(0, 1, 1);
  transform-origin: left;
  background: ${props => props.theme.colorPrimary(1)};
  animation: $ {AnimVideo} 1.8s cubic-bezier(0.4,0.0,0.2,1) infinite;*/
`;

const Video = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: opacity;
  transition-delay: 1s;
  transition-duration: 0.4s;
  animation:
`;

export default React.memo(ProgressiveVideo);
