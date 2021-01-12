import { DefaultTheme } from "styled-components";

const dark: DefaultTheme = {
    mainBackground: `#333`,
    opposite: '#ccc',

    // neutral color
    title: `rgba(255,255,255,0.85)`,
    disable: `rgba(255,255,255,0.25)`,
    divider: `rgba(255,255,255,0.06)`,
    tableHeader: `rgba(255,255,255,0.02)`,

    // point-color
    default:{
      main: `rgba(255,255,255,0.04)`,
      text: `rgba(255,255,255,0.85)`,
      border: `rgba(255,255,255,0.15)`,
      accent: `rgba(0,0,0,0.2)`,
    },
    primary: {
      main: `rgba(255,255,255,0.8)`,
      text: `rgba(0,0,0,0.65)`,
      border: `rgba(255,255,255,0.15)`,
      accent: `rgba(255,255,255,0.6)`,
    },
    secondary:{
      main: `rgba(0,0,0,0.2)`,
      text: `rgba(255,255,255,0.85)`,
      border: `rgba(255,255,255,0.15)`,
      accent: `rgba(255,255,255,0.6)`,
    }
  };
const light: DefaultTheme = {
    mainBackground: `#fff`,
    opposite: '#333',

    // neutral color
    title: `rgba(0, 0, 0, 0.85)`,
    disable: `rgba(0, 0, 0, 0.25)`,
    divider: `rgba(0, 0, 0, 0.06)`,
    tableHeader: `rgba(0, 0, 0, 0.02)`,
    
    // point-color
    default:{
      main: `rgba(0, 0, 0, 0.01)`,
      text: `rgba(0, 0, 0, 0.85)`,
      border: `rgba(0, 0, 0, 0.5)`,
      accent: `rgba(0, 0, 0, 0.6)`
    },
    primary: {
      main: `rgba(255,255,255,0.8)`,
      text: `rgba(0, 0, 0, 1)`,
      border: `rgba(0, 0, 0, 0.5)`,
      accent: `rgba(0, 0, 0, 0.8)`
    },
    secondary: {
      main: `rgba(0,0,0,0.2)`,
      text: `rgba(0, 0, 0, 0.75)`,
      border: `rgba(0, 0, 0, 0.2)`,
      accent: `rgba(0, 0, 0, 0.5)`
    }
  };

export const themes = { dark, light };

// Media Query
const customMediaQuery = (maxWidth: number) => `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(1024),
  tablet: customMediaQuery(768),
  phone: customMediaQuery(376),
};