import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import { Transition } from 'react-transition-group';
import { media, rgba } from '../utils/StyleUtils';
import { RouterButton, LinkButton } from '../components/Button';
import 'intersection-observer';
import macbook from '../assets/macbook-large.png';
import phone from '../assets/phone.png';
import phoneLarge from '../assets/phone-large.png';
import phonePlaceholder from '../assets/phone-placeholder.png';

const prerender = navigator.userAgent === 'ReactSnap';

export function ProjectImage(props) {
  const { className, style, reveal, delay = 0, ...rest } = props;
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

  return (
    <ImageContainer
      className={className}
      style={style}
      ref={containerRef}
      reveal={reveal}
      intersect={intersect}
      loaded={loaded}
      delay={delay}
    >
      {reveal &&
        <ImageFade intersect={intersect} delay={delay}>
          <ImageElements
            delay={delay}
            onLoad={onLoad}
            loaded={loaded}
            intersect={intersect}
            {...rest}
          />
        </ImageFade>
      }
      {!reveal &&
        <ImageElements
          onLoad={onLoad}
          loaded={loaded}
          intersect={intersect}
          {...rest}
        />
      }
    </ImageContainer>
  );
};

function ImageElements(props) {
  const { onLoad, loaded, intersect, srcSet, placeholder, delay, ...rest } = props;
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const placeholderRef = useRef();

  const purgePlaceholder = useCallback(() => {
    setShowPlaceholder(false);
  }, []);

  useEffect(() => {
    const placeholderElement = placeholderRef.current;
    placeholderElement.addEventListener('transitionend', purgePlaceholder);

    return function cleanUp() {
      if (placeholderElement) {
        placeholderElement.removeEventListener('transitionend', purgePlaceholder);
      }
    };
  }, [purgePlaceholder]);

  return (
    <React.Fragment>
      <ImageActual
        delay={delay}
        onLoad={onLoad}
        decoding="async"
        loaded={loaded}
        srcSet={!prerender && intersect ? srcSet : null}
        {...rest}
      />
      {showPlaceholder &&
        <ImagePlaceholder
          delay={delay}
          ref={placeholderRef}
          loaded={loaded}
          src={placeholder}
          alt=""
          role="presentation"
        />
      }
    </React.Fragment>
  );
}

export const AnimImageReveal = keyframes`
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

export const ImageContainer = styled.div`
  position: relative;
  transform: translate3d(0, 0, 0);
  display: grid;
  grid-template-columns: 100%;
  background-image: url(${macbook});
  background-size: cover;

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
        ${AnimImageReveal} 1.8s ${props.theme.curveFastoutSlowin} ${props.delay + 200}ms
      `};
    }
  `}
`;

export const ImageFade = styled.div`
  opacity: ${props => props.intersect ? 1 : 0};
  transition: opacity 0.4s ease ${props => props.delay + 1000}ms;
  transform: translate3d(0, 0, 0);
  position: relative;
  display: grid;
  grid-template-columns: 100%;
`;

export const ImagePlaceholder = styled.img`
  width: 77.62%;
  height: 78.90%;
  top: 9.05%;
  left: 11.35%;
  transition: opacity 0.4s ease;
  pointer-events: none;
  display: block;
  position: relative;
  z-index: 1;
  opacity: ${props => props.loaded ? 0 : 1};
  grid-column: 1;
  grid-row: 1;
`;

export const ImageActual = styled.img`
  width: 77.62%;
  height: 78.90%;
  top: 9.05%;
  left: 11.35%;
  position: absolute;
  display: block;
  opacity: ${props => props.loaded ? 1 : 0};
  grid-column: 1;
  grid-row: 1;
