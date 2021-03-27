import styled from 'styled-components';

const TeamLogo = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  align-self: center;
  grid-column: ${props => props.column};
  grid-row: 3 / 4;
`;

export default TeamLogo;
