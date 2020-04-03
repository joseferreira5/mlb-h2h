import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  background-color: black;
  height: 5em;

  @media (max-width: 420px) {
    justify-content: center;
    margin: 0;
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 5em;

  @media (max-width: 420px) {
    margin: 0;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  font-family: 'Raleway', sans-serif;

  span {
    font-family: 'Permanent Marker', cursive;
    color: ${props => props.theme.mainBrand};
  }
`;

const SubTitle = styled.p`
  font-size: 1rem;
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
