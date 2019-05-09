import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import 'intersection-observer';
import macbook from '../assets/macbook-large.png';

const prerender = navigator.userAgent === 'ReactSnap';

function ProgressiveImageMacbook(props) {
  const { placeholder, className, style, srcSet, ...restProps } = props;
  const [loaded, setLoaded] = useState(false);
  const [intersect, setIntersect] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          setIntersect(true);
          observer.unobserve(image);
        }
      });
    });

    observer.observe(containerRef.current);

    return function cleanUp() {
      observer.disconnect();
    };
  }, []);

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <ImageContainer className={className} style={style} ref={containerRef}>
      <ImageActual
        onLoad={onLoad}
        decoding="async"
        loaded={loaded}
        srcSet={!prerender && intersect ? srcSet : null}
        {...restProps}
      />
      <ImagePlaceholder
        loaded={loaded}
        src={placeholder}
        alt=""
        role="presentation"
      />
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  position: relative;
  transform: translate3d(0, 0, 0);
  background-image: url(${macbook});
  background-size: cover;
`;

const ImagePlaceholder = styled.img`
  width: 77.62%;
  height: 78.66%;
  transition: opacity 0.4s ease;
  pointer-events: none;
  display: block;
  top: 9.20%;
  left: 11.4%;
  position: relative;
  z-index: 1;
  opacity: ${props => props.loaded ? 0 : 1};
`;

const ImageActual = styled.img`
  width: 77.62%;
  height: 78.66%;
  position: absolute;
  top: 9.20%;
  left: 11.4%;
  display: block;
  opacity: ${props => props.loaded ? 1 : 0};
`;

export default React.memo(ProgressiveImageMacbook);
