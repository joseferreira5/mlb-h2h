import styled from 'styled-components';

const ControlLayout = styled.div`
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-around;
  align-items: center;

  label {
    display: flex;
    align-items: center;
  }
`;

export default ControlLayout;
