import React, { useMemo, lazy, Suspense } from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import ProgressiveImage from 'components/ProgressiveImage';
import { useScrollToTop } from 'utils/hooks';
import Footer from 'components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectHeader, ProjectSectionHeading, ProjectSectionText, ProjectTextRow,
  ProjectSectionColumns
} from 'components/Project';
import { media } from 'utils/style';
import mystgang from 'assets/MystGang/mystgang.mp4';
import mystgangPlaceholder from 'assets/MystGang/mystgang-placeholder.png';
import mystgangAnimation from 'assets/MystGang/mystgang-animation.mp4';
import mystgangAnimationPlaceholder from 'assets/MystGang/mystgang-animation-placeholder.png';
import mystgangBranding from 'assets/MystGang/branding.webp';
import mystgangBrandingPlaceholder from 'assets/MystGang/branding-placeholder.png';
import mystgangLoader from 'assets/MystGang/loader.webp';
import mystgangLoaderPlaceholder from 'assets/MystGang/loader-placeholder.png';
import mystgangHome from 'assets/MystGang/home.webp';
import mystgangMenu from 'assets/MystGang/menu.webp';
import mystgangWork from 'assets/MystGang/work.webp';
import mystgangAbout1 from 'assets/MystGang/about1.webp';
import mystgangAbout2 from 'assets/MystGang/about2.webp';
import mystgangAbout3 from 'assets/MystGang/about3.webp';
import mystgangContact from 'assets/MystGang/contact.webp';
import mystgangLogo from 'assets/MystGang/logo.png';
import mystgangLogoPlaceholder from 'assets/MystGang/logo-placeholder.png';

const DisplacementSlider = lazy(() => import('components/DisplacementSlider'));

const title = 'MystGang 2019';
const description = 'A responsive 3D website for the gaming content creator known as MystGang, featuring a 3D carousel to show off their work. The site is sped up with Ajax and animated with Tweenmax and Greensock, rendering a 3D landscape in WebGL with Three.js. This included the design of the monogram in the center of the screen.';
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
  useScrollToTop();

  return (
    <React.Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description, }]}
      />
      <ProjectContainer>
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
              <ProgressiveImage
                reveal
                srcSet={mystgang}
                videoSrc={mystgang}
                placeholder={mystgangPlaceholder}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns>
            <ProgressiveImage
              src={mystgangBranding}
              srcSet={mystgangBranding}
              placeholder={mystgangBrandingPlaceholder}
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
            <ProgressiveImage
              srcSet={mystgangAnimation}
              videoSrc={mystgangAnimation}
              placeholder={mystgangAnimationPlaceholder}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <LogoContainer>
            <ProgressiveImage
              src={mystgangLogo}
              srcSet={mystgangLogo}
              placeholder={mystgangLogoPlaceholder}
              alt=""
            />
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
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>The Website</ProjectSectionHeading>
            </ProjectTextRow>
          </ProjectSectionContent>
          <ProjectSectionSlider>
            <Suspense fallback={<React.Fragment />}>
              <DisplacementSlider
                placeholder={mystgangLoaderPlaceholder}
                images={useMemo(() => [
                  {
                    src: mystgangLoader,
                    srcset: mystgangLoader,
                    alt: 'MystGang Loader',
                    override: true
                  },
                  {
                    src: mystgangHome,
                    srcset: mystgangHome,
                    alt: 'Home Screen',
                  },
                  {
                    src: mystgangMenu,
                    srcset: mystgangMenu,
                    alt: 'Fullscreen Menu',
                  },
                  {
                    src: mystgangWork,
                    srcset: mystgangWork,
                    alt: 'Work Screen',
                  },
                  {
                    src: mystgangAbout1,
                    srcset: mystgangAbout1,
                    alt: 'About Self'
                  },
                  {
                    src: mystgangAbout2,
                    srcset: mystgangAbout2,
                    alt: 'About Work',
                  },
                  {
                    src: mystgangAbout3,
                    srcset: mystgangAbout3,
                    alt: 'About Socials',
                  },
                  {
                    src: mystgangContact,
                    srcset: mystgangContact,
                    alt: 'Contact Screen',
                  },
                ], [])}
                width={useMemo(() => 1920, [])}
                height={useMemo(() => 1080, [])}
              />
            </Suspense>
          </ProjectSectionSlider>
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

const TextSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (max-width: ${media.tablet}), (max-width ${media.mobile}) {
    margin-top: 18px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colorBackground};
  padding: 60px 80px;
  margin-bottom: 80px;
  width: 100%;

  @media (max-width: ${media.mobile}) {
    padding: 30px 40px;
    margin-bottom: 40px;
  }

  div, img {
    max-width: 800px;
  }
`;

export default MystGang;
