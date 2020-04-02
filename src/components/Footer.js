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

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function Footer(props) {
  return (
    <StyledFooter {...props}>
      <p>
        Data provided by{' '}
        <a href="https://appac.github.io/mlb-data-api-docs/">MLB Data API</a>
      </p>
      <p>&copy; Jose Ferreira 2020</p>
    </StyledFooter>
  );
}
