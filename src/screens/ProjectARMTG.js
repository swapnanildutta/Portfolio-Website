import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useScrollRestore } from 'hooks';
import Footer from 'components/Footer';
import ProgressiveImage from 'components/ProgressiveImage';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectBackground, ProjectHeader
} from 'components/Project';
import armtgBackground from 'assets/armtg-background.png';
import armtgBackgroundLarge from 'assets/armtg-background-large.png';
import armtgBackgroundPlaceholder from 'assets/armtg-background-placeholder.png';
import armtg from 'assets/armtg.mp4';
import armtgPlaceholder from 'assets/armtg-placeholder.png';

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
          url="https://mtg.codyb.co"
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
      </ProjectContainer>
      <Footer />
    </React.Fragment>
  );
}

export default ArMTG;
