import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import ProgressiveImage from 'components/ProgressiveImage';
import { useScrollRestore } from 'hooks';
import Footer from 'components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectSectionHeading, ProjectBackground, ProjectHeader
} from 'components/Project';
import dttBackground from 'assets/dtt-background.png';
import dttBackgroundLarge from 'assets/dtt-background-large.png';
import dttBackgroundPlaceholder from 'assets/dtt-background-placeholder.png';
import imageDevTechTools from 'assets/devtech-tools.png';
import imageDevTechToolsLarge from 'assets/devtech-tools-large.png';
import imageDevTechToolsPlaceholder from 'assets/devtech-tools-placeholder.png';

const prerender = navigator.userAgent === 'ReactSnap';
const title = 'A Tool for Everything';
const description = 'I worked as the design lead on a product of DevTech Tools. We focused on creating the best tool for learning developers.';
const roles = [
  'Art Direction',
  'Visual Identity',
  'UX and UI Design',
  'Front End Development',
  'Back End Development',
];

function ProjectDTT() {
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
          srcSet={`${dttBackground} 1000w, ${dttBackgroundLarge} 1920w`}
          placeholder={dttBackgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://devtechtools.com/"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage>
              <ProgressiveImage
                reveal
                srcSet={`${imageDevTechTools} 800w, ${imageDevTechToolsLarge} 1440w`}
                placeholder={imageDevTechToolsPlaceholder}
                sizes={`(max-width: ${mobile}px) 500px, (max-width: ${tablet}px) 800px, 1000px`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionHeading>Full project coming soon...</ProjectSectionHeading>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </React.Fragment>
  );
}

export default ProjectDTT;
