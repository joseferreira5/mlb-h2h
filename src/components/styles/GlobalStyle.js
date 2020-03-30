import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    box-sizing: border-box;
    font-size: 16px;
  }
  
  *,
  ::before,
  ::after {
    box-sizing: inherit;
  }
  
  body {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    color: #000;
    background-color: #fff;
  }
`;

export default GlobalStyle;
