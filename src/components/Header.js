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
  font-family: 'Raleway', sans-serif;
  margin-left: 1.7em;
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <Title>MLB H2H</Title>
      </StyledLink>
    </StyledHeader>
  );
}
