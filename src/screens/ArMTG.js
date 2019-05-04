import React, { useContext } from 'react';
import Helmet from 'react-helmet-async';
import styled from 'styled-components/macro';
import ProgressiveImage from '../components/ProgressiveImage';
import { useScrollToTop } from '../utils/Hooks';
import Footer from '../components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectSectionHeading, ProjectBackground, ProjectHeader, ProjectFooter
} from '../components/Project';
import { Media } from '../utils/StyleUtils';
import { AppContext } from '../app/App';
import placeholder2 from '../assets/placeholder.png';
import background from '../assets/ARMTG/background.webp';
import render from '../assets/ARMTG/ARMTGWeb.webp';
import labDemo from '../assets/Lab/ArMTG.webp';
import branding from '../assets/ARMTG/branding.png';
import iconography from '../assets/ARMTG/iconography.png';
import home from '../assets/ARMTG/home.png'
import fone from '../assets/ARMTG/fone.png'
import ftwo from '../assets/ARMTG/ftwo.png'
import fthree from '../assets/ARMTG/fthree.png'
import signup from '../assets/ARMTG/signup.png';
import app from '../assets/ARMTG/app.png';
import login from '../assets/ARMTG/login.png';
import hover from '../assets/ARMTG/hover.webp';
import hand from '../assets/ARMTG/hand.webp';
import card from '../assets/ARMTG/card.png';
import markers from '../assets/ARMTG/markers.png';
import printsheet from '../assets/ARMTG/printsheet.png';
import homeF from '../assets/ARMTG/homeF.png';
import oneF from '../assets/ARMTG/oneF.png';
import twoF from '../assets/ARMTG/twoF.png';
import threeF from '../assets/ARMTG/threeF.png';
import signupF from '../assets/ARMTG/signupF.png';
import renderPlaceholder from '../assets/ARMTG/ARMTGWebPlaceHolder.png';
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

function Robotics(props) {
  const { status } = useContext(AppContext);
  useScrollToTop(status);

  return (
    <React.Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description, }]}
      />
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${background} 1000w, ${background} 1920w`}
          opacity={0.8}
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
                srcSet={`${render} 800w, ${render} 1920w`}
                placeholder={renderPlaceholder}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 100vw, (max-width: ${Media.tablet}) 90vw, 80vw`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <SidebarImagesText>
              <ProjectSectionHeading>3D – the Future of Card Games</ProjectSectionHeading>
            </SidebarImagesText>
            <SidebarImages>
              <SidebarImage
                srcSet={`${labDemo}`}
                placeholder={placeholder2}
                alt="Bringing the future to the renowned card game: Magic, the Gathering."
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
          </ProjectSectionColumns>
          <ProjectSectionGrid>
            <ProjectSectionGridBackground>
              <ProgressiveImage
                srcSet={`${branding}`}
                placeholder={placeholder2}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 312px, (max-width: ${Media.tablet}) 408px, 514px`}
              />
            </ProjectSectionGridBackground>
            <ProjectSectionGridText>
              <ProjectSectionHeading>Colors and Identity</ProjectSectionHeading>
            </ProjectSectionGridText>
          </ProjectSectionGrid>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Iconography</ProjectSectionHeading>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${iconography} 800w, ${iconography} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Website Prototype</ProjectSectionHeading>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${home} 800w, ${home} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${fone} 800w, ${fone} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${ftwo} 800w, ${ftwo} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${fthree} 800w, ${fthree} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${signup} 800w, ${signup} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>AR & VR Interface</ProjectSectionHeading>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${app} 800w, ${app} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Login Screen</ProjectSectionHeading>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${login} 800w, ${login} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>AR Cards</ProjectSectionHeading>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${labDemo} 800w, ${labDemo} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${hover} 800w, ${hover} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${hand} 800w, ${hand} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Producing the Cards</ProjectSectionHeading>
            </ProjectTextRow>
          </ProjectSectionContent>
          <ProjectSectionGrid>
            <SidebarImages>
              <SidebarImage
                srcSet={`${card} 400w, ${card} 898w`}
                placeholder={placeholder2}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
            <SidebarImages>
              <SidebarImage
                srcSet={`${markers} 400w, ${markers} 898w`}
                placeholder={placeholder2}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
          </ProjectSectionGrid>
          <ProjectSectionContent>
            <ProgressiveImage
              srcSet={`${printsheet}`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Final Website Design</ProjectSectionHeading>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${homeF} 800w, ${homeF} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${oneF} 800w, ${oneF} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${twoF} 800w, ${twoF} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${threeF} 800w, ${threeF} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${signupF} 800w, ${signupF} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectFooter
          title='ArMTG'
          url="/#work3"
        />
      </ProjectContainer>
      <Footer />
    </React.Fragment>
  );
}

const ProjectTextRow = styled.div`
  max-width: 660px;
  align-self: center;
  margin-bottom: 80px;
`;

const ProjectSectionColumns = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 20px 0 60px;

  @media (max-width: ${Media.tablet}) {
    grid-template-columns: 1fr;
    margin: 0 0 60px;
  }
`;

const ProjectSectionGrid = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 40px 0;

  @media (max-width: ${Media.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectSectionGridBackground = styled.div`
  grid-column: 1;
  grid-row: 1;

  @media (max-width: ${Media.tablet}) {
    padding: 0 120px;
  }

  @media (max-width: ${Media.mobile}) {
    padding: 0 60px;
  }
`;

const ProjectSectionGridText = styled.div`
  padding-top: 80px;

  @media (max-width: ${Media.desktop}) {
    padding-top: 40px;
  }

  @media (max-width: ${Media.tablet}) {
    padding-top: 0;
  }
`;

const SidebarImages = styled.div`
  display: grid;
/*  grid-template-columns: repeat(6, [col] 1fr);*/
  align-items: center;

  @media (max-width: ${Media.tablet}) {
    padding: 0 80px;
    margin-top: 60px;
  }

  @media (max-width: ${Media.mobile}) {
    padding: 0 20px;
    margin-top: 40px;
  }
`;

const SidebarImagesText = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  padding-right: 10px;

  @media (max-width: ${Media.tablet}) {
    padding-right: 0;
  }
`;

const SidebarImage = styled(ProgressiveImage)`
  &:first-child {
    grid-column: col 1 / span 4;
    grid-row: 1;
    position: relative;
    top: 5%;
  }

  &:last-child {
    grid-column: col 3 / span 4;
    grid-row: 1;
    position: relative;
    top: -5%;
  }
`;

export default Robotics;
