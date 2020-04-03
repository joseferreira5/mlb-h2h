import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  background-color: black;
  height: 5em;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  font-family: 'Raleway', sans-serif;
  margin-left: 1.7em;

  span {
    font-family: 'Permanent Marker', cursive;
    color: ${props => props.theme.mainBrand};
  }
`;

const SubTitle = styled.p`
  font-size: 1rem;
  margin-left: 4.2em;
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <Title>
          MLB <span>H2H</span>
        </Title>
        <SubTitle>Head to Head Player Comparison</SubTitle>
      </StyledLink>
    </StyledHeader>
  );
}
