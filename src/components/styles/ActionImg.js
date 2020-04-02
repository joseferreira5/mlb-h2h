import styled from 'styled-components';

const ActionImg = styled.img`
  object-fit: cover;
  max-width: 100%;
  grid-column: ${props => props.column};
  grid-row: 2 / 3;
`;

export default ActionImg;
