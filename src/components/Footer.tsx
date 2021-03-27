import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #0b0d1d;
  color: ${props => props.theme.lightShade};
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 3em;
  font-size: 0.8rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <p>
        Data provided by{' '}
        <a href="https://appac.github.io/mlb-data-api-docs/">MLB Data API</a>
      </p>
      <p>Jose Ferreira &copy; 2020</p>
    </StyledFooter>
  );
}
