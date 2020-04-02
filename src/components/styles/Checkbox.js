import styled from 'styled-components';

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  &:checked {
    background-color: ${props => props.theme.mainBrand};
  }
`;
export default Checkbox;
