import React, { lazy, useContext, useMemo, Suspense } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import ProgressiveImage from 'components/ProgressiveImage';
import { useScrollRestore } from 'hooks';
import Footer from 'components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectBackground, ProjectHeader, ProjectSectionHeading, ProjectSectionText,
  ProjectTextRow, ProjectSectionColumns
} from 'components/Project';
import mystgangBackground from 'assets/mystgang-background.png';
import mystgangBackgroundLarge from 'assets/mystgang-background-large.png';
import mystgangBackgroundPlaceholder from 'assets/mystgang-background-placeholder.png';
import mystgang from 'assets/mystgang.mp4';
import mystgangPlaceholder from 'assets/mystgang-placeholder.png';
import mystgangAnimation from 'assets/mystgang-animation.mp4';
import mystgangAnimationPlaceholder from 'assets/mystgang-animation-placeholder.png';
import mystgangBranding from 'assets/mystgang-branding.png';
import mystgangBrandingPlaceholder from 'assets/mystgang-branding-placeholder.png';
import mystgangSplash from 'assets/mystgang-splash.png';
import mystgangSplashPlaceholder from 'assets/mystgang-splash-placeholder.png';
import mystgangHome from 'assets/mystgang-home.png';
import mystgangMenu from 'assets/mystgang-menu.png';
import mystgangWork from 'assets/mystgang-work.png';
import mystgangAboutSelf from 'assets/mystgang-about-self.png';
import mystgangAboutWork from 'assets/mystgang-about-work.png';
import mystgangAboutSocials from 'assets/mystgang-about-socials.png';
import mystgangContact from 'assets/mystgang-contact.png';
import mystgangLogo from 'assets/mystgang-logo.png';
import mystgangLogoPlaceholder from 'assets/mystgang-logo-placeholder.png';

const DisplacementSlider = lazy(() => import('components/DisplacementSlider'));
const prerender = navigator.userAgent === 'ReactSnap';
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
  const { mobile, tablet } = useContext(ThemeContext);
  useScrollRestore();

  return (
    <React.Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description, }]}
      />
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${mystgangBackground} 1000w, ${mystgangBackgroundLarge} 1920w`}
          placeholder={mystgangBackgroundPlaceholder}
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
              sizes={`(max-width: ${mobile}px) 100vw, (max-width: ${tablet}px) 100vw, 50vw`}
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
                placeholder={mystgangSplashPlaceholder}
                images={useMemo(() => [
                  {
                    src: mystgangSplash,
                    srcset: mystgangSplash,
                    alt: 'MystGang Splash Screen',
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
                    src: mystgangAboutSelf,
                    srcset: mystgangAboutSelf,
                    alt: 'About Self'
                  },
                  {
                    src: mystgangAboutWork,
                    srcset: mystgangAboutWork,
                    alt: 'About Work',
                  },
                  {
                    src: mystgangAboutSocials,
                    srcset: mystgangAboutSocials,
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

  @media (max-width: ${props => props.theme.tablet}px), (max-width ${props => props.theme.mobile}px) {
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

  @media (max-width: ${props => props.theme.mobile}px) {
    padding: 30px 40px;
    margin-bottom: 40px;
  }

  div, img {
    max-width: 800px;
  }
`;

export default MystGang;
