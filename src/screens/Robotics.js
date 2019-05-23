import React, { useContext, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { AppContext } from '../app/App';
import ProgressiveImage from '../components/ProgressiveImage';
import { useScrollToTop } from '../utils/Hooks';
import Footer from '../components/Footer';
import { RouterButton } from '../components/Button';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectSectionHeading, ProjectSectionText, ProjectBackground, ProjectHeader,
  ProjectTextRow
} from '../components/Project';
import { media } from '../utils/StyleUtils';
import placeholder2 from '../assets/placeholder.png';
import background from '../assets/Robotics/background.webp';
import robotics from '../assets/Robotics/robotics.webp';
import roboticsPlaceholder from '../assets/Robotics/roboticsPlaceholder.webp';
import branding from '../assets/Robotics/branding.webp';
import clawbot from '../assets/Robotics/clawbot.webp';
import competitionSite from '../assets/Robotics/3drobot.webp';
import gcpsDash from '../assets/Robotics/gcps-dash-large.webp';
import gcpsDashPlaceholder from '../assets/Robotics/gcps-dash-placeholder.webp';
import firmware from '../assets/Robotics/firmware.webp';
import robotCourse from '../assets/Robotics/render.webp';
import robot from '../assets/Robotics/robot2.webp';
import home from '../assets/Robotics/home.webp';
import game from '../assets/Robotics/game.webp';
import robotS from '../assets/Robotics/robot.webp';
import impact from '../assets/Robotics/impact.webp';

const prerender = navigator.userAgent === 'ReactSnap';
const title = 'GCPS Robotics';
const description = 'Creating the website and the robot core that won the BEST Robotics State Competition.';
const roles = [
  'Front-end Development',
  'Back-end Development',
  'Software Development',
  'UI / UX Design',
  'Visual Design',
  'Branding & Identity',
  '3D Modeling',
  '3D Animation',
];

function Robotics(props) {
  const { status, updateTheme, currentTheme } = useContext(AppContext);
  const currentThemeRef = useRef(currentTheme);
  useScrollToTop(status);

  useEffect(() => {
    currentThemeRef.current = currentTheme;
  }, [currentTheme]);

  useEffect(() => {
    if ((status === 'entered' || status === 'exiting')) {
      updateTheme({
        colorPrimary: 'rgba(54, 210, 120, 1)',
        colorAccent: 'rgba(54, 210, 120, 1)',
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
        <ProjectBackground
          srcSet={`${background} 1000w, ${background} 1920w`}
          opacity={0.8}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://github.com/CodyJasonBennett/GCPS-Site"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage entered={!prerender}>
              <ProgressiveImage
                srcSet={`${robotics} 800w, ${robotics} 1920w`}
                placeholder={roboticsPlaceholder}
                alt=""
                sizes={`(max-width: ${media.mobile}) 100vw, (max-width: ${media.tablet}) 90vw, 80vw`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <SidebarImagesText>
              <ProjectSectionHeading>Visual Identity</ProjectSectionHeading>
              <ProjectSectionText>
                Of GCPS' green and orange color scheme, gators' green is the color of the team, backed up by a firm dark color scheme.
              </ProjectSectionText>
            </SidebarImagesText>
            <SidebarImages>
              <SidebarImage
                srcSet={`${branding}`}
                placeholder={placeholder2}
                alt="GCPS logo of a G as a cog and color palette."
                sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
          </ProjectSectionColumns>
          <ProjectSectionGrid>
            <ProjectSectionGridBackground>
              <ProgressiveImage
                srcSet={`${clawbot}`}
                placeholder={placeholder2}
                alt="A 3D render of a VEX Robotics Clawbot."
                sizes={`(max-width: ${media.mobile}) 312px, (max-width: ${media.tablet}) 408px, 514px`}
              />
            </ProjectSectionGridBackground>
            <ProjectSectionGridText>
              <ProjectSectionHeading>VEX Clawbot</ProjectSectionHeading>
              <ProjectSectionText>
                The robot that inspired GCPS' Robotics team to compete in BEST's 2018 Current Events competition.
              </ProjectSectionText>
            </ProjectSectionGridText>
          </ProjectSectionGrid>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Take 1 - A 3D Approach</ProjectSectionHeading>
              <ProjectSectionText>
                A fully interactive 3D website to recruit team members.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${competitionSite}`}
              placeholder={placeholder2}
              alt="A 3D website featuring competition details and a live render of the robot."
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>The Interface of Success</ProjectSectionHeading>
              <ProjectSectionText>
                Designed and built from the ground up, this team-based interface guided the inner divisions of the team into productive workspaces, complete with integrated Autodesk apps and a networked chat room powered by Google's FireBase.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${gcpsDash}`}
              placeholder={gcpsDashPlaceholder}
              alt=""
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Powering Up</ProjectSectionHeading>
              <ProjectSectionText>
                The firmware and robot core that won Best Robotics' 2018 State Competition.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${firmware}`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Creating the Robot</ProjectSectionHeading>
            <ProjectSectionText>
              Model and renders of the final robot I did in Autodesk's Fusion 360.
            </ProjectSectionText>
          </ProjectTextRow>
          <ProjectSectionContent>
            <ProjectSectionColumns>
              <SidebarImages>
                <SidebarImage
                  srcSet={`${robotCourse} 400w, ${robotCourse} 898w`}
                  placeholder={placeholder2}
                  alt=""
                  sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
                />
              </SidebarImages>
              <SidebarImages>
                <SidebarImage
                  srcSet={`${robot} 400w, ${robot} 898w`}
                  placeholder={placeholder2}
                  alt=""
                  sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
                />
              </SidebarImages>
            </ProjectSectionColumns>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Final Website</ProjectSectionHeading>
              <ProjectSectionText>
                A fully responsive 3d website of the Gateway Robotics team all under 10MB (~3 images in size). This website brought the team to state competition through the BEST Website Award.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${home}`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${game}`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${robotS}`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${impact}`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>GCPS Robotics</ProjectSectionHeading>
              <RouterButton
                secondary
                icon="chevronRight"
                to="/#work4"
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

const ProjectSectionColumns = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 20px 0 60px;
  @media (max-width: ${media.tablet}) {
    grid-template-columns: 1fr;
    margin: 0 0 60px;
  }
`;

const ProjectSectionGrid = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 40px 0;
  @media (max-width: ${media.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectSectionGridBackground = styled.div`
  grid-column: 1;
  grid-row: 1;
  @media (max-width: ${media.tablet}) {
    padding: 0 120px;
  }
  @media (max-width: ${media.mobile}) {
    padding: 0 60px;
  }
`;

const ProjectSectionGridText = styled.div`
  padding-top: 80px;
  @media (max-width: ${media.desktop}) {
    padding-top: 40px;
  }
  @media (max-width: ${media.tablet}) {
    padding-top: 0;
  }
`;

const SidebarImages = styled.div`
  display: grid;
  align-items: center;
  @media (max-width: ${media.tablet}) {
    padding: 0 80px;
    margin-top: 60px;
  }
  @media (max-width: ${media.mobile}) {
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
  @media (max-width: ${media.tablet}) {
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
