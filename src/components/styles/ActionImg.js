import styled from 'styled-components';

const ActionImg = styled.img`
  object-fit: cover;
  max-width: 100%;
  align-self: center;
  grid-column: ${props => props.column};
  grid-row: 3 / 4;
`;

export default ActionImg;
