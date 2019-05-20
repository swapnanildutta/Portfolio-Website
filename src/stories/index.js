import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components/macro';
import { Button } from '../components/Button';
import Input from '../components/Input';
import Anchor from '../components/Anchor';
import Monogram from '../components/Monogram';
import DisplacementSphere from '../components/DisplacementSphere';
import LabScene from '../components/LabScene';
import DecoderText from '../components/DecoderText';
import { useFormInput } from '../utils/Hooks';

const StoryContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
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

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .add('Default', () =>
    <StoryContainer padding={30} gutter={30}>
      <Button primary onClick={action('clicked')}>Primary</Button>
      <Button secondary onClick={action('clicked')}>Secondary</Button>
    </StoryContainer>
  )
  .add('Icon', () =>
    <StoryContainer padding={30} gutter={30}>
      <Button primary icon="send" onClick={action('clicked')}>Icon left</Button>
      <Button primary iconRight="arrowRight" onClick={action('clicked')}>Icon right</Button>
      <Button secondary icon="arrowRight" onClick={action('clicked')}>Secondary icon</Button>
    </StoryContainer>
  )
  .add('Loader', () =>
    <StoryContainer padding={30}>
      <LoadableButton primary>Click to load</LoadableButton>
    </StoryContainer>
  );

storiesOf('Threejs Scenes', module)
  .add('Home', () =>
    <DisplacementSphere />
  )
  .add('Lab', () =>
    <LabScene />
  );

const ExampleInput = props => {
  const exampleValue = useFormInput('');
  return (
    <div style={{ maxWidth: 400, width: '100%', padding: 30 }}>
      <Input {...exampleValue} {...props} />
    </div>
  );
};

storiesOf('Links', module)
  .add('Default', () =>
    <StoryContainer padding={30}>
      <Anchor href="#">Anchor Link</Anchor>
    </StoryContainer>
  );

storiesOf('Monogram', module)
  .add('Monogram', () =>
    <StoryContainer padding={30}>
      <Monogram />
    </StoryContainer>
  );

storiesOf('Text input', module)
  .add('Text', () =>
    <ExampleInput label="Your name" type="text" />
  )
  .add('Multiline', () =>
    <ExampleInput multiline label="Type a message" type="text" />
  );

storiesOf('Decoder Text', module)
  .add('Default', () =>
    <StoryContainer padding={30}>
      <h2 style={{ fontWeight: 500, margin: 0 }}>
        <DecoderText start text="Cool matrix text" />
      </h2>
    </StoryContainer>
  );
