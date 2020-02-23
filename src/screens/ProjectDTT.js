import React, { Fragment } from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { LinkButton } from 'components/Button';
import ProgressiveImage from 'components/ProgressiveImage';
import Footer from 'components/Footer';
import {
  ProjectContainer, ProjectBackground, ProjectHeader, ProjectSection,
  ProjectSectionContent, ProjectImage, ProjectSectionHeading, ProjectSectionText,
  ProjectSectionColumns, SidebarImageText, SidebarImage, ProjectTextRow
} from 'components/Project';
import { useScrollRestore } from 'hooks';
import { rgba } from 'utils/style';
import prerender from 'utils/prerender';
import dttBackground from 'assets/dtt-background.png';
import dttBackgroundLarge from 'assets/dtt-background-large.png';
import dttBackgroundPlaceholder from 'assets/dtt-background-placeholder.png';
import dtt from 'assets/dtt.png';
import dttLarge from 'assets/dtt-large.png';
import dttPlaceholder from 'assets/dtt-placeholder.png';
import dttBranding from 'assets/dtt-branding.png';
import dttBrandingPlaceholder from 'assets/dtt-branding-placeholder.png';
import dttTool from 'assets/dtt-tool.png';
import dttToolPlaceholder from 'assets/dtt-tool-placeholder.png';
import dttPipeline from 'assets/dtt-pipeline.png';
import dttPipelineLarge from 'assets/dtt-pipeline-large.png';
import dttPipelinePlaceholder from 'assets/dtt-pipeline-placeholder.png';
import dttAPI from 'assets/dtt-api.png';
import dttAPIPlaceholder from 'assets/dtt-api-placeholder.png';
import dttLogo from 'assets/dtt-logo.png';
import dttLogoLarge from 'assets/dtt-logo-large.png';
import dttLogoPlaceholder from 'assets/dtt-logo-placeholder.png';

const title = 'A Tool for Everything';
const description = 'I lead the design and development of DevTech Tools. We focused on creating the best platform for developers to build better software.';
const roles = [
  'Visual Identity',
  'UX and UI Design',
  'Full-stack Development',
];

