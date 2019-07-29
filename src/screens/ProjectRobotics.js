import React, { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import ProgressiveImage from '../components/ProgressiveImage';
import { useScrollToTop } from '../utils/hooks';
import Footer from '../components/Footer';
import { RouterButton } from '../components/Button';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage, Video,
  ProjectSectionHeading, ProjectSectionText, ProjectHeader, ProjectTextRow,
  ProjectSectionColumns, SidebarImagesText, SidebarImages, SidebarImage,
  ProjectSectionGrid, ProjectSectionGridBackground, ProjectSectionGridText,
} from '../components/Project';
import { media } from '../utils/styleUtils';
import Render from '../assets/Robotics/robotics.mp4';
import RenderPlaceholder from '../assets/Robotics/roboticsPlaceholder.png';
import Branding from '../assets/Robotics/branding.webp';
import BrandingPlaceholder from '../assets/Robotics/brandingPlaceholder.png';
import Clawbot from '../assets/Robotics/clawbot.webp';
import ClawbotPlaceholder from '../assets/Robotics/clawbotPlaceholder.png';
import CompetitionSite from '../assets/Robotics/3drobot.mp4';
import CompetitionSitePlaceholder from '../assets/Robotics/3drobotPlaceholder.png';
import Dash from '../assets/Robotics/dash.webp';
import DashPlaceholder from '../assets/Robotics/dash-placeholder.png';
import Firmware from '../assets/Robotics/firmware.webp';
import FirmwarePlaceholder from '../assets/Robotics/firmwarePlaceholder.png';
import RobotCourse from '../assets/Robotics/render.webp';
import RobotCoursePlaceholder from '../assets/Robotics/renderPlaceholder.png';
import RobotRender from '../assets/Robotics/robot.webp';
import RobotRenderPlaceholder from '../assets/Robotics/robotPlaceholder.png';
import Home from '../assets/Robotics/home.webp';
import Game from '../assets/Robotics/game.webp';
import GamePlaceholder from '../assets/Robotics/gamePlaceholder.png';
import Robot from '../assets/Robotics/robot2.webp';
import RobotPlaceholder from '../assets/Robotics/robot2Placeholder.png';
import Impact from '../assets/Robotics/impact.webp';
import ImpactPlaceholder from '../assets/Robotics/impactPlaceholder.png';

const RoboticsScene = lazy(() => import('../scenes/RoboticsScene'));

const prerender = navigator.userAgent === 'ReactSnap';
const title = 'GCPS Robotics';
const description = 'Creating the website and the robot core that won the BEST Robotics State Competition Website Award.';
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

function Robotics() {
  useScrollToTop();

  return (
    <React.Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description, }]}
      />
      <ProjectContainer>
        <RoboticsScene />
        <ProjectHeader
          title={title}
          description={description}
          url="https://github.com/CodyJasonBennett/GCPS-Site"
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
          <ProjectSectionColumns>
            <SidebarImagesText>
              <ProjectSectionHeading>Visual Identity</ProjectSectionHeading>
              <ProjectSectionText>
                Of GCPS' green and orange color scheme, gators' green is the color of the team, backed up by a firm dark color scheme.
              </ProjectSectionText>
            </SidebarImagesText>
            <SidebarImages>
              <SidebarImage
                srcSet={`${Branding}`}
                placeholder={BrandingPlaceholder}
                alt="GCPS logo of a G as a cog and color palette."
                sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
          </ProjectSectionColumns>
          <ProjectSectionGrid>
            <ProjectSectionGridBackground>
              <ProgressiveImage
                srcSet={`${Clawbot}`}
                placeholder={ClawbotPlaceholder}
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
            <Video
              src={CompetitionSite}
              placeholder={CompetitionSitePlaceholder}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>The Interface of Success</ProjectSectionHeading>
              <ProjectSectionText>
                Designed and built from the ground up, this team-based interface guided the inner divisions of the team into productive workspaces, complete with integrated Autodesk apps and a networked chat room powered by Google's Firebase.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${Dash}`}
              placeholder={DashPlaceholder}
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
                The firmware and robot core that brought the team to Best Robotics' 2018 State Competition.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${Firmware}`}
              placeholder={FirmwarePlaceholder}
              alt=""
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Creating the Robot</ProjectSectionHeading>
            <ProjectSectionText>
              Field model and renders of the final robot in Autodesk's Fusion 360.
            </ProjectSectionText>
          </ProjectTextRow>
          <ProjectSectionContent>
            <ProjectSectionColumns>
              <SidebarImages>
                <SidebarImage
                  srcSet={`${RobotCourse}`}
                  placeholder={RobotCoursePlaceholder}
                  alt=""
                  sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
                />
              </SidebarImages>
              <SidebarImages>
                <SidebarImage
                  srcSet={`${RobotRender}`}
                  placeholder={RobotRenderPlaceholder}
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
                A fully responsive 3d website of the Gateway Robotics team all under 10MB (~3 images in size). This website brought the team to state competition by winning the BEST Website Award.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${Home}`}
              placeholder={RenderPlaceholder}
              alt=""
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${Game}`}
              placeholder={GamePlaceholder}
              alt=""
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${Robot}`}
              placeholder={RobotPlaceholder}
              alt=""
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${Impact}`}
              placeholder={ImpactPlaceholder}
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
                to="/#work5"
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

export default Robotics;
