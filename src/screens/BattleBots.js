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
import background from '../assets/BattleBots/botBack.webp';
import BotProject from '../assets/BattleBots/botProject.webp';
import BotProjectPlaceholder from '../assets/BattleBots/botProjectPlaceholder.png';
import botsProto from '../assets/BattleBots/botsProto.webp';
import botsScoreProto from '../assets/BattleBots/botsScoreProto.webp';
import botTruck from '../assets/BattleBots/botTruck.webp';
import renderFiber from '../assets/BattleBots/RenderFiber.webp';
import robotRender from '../assets/BattleBots/Robot_Render.webp';
import botThree from '../assets/BattleBots/botThree.webp';
import arenaOne from '../assets/BattleBots/arenaOne.png';
import arenaTwo from '../assets/BattleBots/arenaTwo.png';
import arenaFinal from '../assets/BattleBots/arenaFinal.png';
import botLogin from '../assets/BattleBots/botLogin.png';
import botAdmin from '../assets/BattleBots/botAdmin.png';
import botScore from '../assets/BattleBots/botScore.png';
import splash from '../assets/BattleBots/splash.png';

const prerender = navigator.userAgent === 'ReactSnap';
//Reference: https://ueno.co
const title = 'BattleBots 2019 (WIP)';
const description = 'Inspiring Local Communities with Engineering.';
const roles = [
  'Front-end Development',
  'Back-end Development',
  '3D Animation',
  'UI / UX Design',
  'Visual Design',
  'Creative Direction',
  'Outreach',
];

function BattleBots(props) {
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
                srcSet={`${BotProject} 800w, ${BotProject} 1920w`}
                placeholder={BotProjectPlaceholder}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 100vw, (max-width: ${Media.tablet}) 90vw, 80vw`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <SidebarImagesText>
              <ProjectSectionHeading>Ready Player 1</ProjectSectionHeading>
              <ProjectSectionText>
                Content
              </ProjectSectionText>
            </SidebarImagesText>
            <SidebarImages2>
              <SidebarImage
                srcSet={`${splash} 800w, ${splash} 1440w`}
                placeholder={placeholder2}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </SidebarImages2>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Design, Build, Animate</ProjectSectionHeading>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${botTruck} 800w, ${botTruck} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
          <ProjectSectionGrid>
            <ProjectSectionGridBackground>
              <ProgressiveImage
                srcSet={`${robotRender} 400w, ${robotRender} 898w`}
                placeholder={placeholder2}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 312px, (max-width: ${Media.tablet}) 408px, 514px`}
              />
            </ProjectSectionGridBackground>
            <ProjectSectionGridText>
              <ProjectSectionHeading>PixiJS - Prisma Distortion</ProjectSectionHeading>
              <ProjectSectionText>
                An early prototype using distortion with octagonal-shaped displacement shaders.
              </ProjectSectionText>
            </ProjectSectionGridText>
          </ProjectSectionGrid>
          <ProjectSectionColumns>
            <SidebarImagesText>
              <ProjectSectionHeading>PixiJS - Ripple Distortion</ProjectSectionHeading>
              <ProjectSectionText>
                An early prototype using distortion with rippling displacement shaders.
              </ProjectSectionText>
            </SidebarImagesText>
            <SidebarImages>
              <SidebarImage
                srcSet={`${botsProto} 800w, ${botsProto} 1440w`}
                placeholder={placeholder2}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
          </ProjectSectionColumns>
          <ProjectSectionGrid>
            <ProjectSectionGridBackground>
              <ProgressiveImage
                srcSet={`${renderFiber} 400w, ${renderFiber} 898w`}
                placeholder={placeholder2}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 312px, (max-width: ${Media.tablet}) 408px, 514px`}
              />
            </ProjectSectionGridBackground>
            <ProjectSectionGridText>
              <ProjectSectionHeading>PixiJS - Fiber Distortion</ProjectSectionHeading>
              <ProjectSectionText>
                An early prototype using distortion with fibery displacement shaders.
              </ProjectSectionText>
            </ProjectSectionGridText>
          </ProjectSectionGrid>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Final Prototype</ProjectSectionHeading>
              <ProjectSectionText>
                A later prototype of a ThreeJS scene filled with vibrant geometric confetti.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${botThree} 800w, ${botThree} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
        <ProjectSectionContent>
        <ProjectTextRow>
          <ProjectSectionHeading>Game Arenas</ProjectSectionHeading>
        </ProjectTextRow>
        </ProjectSectionContent>
        <ProjectSectionColumns2>
        <SidebarImages>
          <SidebarImage
            srcSet={`${arenaOne} 800w, ${arenaOne} 1440w`}
            placeholder={placeholder2}
            alt=""
            sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
          />
        </SidebarImages>
          <SidebarImages>
            <SidebarImage
              srcSet={`${arenaTwo} 800w, ${arenaTwo} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </SidebarImages>
        </ProjectSectionColumns2>
          <ProjectSectionContent>
            <ProgressiveImage
              srcSet={`${arenaFinal} 800w, ${arenaFinal} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Scoreboard and backend interface</ProjectSectionHeading>
              <ProjectSectionText>
                Content
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectSectionColumns>
              <SidebarImagesText>
                <ProjectSectionHeading>Prototype scoreboard and admin interface</ProjectSectionHeading>
                <ProjectSectionText>
                  An early prototype powered by Firebase, featuring realtime stats of players.
                </ProjectSectionText>
              </SidebarImagesText>
              <SidebarImages2>
                <SidebarImage
                  srcSet={`${botsScoreProto} 800w, ${botsScoreProto} 1440w`}
                  placeholder={placeholder2}
                  alt=""
                  sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
                />
              </SidebarImages2>
            </ProjectSectionColumns>
            <ProgressiveImage
              srcSet={`${botLogin} 800w, ${botLogin} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${botAdmin} 800w, ${botAdmin} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${botScore} 800w, ${botScore} 1440w`}
              placeholder={placeholder2}
              alt=""
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectFooter
          title='BattleBots 2019'
          url="/#work4"
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

const ProjectSectionColumns2 = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${Media.tablet}) {
    grid-template-columns: 1fr;
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

const SidebarImages2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, [col] 1fr);
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

export default BattleBots;
