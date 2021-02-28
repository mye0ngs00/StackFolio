import { DefaultTheme } from "styled-components";

const dark: DefaultTheme = {
    mainBackground: `#333`,
    basic: '#23384d',

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
      main: '#ff9425',
      text: `#fff`,
      border: `rgba(0, 0, 0, 0.5)`,
      accent: `#f57e00`
    },
    secondary:{
      main: `#464646`,
      text: `rgba(255,255,255,0.85)`,
      border: `rgba(255,255,255,0.15)`,
      accent: `#5f5f5f`,
    },
    ghost: {
      main: `rgba(255,255,255,0)`,
      text: '#ff9425',
      border: `rgba(255,255,255,0)`,
      accent: `#4b3f32`,
    }
  };
const light: DefaultTheme = {
    mainBackground: `#fbfbfb`,
    basic: '#23384d',

    // neutral color
    title: `rgba(0, 0, 0, 0.85)`,
    disable: `rgba(0, 0, 0, 0.25)`,
    divider: `rgba(0, 0, 0, 0.06)`,
    tableHeader: `rgba(0, 0, 0, 0.02)`,

    // point-color
    default: {
      main: '#fbfbfb',
      text: '#000',
      border: '#333',
      accent: '#f0f0f0'
    },
    primary: {
      main: '#FF9E3A',
      text: `#fff`,
      border: `rgba(255, 148, 37, 0.5)`,
      accent: `#f57e00`
    },
    secondary: {
      main: '#E8E8E8',
      text: `rgba(0, 0, 0, 0.75)`,
      border: `rgba(232, 232, 232, 0.2)`,
      accent: `#c3cbd5`
    },
    ghost: {
      main: 'transparent',
      text: '#ff9425',
      border: `rgba(0, 0, 0, 0)`,
      accent: `#fff5eb`
    }
  };

export const themes = { dark, light };