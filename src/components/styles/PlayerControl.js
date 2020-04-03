import styled from 'styled-components';

const PlayerControl = styled.div`
  grid-column: ${props => props.column};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 80%;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  h2 {
    margin-bottom: 0.2em;
  }
`;

export default PlayerControl;
