import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/global-style';
import {themes}from 'styles/theme';
import Routes from 'components/Routes';
import { useRecoilValue } from 'recoil';
import { themeState } from 'atoms/theme';

function App() {
  const themeType = useRecoilValue(themeState);
  const theme:DefaultTheme = themeType==='light' ? themes.light : themes.dark;
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
