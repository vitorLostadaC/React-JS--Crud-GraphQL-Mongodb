import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root{
  --backgroundBody: #282828;
  --text: #ccc;
  --details: #f54748;
  --itemSeparator: #363636;
  --modalBackground: #F2F2F2;
  --white: #fff;
}

html {
  

  @media (max-width: 1080px) {
    font-size: 93.75%;
  }
  @media (max-width: 720px) {
    font-size: 87.5%;
  }
}

body {
  overflow-x: hidden;
  -webkit-font-smoothing: antialised;
  background: var(--backgroundBody); 
}


body,
input,
textarea,
button {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}

h1,
h2,
h3,
h4,
h5,                       
h6,
strong {
  font-weight: 600;
}

a {
    text-decoration: none;
  }

button {
  cursor: pointer;
}

[disable] {
  opacity: 0.6;
  cursor: not-allowed;
}
`;
