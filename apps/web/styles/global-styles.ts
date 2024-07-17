import { createGlobalStyle } from 'styled-components';
import theme from './theme-mui';

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Nunito", sans-serif;
  font-size: 16px;
}

b {
  font-weight: 800;
}

a {
  text-decoration: none;
  color: inherit;
}

ul, ol {
    list-style: none;
}

h1, h2, h3, h4, h5,h6, a, ul, li, span, p {
  color: ${theme.palette.primary.main};
}

h1 {
  font-size: ${theme.typography.h1.fontSize};
}
`;
