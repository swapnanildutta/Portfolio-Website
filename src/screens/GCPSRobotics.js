import React from 'react';
import { Helmet } from 'react-helmet';
import ProgressiveImage from '../components/ProgressiveImage';
import ScrollToTop from '../utils/ScrollToTop';
import Footer from '../components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectSectionHeading, ProjectBackground, ProjectHeader2, ProjectSource
} from '../components/Project';
import { Media } from '../utils/StyleUtils';
import Background from '../assets/render.jpg';
import BackgroundLarge from '../assets/render.jpg';
import BackgroundPlaceholder from '../assets/renderPlaceholder.jpg';
import Robotics from '../assets/robotics.gif';
import RoboticsPlaceholder from '../assets/robotics.min.png';

const prerender = window.location.port === '45678';

const title = "Pushing Robotics Further";
const description = "I worked with the Gateway CPS robotics program to design and build a robotic solution for local waterways. In addition to entering Texas BEST's \"BEST Website Challenge\", my work got the team to state competition for their first time.";
const roles = [
  'State BEST Robotics Competition',
  'Front End Development',
  'Outreach & Community Service',
  '3D Modeling, Animation, Rendering',
];

const GCPSRobotics = ({ status }) => (
  <React.Fragment>
    <ScrollToTop status={status} />
    <Helmet>
      <title>{`Projects | ${title}`}</title>
      <meta name="description" content={description} />
    </Helmet>
    <ProjectContainer>
      <ProjectBackground
        srcSet={`${Background} 1000w, ${BackgroundLarge} 1920w`}
        placeholder={BackgroundPlaceholder}
        entered={!prerender}
      />
      <ProjectHeader2
        title={title}
        description={description}
        url="https://robotics.gcps.cf"
        roles={roles}
      />
      <ProjectSection>
        <ProjectSectionContent>
          <ProjectImage entered={!prerender}>
            <ProgressiveImage
              srcSet={`${Robotics} 800w, ${Robotics} 1440w`}
              placeholder={RoboticsPlaceholder}
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              width="1280px"
              height="800px"
            />
          </ProjectImage>
          <ProjectSource
            description="View the project on GiHhub"
            url="https://github.com/CodyJasonBennett/GCPS-Site"
          />
        </ProjectSectionContent>
      </ProjectSection>
      {false && <ProjectSection>
        <ProjectSectionHeading>Full project coming soon...</ProjectSectionHeading>
      </ProjectSection>}
    </ProjectContainer>
    <Footer />
  </React.Fragment>
);

export default GCPSRobotics;
window.scrollTo(0, 0);
