import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import { media, AnimFade, rgba } from '../utils/StyleUtils';
import { LinkButton } from '../components/Button';
import ProgressiveImage from '../components/ProgressiveImage';
import ProgressiveVideo from '../components/ProgressiveVideo';

const initDelay = 300;
const prerender = navigator.userAgent === 'ReactSnap';

export const Video = ProgressiveVideo;

export function ProjectBackground(props) {
  const { src, placeholder } = props;
  const [offset, setOffset] = useState();
  const scheduledAnimationFrame = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return function cleanUp() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    lastScrollY.current = window.scrollY;
    if (scheduledAnimationFrame.current) return;
    scheduledAnimationFrame.current = true;

    requestAnimationFrame(() => {
      setOffset(lastScrollY.current * 0.4);
      scheduledAnimationFrame.current = false;
    });
  };

  return (
    <ProjectBackgroundVideo
      autoPlay
      muted
      loop
      playsInline
      offset={offset}
      poster={placeholder}
    >
      <source src={src} type="video/mp4" />
    </ProjectBackgroundVideo>
  );
}

export function ProjectHeader(props) {
  const { title, description, linkLabel, url, roles } = props;

  return (
    <ProjectHeaderContainer>
      <ProjectHeaderInner>
        <ProjectDetails entered={!prerender}>
          <ProjectTitle>{title}</ProjectTitle>
          <ProjectDescription>{description}</ProjectDescription>
          <LinkButton
            secondary
            style={{ paddingLeft: '3px' }}
            icon="chevronRight"
            href={url}
            target="_blank"
          >
            {linkLabel ? linkLabel : 'Visit website'}
          </LinkButton>
        </ProjectDetails>
        <ProjectMeta entered={!prerender}>
          {roles && roles.map(role => (
            <ProjectMetaItem key={role}>{role}</ProjectMetaItem>
          ))}
        </ProjectMeta>
      </ProjectHeaderInner>
    </ProjectHeaderContainer>
  );
}

export const ProjectContainer = styled.article`
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

export const ProjectSection = styled.section`
  position: relative;
  width: 100vw;
  padding-top: 100px;
  padding-right: 120px;
  padding-bottom: 100px;
  padding-left: 210px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${media.desktop}) {
    padding-left: 120px;
  }

  @media (max-width: ${media.tablet}) {
    padding-top: 60px;
    padding-right: 80px;
    padding-bottom: 60px;
    padding-left: 160px;
    height: auto;
  }

  @media (max-width: ${media.mobile}) {
    padding-top: 40px;
    padding-right: 25px;
    padding-bottom: 40px;
    padding-left: 25px;
  }

  @media (max-width: ${media.mobile}), (max-height: ${media.mobile}) {
    padding-left: ${props => props.theme.spacingOuter.mobile};
    padding-right: ${props => props.theme.spacingOuter.mobile};
  }

  @media ${media.mobileLS} {
    padding-left: 100px;
    padding-right: 100px;
  }

  ${props => props.light && css`
    background: ${props.theme.colorBackgroundLight};
    padding-top: 120px;
    padding-bottom: 140px;

    @media (max-width: ${media.tablet}) {
      padding-top: 80px;
      padding-bottom: 100px;
    }

    @media (max-width: ${media.mobile}) {
      padding-top: 80px;
      padding-bottom: 100px;
    }
  `}
`;

export const ProjectBackgroundVideo = styled.video.attrs(props => ({
  role: 'presentation',
  style: {
    transform: `translate3d(0, ${props.offset}px, 0)`,
  },
}))`
  z-index: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 800px;
  overflow: hidden;
  object-fit: cover;
  width: 100%;
  transition-property: filter;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.4s;

  ${props => props.entered && css`
    animation: ${AnimFade} 2s ease ${initDelay}ms forwards;
  `}

  ${props => props.theme.id === 'light' && css`
    -webkit-filter:invert(100%);
    filter:progid:DXImageTransform.Microsoft.BasicImage(invert='1');
  `}
`;

const ProjectHeaderContainer = styled(ProjectSection)`
  padding-top: 140px;
  padding-bottom: 40px;

  @media (max-width: ${media.tablet}) {
    padding-top: 100px;
    padding-bottom: 0;
  }

  @media (max-width: ${media.mobile}) {
    padding-top: 130px;
    padding-bottom: 20px;
  }
`;

const ProjectHeaderInner = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 100px;
  max-width: 980px;

  @media (min-width: ${media.desktop}) {
    max-width: 1100px;
    grid-template-columns: 1fr 400px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 200px;
    grid-gap: 40px;
  }

  @media (max-width: ${media.tablet}) {
    grid-template-columns: 100%;
    grid-gap: 30px;
  }
`;

