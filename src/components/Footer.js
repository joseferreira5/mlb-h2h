import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.darkShade};
  color: ${props => props.theme.lightShade};
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
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