`;

function ProjectItem(props) {
  const {
    id, visible, sectionRef, index, title, description, imageSrc, imageAlt, imageType,
    imagePlaceholder, buttonText, buttonLink, buttonTo, alternate, ...rest
  } = props;

  return (
    <ProjectItemSection
      aria-labelledby={`${id}-title`}
      index={index}
      ref={sectionRef}
      id={id}
      alternate={alternate}
      {...rest}
    >
      <ProjectItemContent>
        <Transition in={visible} timeout={0}>
          {status => (
            <React.Fragment>
              <ProjectItemDetails>
                <ProjectItemIndex status={status} aria-hidden>
                  <ProjectItemIndexNumber status={status}>{index}</ProjectItemIndexNumber>
                </ProjectItemIndex>
                <ProjectItemTitle id={`${id}-title`} status={status}>{title}</ProjectItemTitle>
                <ProjectItemDescription status={status}>{description}</ProjectItemDescription>
                <ProjectItemButton status={status}>
                  {buttonLink ?
                    <LinkButton
                      href={buttonLink}
                      target="_blank"
                      iconRight="arrowRight"
                    >
                      {buttonText}
                    </LinkButton>
                    : <RouterButton to={buttonTo} iconRight="arrowRight">{buttonText}</RouterButton>
                  }
                </ProjectItemButton>
              </ProjectItemDetails>
              <ProjectItemPreview>
                {imageType === 'laptop' &&
                  <ProjectItemPreviewContentLaptop>
                    <ProjectItemImageLaptop
                      macbook
                      status={status}
                      srcSet={imageSrc[0]}
                      alt={imageAlt[0]}
                      placeholder={imagePlaceholder[0]}
                      sizes={`(max-width: ${media.mobile}) 300px,(max-width: ${media.tablet}) 420px,(max-width: ${media.desktop}) 860px, 900px`}
                    />
                  </ProjectItemPreviewContentLaptop>
                }
                {imageType === 'phone' &&
                  <ProjectItemPreviewContentPhone>
                    {imageSrc && imageSrc.map((src, index) => (
                      <ProjectItemPhone first={index === 0} status={status} key={`img_${index}`}>
                        <ProjectItemPhoneFrame
                          srcSet={`${phone} 414w, ${phoneLarge} 828w`}
                          sizes={`(max-width: ${media.tablet}) 248px, 414px`}
                          alt=""
                          role="presentation"
                          placeholder={phonePlaceholder}
                        />
                        <ProjectItemPhoneImage
                          srcSet={imageSrc[index]}
                          alt={imageAlt[index]}
                          placeholder={imagePlaceholder[index]}
                          sizes={`(max-width: ${media.tablet}) 152px, 254px`}
                        />
                      </ProjectItemPhone>
                    ))}
                  </ProjectItemPreviewContentPhone>
                }
              </ProjectItemPreview>
            </React.Fragment>
          )}
        </Transition>
      </ProjectItemContent>
    </ProjectItemSection>
  );
};

const ProjectItemContent = styled.div`
  width: 100%;
  max-width: 1000px;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 43% 55%;
  grid-column-gap: 2%;

  @media (min-width: ${media.desktop}) {
    max-width: 1100px;
  }

  @media (max-width: 1245px) {
    grid-template-columns: 50% 50%;
  }

  @media (max-width: ${media.tablet}) {
    grid-template-columns: 100%;
    flex-direction: column-reverse;
    height: auto;
  }
`;

const ProjectItemDetails = styled.div`
  flex: 0 0 410px;
  max-width: 410px;
  z-index: 1;
  position: relative;

  @media (max-width: ${media.tablet}) {
    flex: 0 0 auto;
    max-width: 410px;
    grid-row: 2;
    grid-column: 1;
    justify-self: center;
  }
`;

const ProjectItemSection = styled.section`
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  padding-right: 80px;
  padding-bottom: 40px;
  padding-left: 220px;
  margin-top: ${props => props.index === '01' ? '0' : '120px'};
  margin-bottom: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }

  @media (min-width: ${media.desktop}) {
    padding-left: 120px;
    margin-bottom: 0;
    margin-top: 0;
  }

  @media (max-width: ${media.tablet}) {
    padding-left: 160px;
    padding-right: 80px;
    height: auto;
    margin-top: ${props => props.index === '01' ? '0' : '60px'};
    margin-bottom: 60px;
  }

  @media (max-width: ${media.mobile}) {
    padding-left: 25px;
    padding-right: 25px;
    padding-bottom: 100px;
    margin-bottom: 0;
    overflow-x: hidden;
  }

  @media (max-width: ${media.mobile}), (max-height: ${media.mobile}) {
    padding-right: ${props => props.theme.spacingOuter.mobile};
    padding-left: ${props => props.theme.spacingOuter.mobile};
  }

  ${props => props.alternate && css`
    ${ProjectItemContent} {
      grid-template-columns: 55% 40%;

      @media (max-width: ${media.tablet}) {
        grid-template-columns: 100%;
      }
    }

    ${ProjectItemDetails} {
      grid-column: 2;
      grid-row: 1;

      @media (max-width: ${media.tablet}) {
        grid-column: 1;
        grid-row: 2;
      }
    }
  `}