function ProjectDTT() {
  const theme = useTheme();
  useScrollRestore();

  return (
    <Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description }]}
      />
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${dttBackground} 1000w, ${dttBackgroundLarge} 1920w`}
          placeholder={dttBackgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://devtechtools.com"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage>
              <ProgressiveImage
                reveal
                srcSet={`${dtt} 800w, ${dttLarge} 1440w`}
                placeholder={dttPlaceholder}
                sizes={`(max-width: ${theme.mobile}px) 500px, (max-width: ${theme.tablet}px) 800px, 1000px`}
                alt="Landing screen of the DevTech Tools website."
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <SidebarImageText>
              <ProjectSectionHeading>Visual Identity</ProjectSectionHeading>
              <ProjectSectionText>
                We represented the technology aspect of DevTech Tools with a bundle of traces, accompanied with fresh colors and a crisp typeface.
              </ProjectSectionText>
            </SidebarImageText>
            <SidebarImage
              srcSet={dttBranding}
              placeholder={dttBrandingPlaceholder}
              sizes={`(max-width: ${theme.mobile}px) 100vw, (max-width: ${theme.tablet}px) 100vw, 50vw`}
              alt="The DevTech Tools color palette and logo, featuring pipelines as electronic traces."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextSingle>
              <ProjectSectionHeading>The Mission</ProjectSectionHeading>
              <ProjectSectionText>
                DevTech Tools started as a small set of developer tools that generated, parsed, and converted between data formats.
              </ProjectSectionText>
              <ProjectSectionText>
                Our mission was to create an expanding arsenal of developer tools to use in any environment, for any purpose, on one platform.
              </ProjectSectionText>
            </ProjectTextSingle>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionGrid>
            <ProgressiveImage
              srcSet={dttTool}
              placeholder={dttToolPlaceholder}
              alt="The tool wrapper of the JSON to CSV data converter."
            />
            <ProjectSectionGridText>
              <ProjectSectionHeading>Setting Sail</ProjectSectionHeading>
              <ProjectSectionText>
                DevTech Tools launched with a comprehensive set of data converters, code formatters and linters, and many other tools.
              </ProjectSectionText>
              <ProjectSectionText>
                I designed and developed a simple, intuitive interface to cut development time down to a single click.
              </ProjectSectionText>
            </ProjectSectionGridText>
          </ProjectSectionGrid>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns>
            <SidebarImageText>
              <ProjectSectionHeading>Expanding the Workflow</ProjectSectionHeading>
              <ProjectSectionText>
                Following the release of our online tools, we accompanied this release with a powerful API, giving developers complete control.
              </ProjectSectionText>
              <ProjectSectionText>
                Experienced developers now had full flexibility with our tools in their projects.
              </ProjectSectionText>
            </SidebarImageText>
            <SidebarImage
              srcSet={dttAPI}
              placeholder={dttAPIPlaceholder}
              sizes={`(max-width: ${theme.mobile}px) 100vw, (max-width: ${theme.tablet}px) 100vw, 50vw`}
              alt="A snippet from the DevTech Tools API, converting data from JSON to CSV."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Improving the Experience</ProjectSectionHeading>
              <ProjectSectionText>
                Our API gave developers complete control of their tools, but our interface lacked this flexibility with customization limited to each tool.
              </ProjectSectionText>
              <ProjectSectionText>
                With the release of DevTech Tools Pipelines, tools combine into one with custom triggers, events, and other actions.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProgressiveImage
              srcSet={`${dttPipeline} 800w, ${dttPipelineLarge} 1440w`}
              placeholder={dttPipelinePlaceholder}
              alt="A screenshot of tools linked in the pipeline flowchart editor."
              sizes={`(max-width: ${theme.mobile}px) 500px, (max-width: ${theme.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectBackgroundSection>
          <ProjectSectionBackgroundImage
            srcSet={`${dttBackground} 1280w, ${dttBackgroundLarge} 1920w`}
            placeholder={dttBackgroundPlaceholder}
            alt="The brand image of DevTech Tools, featuring a colorful field of shapes and tools."
            sizes={`100vw`}
          />
          <ProjectSection as="div">
            <ProjectSectionContent>
              <ProjectTextRow center centerMobile noMargin>
                <ProgressiveImage
                  srcSet={`${dttLogo} 180w, ${dttLogoLarge} 320w`}
                  placeholder={dttLogoPlaceholder}
                  alt="The DevTech Tools logo."
                  sizes={`(max-width: ${theme.mobile}px) 100vw, (max-width: ${theme.tablet}px) 100vw, 220px`}
                  style={{ maxWidth: 220, width: '100%', marginBottom: 30 }}
                />
                <ProjectSectionHeading>Wrapping Up</ProjectSectionHeading>
                <ProjectSectionText>
                  We released DevTech Tools to the world, giving developers the power to speed-up and automate their workflows.
                </ProjectSectionText>
                <LinkButton
                  secondary
                  iconHoverShift
                  style={{ paddingLeft: '3px' }}
                  icon="chevronRight"
                  target="_blank"
                  href="https://devtechtools.com"
                >
                  Visit DevTech Tools
                </LinkButton>
              </ProjectTextRow>
            </ProjectSectionContent>
          </ProjectSection>
        </ProjectBackgroundSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}

const ProjectTextSingle = styled(ProjectTextRow)`
  margin-bottom: 0;
`;

const ProjectSectionGrid = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 40px 0;

  @media (max-width: ${props => props.theme.tablet}px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectSectionGridText = styled.div``;

const ProjectBackgroundSection = styled.section`
  display: grid;
  grid-template-columns: 100%;

  ${ProjectSection} {
    grid-column: 1;
    grid-row: 1;
  }

  ${ProjectSectionContent} {
    padding: 120px 0 140px;

    @media (max-width: ${props => props.theme.laptop}px) {
      padding: 40px 0 100px;
    }

    @media (max-width: ${props => props.theme.tablet}px) {
      padding: 30px 0 60px;
    }

    @media (max-width: ${props => props.theme.mobile}px) {
      padding: 20px 0 40px;
    }
  }
`;

const ProjectSectionBackgroundImage = styled(ProgressiveImage)`
  grid-column: 1;
  grid-row: 1;

  img {
    object-fit: cover;
    justify-self: stretch;
    align-self: stretch;
  }

  div::after {
    content: '';
    grid-column: 1;
    grid-row: 1;
    z-index: 1;
    position: relative;
    background:
      linear-gradient(
        ${props => rgba(props.theme.colorBackground, 1)} 0%,
        ${props => rgba(props.theme.colorBackground, 0.9)} 20%,
        ${props => rgba(props.theme.colorBackground, 0)} 100%),
      linear-gradient(
        ${props => rgba(props.theme.colorBackground, 0)} 0%,
        ${props => rgba(props.theme.colorBackground, 0.9)} 80%,
        ${props => rgba(props.theme.colorBackground, 1)} 100%);
  }
`;

export default ProjectDTT;
