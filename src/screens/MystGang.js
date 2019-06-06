import React, { useEffect, useContext, useMemo, useRef, lazy, Suspense } from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { AppContext } from '../app/App';
import ProgressiveImage from '../components/ProgressiveImage';
import { useScrollToTop } from '../utils/Hooks';
import { RouterButton } from '../components/Button';
import Footer from '../components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectBackground, ProjectHeader, ProjectSectionHeading, ProjectSectionText,
  ProjectTextRow, Video
} from '../components/Project';
import { media } from '../utils/StyleUtils';
import Background from '../assets/MystGang/background.mp4';
import BackgroundPlaceholder from '../assets/MystGang/backgroundPlaceholder.png';
import Render from '../assets/MystGang/MystGang.mp4'
import RenderPlaceholder from '../assets/MystGang/MystGangPlaceholder.png';
import Animation from '../assets/MystGang/mystGangAnimation.mp4';
import AnimationPlaceholder from '../assets/MystGang/mystGangAnimationPlaceholder.png';
import Branding from '../assets/MystGang/branding.webp';
import BrandingPlaceholder from '../assets/MystGang/brandingPlaceholder.png';
import Sketch from '../assets/MystGang/prototypeRender.webp';
import SketchPlaceholder from '../assets/MystGang/prototypeRenderPlaceholder.png';
import WebGL from '../assets/MystGang/webGLRender.webp';
import Final from '../assets/MystGang/finalRender.webp';
import { ReactComponent as MystLogo } from '../assets/MystGang/logo.svg';

const DisplacementSlider = lazy(() => import('../components/DisplacementSlider'));

const prerender = navigator.userAgent === 'ReactSnap';

const title = 'MystGang 2019 - WIP';
const description = 'Bringing an epic content creator\'s portfolio to life with ThreeJS.';
const roles = [
  'Front-end Development',
  'Back-end Development',
  'Visual Design',
  'UI / UX Design',
  'Branding & Identity',
  'Creative Direction',
  '3D Animation',
];

function MystGang() {
  const { status, updateTheme, currentTheme } = useContext(AppContext);
  const currentThemeRef = useRef(currentTheme);
  useScrollToTop(status);

  useEffect(() => {
    currentThemeRef.current = currentTheme;
  }, [currentTheme]);

  useEffect(() => {
    if ((status === 'entered' || status === 'exiting')) {
      updateTheme({
        colorPrimary: currentTheme.id === 'dark'
          ? 'rgba(227, 203, 161, 1)'
          : 'rgba(181, 155, 105, 1)',
        colorAccent: 'rgba(227, 203, 161, 1)',
        custom: true,
      });
    }

    return function cleanUp() {
      if (status !== 'entered') {
        updateTheme();
      }
    };
  }, [updateTheme, status, currentTheme.id]);

  return (
    <React.Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description, }]}
      />
      <ProjectContainer>
        <ProjectBackground
          src={Background}
          placeholder={BackgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          linkLabel="View Website"
          url="https://mystgang.ml"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage>
              <Video
                src={Render}
                placeholder={RenderPlaceholder}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Video
              src={Animation}
              placeholder={AnimationPlaceholder}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProgressiveImage
              srcSet={`${Branding}`}
              placeholder={BrandingPlaceholder}
              alt=""
              sizes={`(max-width: ${media.mobile}) 100vw, (max-width: ${media.tablet}) 100vw, 50vw`}
            />
            <TextSection>
              <ProjectSectionHeading>Truly Epic Colors</ProjectSectionHeading>
              <ProjectSectionText>
                With a preference for dark things and with brown as a favorite, light on dark was the theme featuring a progressive gradient of brown.
              </ProjectSectionText>
            </TextSection>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <LogoContainer>
              <MystLogo />
            </LogoContainer>
            <ProjectTextRow center>
              <ProjectSectionHeading>An Epic Logo for an Epic Creator</ProjectSectionHeading>
              <ProjectSectionText>
                Known as a mob boss and sometimes a cowboy, this gangster monogram renewed their identity.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionSlider>
            <Suspense fallback={<React.Fragment />}>
              <DisplacementSlider
                placeholder={SketchPlaceholder}
                images={useMemo(() => [
                  {
                    src: Sketch,
                    srcset: `${Sketch}`,
                    alt: 'Prototype Design'
                  },
                  {
                    src: WebGL,
                    srcset: `${WebGL}`,
                    alt: 'WebGL Prototype',
                  },
                  {
                    src: Final,
                    srcset: `${Final}`,
                    alt: 'Final Prototype',
                  },
                ], [])}
                width={useMemo(() => 1920, [])}
                height={useMemo(() => 1080, [])}
              />
            </Suspense>
          </ProjectSectionSlider>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>MystGang 2019</ProjectSectionHeading>
              <RouterButton
                secondary
                icon="chevronRight"
                to="/#work2"
              >
                Back to homepage
              </RouterButton>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </React.Fragment>
  );
}

const ProjectSectionSlider = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 70px;
  margin: 0;
`;

const ProjectSectionColumns = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 0;

  @media (max-width: ${media.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const TextSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colorBackground};
  padding: ${props => props.theme.id === 'light' ? '60px' : 0} 80px;
  margin-bottom: 80px;
  width: 100%;

  @media (max-width: ${media.mobile}) {
    padding: ${props => props.theme.id === 'light' ? '30px' : 0} 40px;
    margin-bottom: 40px;
  }

  svg {
    max-width: 800px;
  }
`;

export default MystGang;
