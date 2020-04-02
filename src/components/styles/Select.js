import styled from 'styled-components';

const Select = styled.select`
  padding: 0.3em;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 1em;
  border: 1px solid ${props => props.theme.mainBrand};
  background-color: ${props => props.theme.lightShade};
`;

export default Select;