const AnimFadeSlide = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 60px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const ProjectDetails = styled.div`
  opacity: 0;

  ${props => props.entered && css`
    animation: ${AnimFadeSlide} 1.4s ${props.theme.curveFastoutSlowin} ${initDelay}ms forwards;
  `}
`;

const ProjectTitle = styled.h1`
  margin: 0;
  font-size: 54px;
  font-weight: 500;
  line-height: 1.1;
  color: ${props => props.theme.colorTitle};

  @media (max-width: ${media.tablet}) {
    font-size: 48px;
  }

  @media (max-width: ${media.mobile}) {
    font-size: 34px;
  }

  @media (max-width: 320px) {
    font-size: 28px;
  }
`;

const ProjectDescription = styled.p`
  font-size: 22px;
  line-height: 1.4;

  @media (max-width: ${media.mobile}) {
    font-size: 18px;
  }
`;

const ProjectMeta = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-top: 10px;
  opacity: 0;

  ${props => props.entered && css`
    animation: ${AnimFadeSlide} 1.4s ${props.theme.curveFastoutSlowin} ${initDelay + 200}ms forwards;
  `}
`;

const ProjectMetaItem = styled.li`
  padding: 30px 0;
  font-size: 16px;
  font-weight: ${props => props.theme.id === 'light' ? 500 : 400};
  border-top: 1px solid ${props => rgba(props.theme.colorText, 0.2)};

  &:last-child {
    border-bottom: 1px solid ${props => rgba(props.theme.colorText, 0.2)};
  }

  @media (max-width: ${media.tablet}) {
    padding: 20px 0;
  }

  @media (max-width: ${media.mobile}) {
    padding: 15px 0;
  }
`;

export const ProjectImage = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  div {
    width: 100%;
  }
`;

export const ProjectSectionContent = styled.div`
  max-width: 980px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${media.desktop}) {
    max-width: 1100px;
  }
`;

export const ProjectSectionHeading = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin: 0;
  color: ${props => props.theme.colorTitle};

  @media (max-width: ${media.mobile}) {
    font-size: 24px;
  }
`;

export const ProjectSectionText = styled.p`
  font-size: 20px;
  line-height: 1.4;
  margin: 0;
  margin-top: 28px;
  color: ${props => rgba(props.theme.colorText, 0.7)};

  & + a {
    margin-top: 14px;
  }

  @media (max-width: ${media.mobile}) {
    font-size: 18px;
    margin-top: 22px;
  }
`;

export const ProjectTextRow = styled.div`
  max-width: 660px;
  align-self: center;
  margin-bottom: 80px;
  text-align: ${props => props.center ? 'center' : 'left'};
  position: relative;

  @media (max-width: ${media.mobile}) {
    text-align: left;
  }
`;

export const ProjectSectionColumns = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 20px 0 60px;

  @media (max-width: ${media.tablet}), (max-width: ${media.mobile}) {
    grid-template-columns: 1fr;
    grid-gap: 0;

    ${ProjectTextRow} {
      text-align: center;
    }
  }
`;

export const SidebarImages = styled.div`
  display: grid;
  align-items: center;
  @media (max-width: ${media.tablet}) {
    padding: 0 80px;
    margin-top: 60px;
  }
  @media (max-width: ${media.mobile}) {
    padding: 0 20px;
    margin-top: 40px;
  }
`;

export const SidebarImagesText = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  padding-right: 10px;
  @media (max-width: ${media.tablet}) {
    padding-right: 0;
  }
`;

export const SidebarImage = styled(ProgressiveImage)`
  &:first-child {
    grid-column: col 1 / span 4;
    grid-row: 1;
    position: relative;
    top: 5%;
  }
  &:last-child {
    grid-column: col 3 / span 4;
    grid-row: 1;
    position: relative;
    top: -5%;
  }
`;

export const ProjectSectionGrid = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 40px 0;
  @media (max-width: ${media.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectSectionGridBackground = styled.div`
  grid-column: 1;
  grid-row: 1;
  @media (max-width: ${media.tablet}) {
    padding: 0 120px;
  }
  @media (max-width: ${media.mobile}) {
    padding: 0 60px;
  }
`;

export const ProjectSectionGridText = styled.div`
  padding-top: 80px;
  @media (max-width: ${media.desktop}) {
    padding-top: 40px;
  }
  @media (max-width: ${media.tablet}) {
    padding-top: 0;
  }
`;
