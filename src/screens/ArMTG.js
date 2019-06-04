import React, { lazy, useContext, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppContext } from '../app/App';
import ProgressiveImage from '../components/ProgressiveImage';
import { useScrollToTop } from '../utils/Hooks';
import Footer from '../components/Footer';
import { RouterButton } from '../components/Button';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectHeader, ProjectTextRow, ProjectSectionHeading, ProjectSectionText

} from '../components/Project';
import { media } from '../utils/StyleUtils';
import Render from '../assets/ARMTG/ARMTGWeb.webp';
import RenderPlaceholder from '../assets/ARMTG/ARMTGWebPlaceHolder.png';

const ARMTGScene = lazy(() => import('../components/ARMTGScene'));

const prerender = navigator.userAgent === 'ReactSnap';
const title = 'ARMTG';
const description = 'Bringing the future to the renowned card game: Magic, the Gathering.';
const roles = [
  'Front-end Development',
  'Back-end Development',
  'Software Development',
  'Visual & UI / UX Design',
  'Branding & Identity',
  'Creative Direction',
  '3D Modeling & Animation',
];

function ArMTG(props) {
  const { status, updateTheme, currentTheme } = useContext(AppContext);
  const currentThemeRef = useRef(currentTheme);
  useScrollToTop(status);

  useEffect(() => {
    currentThemeRef.current = currentTheme;
  }, [currentTheme]);

  useEffect(() => {
    if ((status === 'entered' || status === 'exiting')) {
      updateTheme({
        colorPrimary: 'rgba(101, 154, 247, 1)',
        colorAccent: 'rgba(101, 154, 247, 1)',
        custom: true,
      });
    }

    return function cleanUp() {
      if (status !== 'entered') {
        updateTheme();
      }
    };
  }, [updateTheme, status, currentTheme.id])

  return (
    <React.Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description, }]}
      />
      <ProjectContainer>
        <ARMTGScene />
        <ProjectHeader
          title={title}
          description={description}
          url="https://mtg.codyb.co"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage entered={!prerender}>
              <ProgressiveImage
                srcSet={`${Render} 800w, ${Render} 1920w`}
                placeholder={RenderPlaceholder}
                alt=""
                sizes={`(max-width: ${media.mobile}) 100vw, (max-width: ${media.tablet}) 90vw, 80vw`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>ArMTG</ProjectSectionHeading>
              <ProjectSectionText>
                Full Project Coming Soon
              </ProjectSectionText>
              <RouterButton
                secondary
                icon="chevronRight"
                to="/#work3"
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

export default ArMTG;
