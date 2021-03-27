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
  
  html, body {
    height: 100%;
  }

  body {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    color: #000;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }

  #root {
    flex: 1 0 auto;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
  }
`;

export default GlobalStyle;
