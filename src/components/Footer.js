import React from 'react';
import styled, { css } from 'styled-components/macro';
import Anchor from '../components/Anchor';
import { media, rgba } from '../utils/StyleUtils';

const Footer = (props) => {
  const { light } = props;
  return (
    <FooterContainer light={light} role="contentinfo">
      <FooterDate>{`© 2018-${new Date().getFullYear()}`} Cody Bennett</FooterDate>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  width: 100vw;
  padding: 70px 30px;
  z-index: 16;
  position: relative;
  font-size: 16px;
  color: ${props => rgba(props.theme.colorText, 0.6)};

  @media (max-width: ${media.tablet}) {
    padding: 60px 20px;
  }

  ${props => props.light && css`
    background: ${props.theme.colorBackgroundLight};
  `}

  ${Anchor} {
    display: inline-flex;
  }
`;

const FooterDate = styled.span`
  padding-right: 5px;
  display: inline-flex;
`;

export default Footer;
