import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Transition } from 'react-transition-group';
import { media, rgba, sectionPadding } from '../utils/StyleUtils';
import { RouterButton, LinkButton } from '../components/Button';
import ProgressiveImage from '../components/ProgressiveImage';
import Macbook from '../assets/macbook-large.webp';
import Phone from '../assets/phone.webp';
import PhoneLarge from '../assets/phone-large.webp';
import PhonePlaceholder from '../assets/phone-placeholder.png';

function ProjectItem(props) {
  const {
    id, visible, sectionRef, index, title, description, imageSrc, imageAlt, phone,
    imagePlaceholder, buttonText, buttonLink, buttonTo, alternate, background, customColor,
    active, still, video, ...rest
  } = props;

  return (
    <React.Fragment>
      {background &&
        <Transition in={visible} timeout={0}>
          {status => (
            <ProjectWrapper visible={visible} active={active} background={background} customColor={customColor} status={status}>
              <ProjectBackground status={status}></ProjectBackground>
            </ProjectWrapper>
          )}
        </Transition>
      }
      <Transition in={visible} timeout={0}>
        {status => (
          <ProjectItemSection
            aria-labelledby={`${id}-title`}
            index={index}
            ref={sectionRef}
            status={status}
            id={id}
            alternate={alternate}
            {...rest}
          >
            <ProjectItemContent>
              <Transition in={visible} timeout={0}>
                {status => (
                  <React.Fragment>
                    <ProjectItemDetails>
                      <ProjectItemIndex status={status} customColor={customColor} aria-hidden>
                        <ProjectItemIndexNumber status={status} customColor={customColor}>{index}</ProjectItemIndexNumber>
                      </ProjectItemIndex>
                      <ProjectItemTitle id={`${id}-title`} status={status}>{title}</ProjectItemTitle>
                      <ProjectItemDescription status={status}>{description}</ProjectItemDescription>
                      <ProjectItemButton status={status} customColor={customColor}>
                        {buttonLink ?
                          <LinkButton
                            href={buttonLink}
                            target="_blank"
                            iconRight="arrowRight"
                            customColor={customColor}
                          >
                            {buttonText}
                          </LinkButton>
                          : <RouterButton to={buttonTo} iconRight="arrowRight" customColor={customColor}>{buttonText}</RouterButton>
                        }
                      </ProjectItemButton>
                    </ProjectItemDetails>
                    <ProjectItemPreview>
                      {!phone &&
                        <ProjectItemPreviewContentLaptop>
                          {!video &&
                            <ProjectItemImageLaptop
                              status={status}
                              srcSet={still ? null : imageSrc[0]}
                              alt={still ? null : imageAlt[0]}
                              placeholder={still ? null : imagePlaceholder[0]}
                              still={still}
                              sizes={`(max-width: ${media.mobile}) 300px,(max-width: ${media.tablet}) 420px,(max-width: ${media.desktop}) 860px, 900px`}
                            />
                          }
                          {video && !still &&
                            <ProjectItemVideoLaptop
                              autoPlay
                              muted
                              loop
                              playsInline
                              status={status}
                              poster={imagePlaceholder[0]}
                            >
                              <source src={visible ? imageSrc[0] : null} type="video/mp4" />
                            </ProjectItemVideoLaptop>
                          }
                        </ProjectItemPreviewContentLaptop>
                      }
                      {phone &&
                        <ProjectItemPreviewContentPhone>
                          {imageSrc && imageSrc.map((src, index) => (
                            <ProjectItemPhone first={index === 0} status={status} key={`img_${index}`}>
                              <ProjectItemPhoneFrame
                                srcSet={`${Phone} 414w, ${PhoneLarge} 828w`}
                                sizes={`(max-width: ${media.tablet}) 248px, 414px`}
                                alt=""
                                role="presentation"
                                placeholder={PhonePlaceholder}
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
        )}
      </Transition>
    </React.Fragment>
  );
};

const ProjectWrapper = styled.div`
  position: absolute;
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  opacity: 0;
  transition-property: background, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 1s;
  transition-delay: 0.4s;
  transform-origin: top;

  ${props => props.status === 'entered' && props.visible && css`
    background: url(${props => props.active ? props.background : 'transparent'});
    background-attachment: fixed;
    background-size: cover;
    opacity: ${props => props.active ? 1 : 0};
  `}
`;

const ProjectBackground = styled.div`
  position: absolute;
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  opacity: 0;
  background-color: transparent;
  transition-property: background-color, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 1.1s;
  transition-delay: 0.3s;

  ${props => props.status === 'entered' && css`
    background-color: rgba(${props => props.theme.id === 'dark' ? '0, 0, 0' : '242, 242, 242'}, 0.4);
    opacity: 1;
  `}
`;

const ProjectItemContent = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidthLaptop}px;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 43% 55%;
  grid-column-gap: 2%;

  @media (min-width: ${media.desktop}) {
    max-width: ${props => props.theme.maxWidthDesktop}px;
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
  padding-top: ${props => props.index === '01' ? '0' : '120px'};
  padding-bottom: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${sectionPadding}

  &:focus {
    outline: none;
  }

  @media (min-width: ${media.desktop}) {
    padding-top: 0;
    padding-bottom: 0;
  }

  @media (max-width: ${media.tablet}) {
    padding-top: ${props => props.index === '01' ? '0' : '60px'};
    padding-bottom: 60px;
    height: auto;
  }

  @media (max-width: ${media.mobile}) {
    padding-bottom: 100px;
    overflow-x: hidden;
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
    background: ${props => props.customColor ? props.customColor : props.theme.colorPrimary};
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
  color: ${props => props.customColor ? props.customColor : props.theme.colorPrimary};
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

const ProjectItemImageLaptop = styled(ProgressiveImage)`
  width: 862px;
  height: 531px;
  right: -140px;
  padding: 5.5% 10.9% 7.3% 11.4%;
  transition-property: transform, opacity;
  transition-duration: 1s;
  transition-delay: 0.4s;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transform: translate3d(40px, 0, 0);
  opacity: 0;
  position: relative;

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

  background-image: url(${props => props.still ? props.still : Macbook});
  background-size: cover;

  ${props => props.still && css`
    img {
      display: none;
    }
  `}
`;

const ProjectItemVideoLaptop = styled.video`
  width: 862px;
  height: 531px;
  right: -140px;
  padding: 5.5% 10.9% 7.3% 11.4%;
  transition-property: transform, opacity;
  transition-duration: 1s;
  transition-delay: 0.4s;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transform: translate3d(40px, 0, 0);
  opacity: 0;
  position: relative;
  object-fit: cover;
  outline: 0;
  border: none;
  -moz-outline-style: none;

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

  background-image: url(${props => props.still ? props.still : Macbook});
  background-size: cover;
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

const ProjectItemPhoneFrame = styled(ProgressiveImage)`
  position: absolute;
  width: 414px;
  height: 721px;

  @media (max-width: ${media.tablet}) {
    width: 248px;
    height: 431px;
  }
`;

const ProjectItemPhoneImage = styled(ProgressiveImage)`
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
