import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/global-style';
import {themes}from 'styles/theme';
import Routes from 'components/Routes';

function App() {
  const theme:DefaultTheme = themes.light;
  // const theme:DefaultTheme = themes.dark;
  return (
    <>
      <GlobalStyle theme={theme}/>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </>
  );
}

export default App;
