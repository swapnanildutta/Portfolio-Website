import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProgressiveImage from '../components/ProgressiveImage';
import { useScrollToTop } from '../utils/hooks';
import Footer from '../components/Footer';
import { RouterButton } from '../components/Button';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectSectionHeading, ProjectBackground, ProjectHeader, ProjectSectionColumns,
  SidebarImages, SidebarImage, ProjectTextRow, ProjectSectionText
} from '../components/Project';
import { media } from '../utils/styleUtils';
import background from '../assets/Impact/impact-background.jpg';
import backgroundLarge from '../assets/Impact/impact-background-large.jpg';
import backgroundPlaceholder from '../assets/Impact/impact-background-placeholder.jpg';
import imageImpact from '../assets/Impact/impact.png';
import imageImpactLarge from '../assets/Impact/impact-large.png';
import imageImpactPlaceholder from '../assets/Impact/impact-placeholder.png';
import NextProject from '../assets/DTT/dtt-project-large.png';

const prerender = navigator.userAgent === 'ReactSnap';

const title = 'Changing the Game';
const description = 'I worked as the design lead on a website to represent Impact\'s product: Impact Client.';
const roles = [
  'Art Direction',
  'Visual Identity',
  'UX and UI Design',
  'Front End Development',
  'Back End Development',
];

function ProjectImpact() {
  useScrollToTop();

  return (
    <React.Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description, }]}
      />
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${background} 1000w, ${backgroundLarge} 1920w`}
          placeholder={backgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://github.com/CodyJasonBennett/ImpactWebsite"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage>
              <ProgressiveImage
                reveal
                srcSet={`${imageImpact} 800w, ${imageImpactLarge} 1440w`}
                placeholder={imageImpactPlaceholder}
                sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionHeading>Full project coming soon...</ProjectSectionHeading>
        </ProjectSection>
      </ProjectContainer>
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
            <ProjectSectionHeading>DevTech Tools</ProjectSectionHeading>
            <RouterButton
              secondary
              icon="chevronRight"
              to="/projects/devtech"
            >
              View Project
            </RouterButton>
          </ProjectTextRow>
        </ProjectSectionColumns>
      </ProjectSection>
      <Footer />
    </React.Fragment>
  );
}

export default ProjectImpact;
