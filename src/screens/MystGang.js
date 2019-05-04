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
import background from '../assets/MystGang/mystGangBack.gif';
import render from '../assets/MystGang/MystGang.webp';
import renderPlaceholder from '../assets/MystGang/MystGangPlaceholder.png';
import branding from '../assets/MystGang/mystBranding.png';
import mystGangAnimation from '../assets/MystGang/mystGangAnimation.webp';
import one from '../assets/MystGang/1.webp';
import two from '../assets/MystGang/2.webp';
import three from '../assets/MystGang/3.webp';
import four from '../assets/MystGang/4.webp';
import five from '../assets/MystGang/5.webp';
import zeroP from '../assets/MystGang/p0.webp';
import oneP from '../assets/MystGang/p1.webp';
import twoP from '../assets/MystGang/p2.webp';
import threeP from '../assets/MystGang/p3.webp';
import home from '../assets/MystGang/home.webp';
import work from '../assets/MystGang/work.webp';
import about from '../assets/MystGang/about.webp';
const prerender = navigator.userAgent === 'ReactSnap';
const title = 'MystGang 2019';
const description = 'Bringing an epic content creator\'s portfolio to life with ThreeJS.';
const roles = [
  'Front-end Development',
  'Back-end Development',
  'Visual Design',
  'UI / UX Design',
  'Branding & Identity',
  'Creative Direction',
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
          url="https://mystgang.ml"
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
              <ProjectSectionHeading>A Truly Epic Logo</ProjectSectionHeading>
            </SidebarImagesText>
            <SidebarImages>
              <SidebarImage
                srcSet={`${mystGangAnimation}`}
                placeholder={mystGangAnimation}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
          </ProjectSectionColumns>
          <ProjectSectionGrid>
            <ProjectSectionGridBackground>
              <ProgressiveImage
                srcSet={`${branding}`}
                placeholder={branding}
                alt=""
                sizes={`(max-width: ${Media.mobile}) 312px, (max-width: ${Media.tablet}) 408px, 514px`}
              />
            </ProjectSectionGridBackground>
            <ProjectSectionGridText>
              <ProjectSectionHeading>Visual Identity</ProjectSectionHeading>
            </ProjectSectionGridText>
          </ProjectSectionGrid>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Prototyping</ProjectSectionHeading>
            </ProjectTextRow>
          </ProjectSectionContent>
          <ProjectSectionGrid>
            <SidebarImages>
              <SidebarImage
                srcSet={`${one} 400w, ${one} 898w`}
                placeholder={one}
                alt="Animated site design."
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
              </SidebarImages>
            <SidebarImages>
              <SidebarImage
                srcSet={`${two} 400w, ${two} 898w`}
                placeholder={two}
                alt="Creating the site as well as a 3D loading animation."
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
          </ProjectSectionGrid>
          <ProgressiveImage
            srcSet={`${three}`}
            placeholder={three}
            alt="Creating the 3D scene in ThreeJS."
            sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
          />
          <ProjectTextRow>
            <ProjectSectionHeading>&nbsp;</ProjectSectionHeading>
            <ProjectSectionHeading>Prototyping Continued..</ProjectSectionHeading>
            <ProjectSectionText>
              Sprinkling some 3D magic with ThreeJS.
            </ProjectSectionText>
          </ProjectTextRow>
          <ProjectSectionGrid>
            <SidebarImages>
              <SidebarImage
                srcSet={`${four} 400w, ${four} 898w`}
                placeholder={four}
                alt="Throwing some ribbons in."
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
              </SidebarImages>
            <SidebarImages>
              <SidebarImage
                srcSet={`${five} 400w, ${five} 898w`}
                placeholder={five}
                alt="Adding color to the scene."
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
          </ProjectSectionGrid>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Earlier Prototypes</ProjectSectionHeading>
            </ProjectTextRow>
            <ProjectSectionGrid>
            <SidebarImages>
              <SidebarImage
                srcSet={`${zeroP} 400w, ${zeroP} 898w`}
                placeholder={zeroP}
                alt="Desktop view of a prototype with a 3D scene from a 2D carousel."
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
              </SidebarImages>
            <SidebarImages>
              <SidebarImage
                srcSet={`${oneP} 400w, ${oneP} 898w`}
                placeholder={oneP}
                alt="Mobile view of a prototype with a 3D scene from a 2D carousel."
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
            <SidebarImages>
              <SidebarImage
                srcSet={`${twoP} 400w, ${twoP} 898w`}
                placeholder={twoP}
                alt="Mobile view of a vertical one-page site featuring a interactive carousel."
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
            <SidebarImages>
              <SidebarImage
                srcSet={`${threeP} 400w, ${threeP} 898w`}
                placeholder={threeP}
                alt="Desktop view of a horizontal one-page site featuring a interactive carousel."
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
          </SidebarImages>
          </ProjectSectionGrid>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Final Website</ProjectSectionHeading>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${home}`}
              placeholder={home}
              alt="Interactive 3D home screen."
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${work}`}
              placeholder={work}
              alt="Interactive 3D work carousel."
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${about}`}
              placeholder={about}
              alt="Interactive 3D about and contact page."
              sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectFooter
          title='MystGang 2019'
          url="/#work2"
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
