import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { AppContext } from '../app/App';
import ProgressiveImage from '../components/ProgressiveImage';
import { useScrollToTop } from '../utils/Hooks';
import Footer from '../components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectSectionHeading, ProjectSectionText, ProjectBackground, ProjectHeader,
  ProjectFooter, ProjectTextRow
} from '../components/Project';
import { media } from '../utils/StyleUtils';
import placeholder2 from '../assets/placeholder.png';
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

function MystGang(props) {
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
                sizes={`(max-width: ${media.mobile}) 100vw, (max-width: ${media.tablet}) 90vw, 80vw`}
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
                placeholder={placeholder2}
                alt=""
                sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
          </ProjectSectionColumns>
          <ProjectSectionGrid>
            <ProjectSectionGridBackground>
              <ProgressiveImage
                srcSet={`${branding}`}
                placeholder={placeholder2}
                alt=""
                sizes={`(max-width: ${media.mobile}) 312px, (max-width: ${media.tablet}) 408px, 514px`}
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
                placeholder={placeholder2}
                alt="Animated site design."
                sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
              />
              </SidebarImages>
            <SidebarImages>
              <SidebarImage
                srcSet={`${two} 400w, ${two} 898w`}
                placeholder={placeholder2}
                alt="Creating the site as well as a 3D loading animation."
                sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
          </ProjectSectionGrid>
          <ProgressiveImage
            srcSet={`${three}`}
            placeholder={placeholder2}
            alt="Creating the 3D scene in ThreeJS."
            sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
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
                placeholder={placeholder2}
                alt="Throwing some ribbons in."
                sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
              />
              </SidebarImages>
            <SidebarImages>
              <SidebarImage
                srcSet={`${five} 400w, ${five} 898w`}
                placeholder={placeholder2}
                alt="Adding color to the scene."
                sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
              />
            </SidebarImages>
          </ProjectSectionGrid>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Final Website</ProjectSectionHeading>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${home}`}
              placeholder={placeholder2}
              alt="Interactive 3D home screen."
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${work}`}
              placeholder={placeholder2}
              alt="Interactive 3D work carousel."
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
            />
            <ProgressiveImage
              srcSet={`${about}`}
              placeholder={placeholder2}
              alt="Interactive 3D about and contact page."
              sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
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

export default MystGang;
