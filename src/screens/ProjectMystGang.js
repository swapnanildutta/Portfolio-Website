import React, { lazy, useMemo, Suspense } from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import ProgressiveImage from 'components/ProgressiveImage';
import { useColor, useScrollRestore } from 'hooks';
import Footer from 'components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectBackground, ProjectHeader, ProjectSectionHeading, ProjectSectionText,
  ProjectTextRow
} from 'components/Project';
import prerender from 'utils/prerender';
import mystgangBackground from 'assets/mystgang-background.png';
import mystgangBackgroundLarge from 'assets/mystgang-background-large.png';
import mystgangBackgroundPlaceholder from 'assets/mystgang-background-placeholder.png';
import mystgang from 'assets/mystgang.mp4';
import mystgangPlaceholder from 'assets/mystgang-placeholder.png';
import mystgangStill from 'assets/mystgang-still.png';
import mystgangStillLarge from 'assets/mystgang-still-large.png';
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

const DisplacementCarousel = lazy(() => import('components/DisplacementCarousel'));
const title = 'MystGang 2019';
const description = 'A personal site for the gaming content creator known as MystGang. This project involved designing a hub to connect MystGang\'s content and social media.';
const roles = [
  'Branding & Identity',
  'UI / UX Design',
  'Front-end Development',
];

function MystGang() {
  const theme = useTheme();
  useColor('rgba(227, 203, 161, 1)');
  useScrollRestore();

  return (
    <React.Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description }]}
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
            <SidebarImageText>
              <ProjectSectionHeading>Building an Identity</ProjectSectionHeading>
              <ProjectSectionText>
                We started out laying the foundations of MystGang's brand.
              </ProjectSectionText>
              <ProjectSectionText>
                Subtle, muted colors, an elegant typeface complete with their signature color: brown.
              </ProjectSectionText>
            </SidebarImageText>
            <SidebarImage
              srcSet={mystgangBranding}
              placeholder={mystgangBrandingPlaceholder}
              sizes={`(max-width: ${theme.mobile}px) 100vw, (max-width: ${theme.tablet}px) 100vw, 50vw`}
              alt=""
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProgressiveImage
              srcSet={`${mystgangStill} 480w, ${mystgangStillLarge} 960w`}
              videoSrc={mystgangAnimation}
              placeholder={mystgangAnimationPlaceholder}
              sizes={`(max-width: ${theme.mobile}px) 90vw, (max-width: ${theme.tablet}px) 80vw, 70vw`}
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
              <ProjectSectionHeading>Identity Design</ProjectSectionHeading>
              <ProjectSectionText>
                The monogram uses custom typography and colors to get the right balance of weight and angularity.
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
              <DisplacementCarousel
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

const ProjectSectionColumns = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 20px 0 60px;

  @media (max-width: ${props => props.theme.tablet}px), (max-width: ${props => props.theme.mobile}px) {
    grid-template-columns: 1fr;
    grid-gap: 0;

    ${ProjectTextRow} {
      text-align: center;
    }
  }
`;

const SidebarImageText = styled.div`
  display: flex;
  align-items: ${props => props.center ? 'center' : 'flex-start'};
  flex-direction: column;
  justify-content: center;
  padding-right: 10px;

  @media (max-width: ${props => props.theme.tablet}px) {
    padding-right: 0;
  }
`;

const SidebarImage = styled(ProgressiveImage)`
  position: relative;
  top: 5%;

  @media (max-width: ${props => props.theme.tablet}px) {
    padding: 0 80px;
    margin-top: 60px;
  }

  @media (max-width: ${props => props.theme.mobile}px) {
    padding: 0 20px;
    margin-top: 40px;
  }
`;

export default MystGang;
