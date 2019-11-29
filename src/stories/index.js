import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components/macro';
import { Button } from 'components/Button';
import Input from 'components/Input';
import Anchor from 'components/Anchor';
import Monogram from 'components/Monogram';
import DisplacementSphere from 'components/DisplacementSphere';
import DisplacementCarousel from 'components/DisplacementCarousel';
import DecoderText from 'components/DecoderText';
import Loader from 'components/Loader';
import { useFormInput } from 'hooks';
import mystgangSplash from 'assets/mystgang-splash.png';
import mystgangSplashPlaceholder from 'assets/mystgang-splash-placeholder.png';
import mystgangHome from 'assets/mystgang-home.png';
import mystgangMenu from 'assets/mystgang-menu.png';
import mystgangWork from 'assets/mystgang-work.png';
import mystgangAboutSelf from 'assets/mystgang-about-self.png';
import mystgangAboutWork from 'assets/mystgang-about-work.png';
import mystgangAboutSocials from 'assets/mystgang-about-socials.png';
import mystgangContact from 'assets/mystgang-contact.png';

const StoryContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${props => props.fullWidth ? '100%' : 'max-content'};
  align-items: flex-start;
  justify-items: flex-start;

  ${props => props.padding && `
    padding: ${props.padding}px;
  `}

  ${props => props.gutter && `
    grid-gap: ${props.gutter}px;
  `}
`;

const LoadableButton = props => {
  const [loading, setLoading] = useState(false);
  return (
    <Button loading={loading} onClick={() => setLoading(!loading)} {...props} />
  );
};

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('primary', () =>
    <StoryContainer padding={30} gutter={30}>
      <Button primary onClick={action('clicked')}>Text only</Button>
      <Button primary icon="send" onClick={action('clicked')}>Icon left</Button>
      <Button primary iconRight="arrowRight" onClick={action('clicked')}>Icon right</Button>
    </StoryContainer>
  )
  .add('secondary', () =>
    <StoryContainer padding={30} gutter={30}>
      <Button secondary onClick={action('clicked')}>Text only</Button>
      <Button secondary icon="arrowRight" onClick={action('clicked')}>Icon left</Button>
      <Button secondary iconRight="arrowRight" onClick={action('clicked')}>Icon right</Button>
    </StoryContainer>
  )
  .add('icon only', () =>
    <StoryContainer padding={30} gutter={20}>
      <Button iconOnly aria-label="Send" icon="send" onClick={action('clicked')}></Button>
      <Button iconOnly aria-label="Dribbble" icon="dribbble" onClick={action('clicked')}></Button>
      <Button iconOnly aria-label="Close" icon="close" onClick={action('clicked')}></Button>
    </StoryContainer>
  )
  .add('loader', () =>
    <StoryContainer padding={30}>
      <LoadableButton primary>Click to load</LoadableButton>
    </StoryContainer>
  );

storiesOf('Displacement sphere', module)
  .add('sphere', () =>
    <StoryContainer>
      <DisplacementSphere />
    </StoryContainer>
  );

const ExampleInput = props => {
  const exampleValue = useFormInput('');
  return (
    <div style={{ maxWidth: 400, width: '100%', padding: 30 }}>
      <Input {...exampleValue} {...props} />
    </div>
  );
};

storiesOf('Link', module)
  .add('anchor', () =>
    <StoryContainer padding={30} gutter={30} style={{ fontSize: 18 }}>
      <Anchor href="#" onClick={(e) => e.preventDefault()}>Anchor link</Anchor>
      <Anchor secondary href="#" onClick={(e) => e.preventDefault()}>Secondary link</Anchor>
    </StoryContainer>
  );

storiesOf('Monogram', module)
  .add('monogram', () =>
    <StoryContainer padding={30}>
      <Monogram highlight />
    </StoryContainer>
  );

storiesOf('Text input', module)
  .add('text', () =>
    <ExampleInput label="Your name" type="text" />
  )
  .add('multiline', () =>
    <ExampleInput multiline label="Type a message" type="text" />
  );

storiesOf('Decoder text', module)
  .add('text', () =>
    <StoryContainer padding={30}>
      <h2 style={{ fontWeight: 500, margin: 0 }}>
        <DecoderText start text="Decoder text" />
      </h2>
    </StoryContainer>
  );

storiesOf('Displacement slider', module)
  .add('MystGang', () =>
    <StoryContainer fullWidth padding={30}>
      <DisplacementCarousel
        style={{ maxWidth: 800, width: '100%' }}
        placeholder={mystgangSplashPlaceholder}
        images={[
          {
            src: mystgangSplash,
            srcset: mystgangSplash,
            alt: 'MystGang Splash Screen',
            override: true
          },
          {
            src: mystgangHome,
            srcset: mystgangHome,
            alt: 'Home Screen',
          },
          {
            src: mystgangMenu,
            srcset: mystgangMenu,
            alt: 'Fullscreen Menu',
          },
          {
            src: mystgangWork,
            srcset: mystgangWork,
            alt: 'Work Screen',
          },
          {
            src: mystgangAboutSelf,
            srcset: mystgangAboutSelf,
            alt: 'About Self'
          },
          {
            src: mystgangAboutWork,
            srcset: mystgangAboutWork,
            alt: 'About Work',
          },
          {
            src: mystgangAboutSocials,
            srcset: mystgangAboutSocials,
            alt: 'About Socials',
          },
          {
            src: mystgangContact,
            srcset: mystgangContact,
            alt: 'Contact Screen',
          },
        ]}
        width={1920}
        height={1080}
      />
    </StoryContainer>
  );

storiesOf('Loader', module)
  .add('default', () =>
    <StoryContainer padding={30}>
      <Loader size={48} />
    </StoryContainer>
  );

