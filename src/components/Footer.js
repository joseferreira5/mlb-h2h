import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.darkShade};
  color: ${props => props.theme.lightShade};
`;

export default function Footer(props) {
  return <StyledFooter {...props} />;
}
