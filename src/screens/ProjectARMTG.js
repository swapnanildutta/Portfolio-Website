import React, { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { useScrollToTop } from '../utils/hooks';
import Footer from '../components/Footer';
import { RouterButton } from '../components/Button';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectHeader, ProjectTextRow, ProjectSectionHeading, ProjectSectionText,
  Video, ProjectSectionColumns, SidebarImages, SidebarImage
} from '../components/Project';
import { media } from '../utils/styleUtils';
import Render from '../assets/ARMTG/ARMTGWeb.mp4';
import RenderPlaceholder from '../assets/ARMTG/ARMTGWebPlaceHolder.png';
import NextProject from '../assets/Robotics/robotics-project-large.png';

const ARMTGScene = lazy(() => import('../scenes/ARMTGScene'));

const prerender = navigator.userAgent === 'ReactSnap';
const title = 'ARMTG';
const description = 'A VR, AR, and multi-platform application to play the card game: Magic, the Gathering with database-fed decks displayed on real, physical cards in real-time. Automatic shuffling, an intuitive deck editor, and a cool 3D interface brought the technology of the future to the game.';
const roles = [
  'Front-end Development',
  'Back-end Development',
  'Software Development',
  'Visual & UI / UX Design',
  'Branding & Identity',
  'Creative Direction',
  '3D Modeling & Animation',
];

function ArMTG() {
  useScrollToTop();

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
              <Video
                src={Render}
                placeholder={RenderPlaceholder}
                reveal
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns light>
            <SidebarImages>
              <SidebarImage
                srcSet={`${NextProject}`}
                alt=""
                reveal
                sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
            <ProjectTextRow center>
              <ProjectSectionText>
                Next Project
              </ProjectSectionText>
              <ProjectSectionHeading>GCPS Robotics</ProjectSectionHeading>
              <RouterButton
                secondary
                icon="chevronRight"
                to="/projects/robotics"
              >
                View Project
              </RouterButton>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </React.Fragment>
  );
}

export default ArMTG;
