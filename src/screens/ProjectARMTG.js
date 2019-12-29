import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useColor, useScrollRestore } from 'hooks';
import Footer from 'components/Footer';
import ProgressiveImage from 'components/ProgressiveImage';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectBackground, ProjectHeader, ProjectSectionHeading
} from 'components/Project';
import prerender from 'utils/prerender';
import armtgBackground from 'assets/armtg-background.png';
import armtgBackgroundLarge from 'assets/armtg-background-large.png';
import armtgBackgroundPlaceholder from 'assets/armtg-background-placeholder.png';
import armtg from 'assets/armtg.mp4';
import armtgPlaceholder from 'assets/armtg-placeholder.png';

const title = 'ARMTG';
const description = 'I created and maintain an augmented reality and multi-platform solution to play the card game: Magic, the Gathering. ARMTG connects players with real and digital cards in real-time.';
const roles = [
  'UI / UX Design',
  '3D Modeling & Animation',
  'Software Development',
];

function ArMTG() {
  useColor('rgba(82, 118, 184, 1)');
  useScrollRestore();

  return (
    <React.Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description, }]}
      />
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${armtgBackground} 1000w, ${armtgBackgroundLarge} 1920w`}
          placeholder={armtgBackgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://armtg.codyb.co"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage entered={!prerender}>
              <ProgressiveImage
                srcSet={armtg}
                videoSrc={armtg}
                placeholder={armtgPlaceholder}
                reveal
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

export default ArMTG;
