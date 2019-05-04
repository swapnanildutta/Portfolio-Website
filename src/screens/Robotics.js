import React, { useContext } from 'react';
import Helmet from 'react-helmet-async';
import styled from 'styled-components/macro';
import ProgressiveImage from '../components/ProgressiveImage';
import { useScrollToTop } from '../utils/Hooks';
import Footer from '../components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectSectionHeading, ProjectSectionText, ProjectBackground, ProjectHeader, ProjectFooter
} from '../components/Project';
import { Media } from '../utils/StyleUtils';
import { AppContext } from '../app/App';
import placeholder2 from '../assets/placeholder.png';
import background from '../assets/Robotics/botBack2.webp';
import gcpsDash from '../assets/Robotics/gcps-dash-large.png';
import gcpsDashPlaceholder from '../assets/Robotics/gcps-dash-placeholder.png';
import robotics from '../assets/Robotics/robotics.webp';
import roboticsPlaceholder from '../assets/Robotics/robotics.min.png';
import competitionSite from '../assets/Robotics/3drobot.webp';
import clawbot from '../assets/Robotics/clawbot.png';
import branding from '../assets/Robotics/branding.png';
import robotCourse from '../assets/Robotics/render.jpg';
import robot from '../assets/Robotics/robot.JPG';

const prerender = navigator.userAgent === 'ReactSnap';
//Reference: https://ueno.co, GCPS Robotics Website - Best Robotics Competition
const title = 'This page is a WIP';
const description = 'Creating the website and the tools that won Best Robotics\' State Competition.';
const roles = [
  'Front-end Development',
  'Back-end Development',
  'UI / UX Design',
  'Visual Design',
  'Branding & Identity',
  '3D Modeling',
  '3D Animation',
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
          url="#"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage entered={!prerender}>
              <ProgressiveImage
                srcSet={`${robotics} 800w, ${robotics} 1920w`}
                placeholder={roboticsPlaceholder}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 100vw, (max-width: ${Media.tablet}) 90vw, 80vw`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <SidebarImagesText>
              <ProjectSectionHeading>Visual Identity</ProjectSectionHeading>
              <ProjectSectionText>
                ...
              </ProjectSectionText>
            </SidebarImagesText>
            <SidebarImages>
              <SidebarImage
                srcSet={`${branding}`}
                placeholder={placeholder2}
                alt="GCPS logo of a G as a cog and color palette."
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
          </ProjectSectionColumns>
          <ProjectSectionGrid>
            <ProjectSectionGridBackground>
              <ProgressiveImage
                srcSet={`${clawbot}`}
                placeholder={placeholder2}
                alt="A 3D render of a VEX Robotics Clawbot."
                sizes={`(max-width: ${Media.mobile}) 312px, (max-width: ${Media.tablet}) 408px, 514px`}
              />
            </ProjectSectionGridBackground>
            <ProjectSectionGridText>
              <ProjectSectionHeading>Title</ProjectSectionHeading>
              <ProjectSectionText>
                ...
              </ProjectSectionText>
            </ProjectSectionGridText>
          </ProjectSectionGrid>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Title</ProjectSectionHeading>
              <ProjectSectionText>
                ...
              </ProjectSectionText>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${competitionSite}`}
              placeholder={placeholder2}
              alt="A 3D website featuring competition details and a live render of the robot."
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionGrid>
            <ProjectSectionGridBackground>
              <ProgressiveImage
                srcSet={`${robotCourse} 400w, ${robotCourse} 898w`}
                placeholder={placeholder2}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 312px, (max-width: ${Media.tablet}) 408px, 514px`}
              />
            </ProjectSectionGridBackground>
            <ProjectSectionGridText>
              <ProjectSectionHeading>Title</ProjectSectionHeading>
              <ProjectSectionText>
                ...
              </ProjectSectionText>
            </ProjectSectionGridText>
          </ProjectSectionGrid>
          <ProjectSection>
            <ProjectSectionContent>
            <ProjectSectionColumns>
              <SidebarImagesText>
                <ProjectSectionHeading>Title</ProjectSectionHeading>
                <ProjectSectionText>
                  ...
                </ProjectSectionText>
              </SidebarImagesText>
              <SidebarImages>
                <SidebarImage
                  srcSet={`${robot} 400w, ${robot} 898w`}
                  placeholder={placeholder2}
                  alt=""
                  sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
                />
              </SidebarImages>
            </ProjectSectionColumns>
              <ProjectTextRow>
                <ProjectSectionHeading>Title</ProjectSectionHeading>
                <ProjectSectionText>
                  ...
                </ProjectSectionText>
              </ProjectTextRow>
              <ProgressiveImage
                srcSet={`${placeholder2}`}
                placeholder={placeholder2}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </ProjectSectionContent>
          </ProjectSection>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Title</ProjectSectionHeading>
              <ProjectSectionText>
                ...
              </ProjectSectionText>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${gcpsDash}`}
              placeholder={gcpsDashPlaceholder}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectFooter
          title='BEST Robotics Current Events'
          url="/#work5"
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
