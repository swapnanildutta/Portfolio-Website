import React from 'react';
import { Helmet } from 'react-helmet';
import ProgressiveImage from '../components/ProgressiveImage';
import ScrollToTop from '../utils/ScrollToTop';
import Footer from '../components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectSectionHeading/*, ProjectBackground*/, ProjectHeader, ProjectSource
} from '../components/Project';
import { Media } from '../utils/StyleUtils';
import BotProject from '../assets/botProject.gif';
import BotProjectPlaceholder from '../assets/botProjectPlaceholder.png';
/*import BackgroundGate from '../assets/gate-background.jpg';
import BackgroundGateLarge from '../assets/gate-background-large.jpg';
import BackgroundGatePlaceholder from '../assets/gate-background-placeholder.jpg';*/


const prerender = window.location.port === '45678';

const title = 'Inspiring Local Communities with Engineering';
const description = "TODO";
const roles = [
  'UX and UI Design',
  'Fullstack Development',
  '3D Modeling, Animation, Rendering',
];

const GCPSBattleBots = ({ status }) => (
  <React.Fragment>
    <ScrollToTop status={status} />
    <Helmet>
      <title>{`Projects | ${title}`}</title>
      <meta name="description" content={description} />
    </Helmet>
    <ProjectContainer>
      {false && {/*<ProjectBackground
        srcSet={`${BackgroundGate} 1000w, ${BackgroundGateLarge} 1920w`}
        placeholder={BackgroundGatePlaceholder}
        entered={!prerender}
      />*/}}
      <ProjectHeader
        title={title}
        description={description}
        url="https://bots.codyb.co"
        roles={roles}
      />
      <ProjectSection>
        <ProjectSectionContent>
          <ProjectImage entered={!prerender}>
            <ProgressiveImage
              srcSet={`${BotProject} 800w, ${BotProject} 1440w`}
              placeholder={BotProjectPlaceholder}
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              width="1280px"
              height="800px"
            />
          </ProjectImage>
          <ProjectSource
            description="View the project on GitHub"
            url="https://github.com/ZeroMemes/GCPSBattleBots"
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

export default GCPSBattleBots;
window.scrollTo(0, 0);