`;

const ProjectItemPreview = styled.div`
  flex: 0 1 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-self: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ProjectItemPreviewContentPhone = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`;

const ProjectItemPreviewContentLaptop = styled.div`
  position: relative;

  @media (max-width: ${media.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ProjectItemIndex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  &:before {
    content: '';
    position: relative;
    display: block;
    height: 2px;
    top: -1px;
    background: ${props => props.theme.colorPrimary};
    width: 96px;
    margin-right: 15px;
    transition-property: transform, opacity;
    transition-timing-function: ${props => props.theme.curveFastoutSlowin};
    transition-duration: 0.4s;
    transition-delay: 1s;
    transform: scale3d(0, 1, 1);
    transform-origin: left;
  }

  ${props => props.status === 'entered' && css`
    &:before {
      transform: scale3d(1, 1, 1);
    }
  `}
`;

const ProjectItemIndexNumber = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colorPrimary};
  transform: translateX(-10px);
  opacity: 0;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.4s;
  transition-delay: 1.3s;

  ${props => props.status === 'entered' && css`
    transform: translateX(0);
    opacity: 1;
  `}
`;

const ProjectItemTitle = styled.h2`
  font-size: 42px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
  margin-bottom: 16px;
  padding: 0;
  color: ${props => props.theme.colorTitle};
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: 0.4s;
  transform: translate3d(0, 40px, 0);
  opacity: 0;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  @media (max-width: 1245px) {
    font-size: 36px;
  }

  @media (max-width: ${media.mobile}) {
    font-size: 28px;
  }
`;

const ProjectItemDescription = styled.p`
  font-size: 18px;
  line-height: 1.4;
  color: ${props => rgba(props.theme.colorText, 0.8)};
  font-weight: ${props => props.theme.id === 'light' ? 500 : 300};
  margin-bottom: 38px;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: 0.6s;
  transform: translate3d(0, 40px, 0);
  opacity: 0;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  @media (max-width: ${media.mobile}) {
    font-size: 16px;
  }
`;

const ProjectItemButton = styled.div`
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: 0.8s;
  transform: translate3d(0, 40px, 0);
  opacity: 0;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const ProjectItemImageLaptop = styled(ProjectImage)`
  width: 862px;
  height: 531px;
  transition-property: transform, opacity;
  transition-duration: 1s;
  transition-delay: 0.4s;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transform: translate3d(40px, 0, 0);
  opacity: 0;
  position: relative;
  right: -140px;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  ${props => props.theme.id === 'light' && css`
    z-index: 1;
  `}

  @media(min-width: 1440px) {
    width: 880px;
    height: 542px;
  }

  @media(max-width: 1245px) {
    width: 761px;
    height: 491px;
  }

  @media (max-width: ${media.tablet}) {
    width: 420px;
    height: 258px;
    margin-bottom: 120px;
    right: 0;
  }

  @media (max-width: ${media.mobile}) {
    width: 336px;
    height: 206px;
    margin-bottom: 60px;
  }
`;

const ProjectItemPhone = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition-duration: 1s;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-property: transform, opacity;
  width: 100%;
  max-width: 100%;
  flex: 1 0 100%;

  ${props => props.first ? css`
    left: calc(50% - 140px);
    top: -120px;
    transform: translate3d(0, 80px, 0);
    transition-delay: 0s;

    @media (max-width: ${media.tablet}) {
      left: calc(50% - 48px);
      top: -60px;
    }
  `: css`
    left: calc(-50% + 20px);
    top: 120px;
    transform: translate3d(0, 80px, 0);
    transition-delay: 0.2s;

    @media (max-width: ${media.tablet}) {
      left: calc(-50% + 40px);
      top: 60px;
    }
  `}

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const ProjectItemPhoneFrame = styled(ProjectImage)`
  position: absolute;
  width: 414px;
  height: 721px;

  @media (max-width: ${media.tablet}) {
    width: 248px;
    height: 431px;
  }
`;

const ProjectItemPhoneImage = styled(ProjectImage)`
  box-shadow: 0 0 0 2px #1C1C1C;
  position: relative;
  top: -14px;
  width: 254px;
  height: 452px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${media.tablet}) {
    box-shadow: 0 0 0 1px #1C1C1C;
    width: 152px;
    height: 270px;
    top: -9px;
  }
`;

export default React.memo(ProjectItem);
