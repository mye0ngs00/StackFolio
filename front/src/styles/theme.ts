import { DefaultTheme } from "styled-components";

const dark: DefaultTheme = {
    mainBackground: `#333`,
    basic: '#23384d',

    // neutral color
    title: `rgba(255,255,255,0.85)`,
    divider: `rgba(255,255,255,0.06)`,
    tableHeader: `rgba(255,255,255,0.02)`,
    disable: `rgba(255,255,255,0.25)`,

    // point-color
    default:{
      main: `rgba(255,255,255,0.04)`,
      text: `rgba(255,255,255,0.85)`,
      border: `rgba(255,255,255,0.15)`,
      accent: `rgba(0,0,0,0.2)`,
      disabled: `rgba(255,255,255,0.25)`,
    },
    primary: {
      main: '#ff9425',
      text: `#fff`,
      border: `rgba(0, 0, 0, 0.5)`,
      accent: `#f57e00`,
      disabled: '#888888'
    },
    secondary:{
      main: `#464646`,
      text: `rgba(255,255,255,0.85)`,
      border: `rgba(255,255,255,0.15)`,
      accent: `#5f5f5f`,
      disabled: '#4A4A4A'
    },
    ghost: {
      main: `rgba(255,255,255,0)`,
      text: '#ff9425',
      border: `rgba(255,255,255,0)`,
      accent: `#4b3f32`,
      disabled: `rgba(255,255,255,0)`,
    }
  };
const light: DefaultTheme = {
    mainBackground: `#fbfbfb`,
    basic: '#23384d',

    // neutral color
    title: `rgba(0, 0, 0, 0.85)`,
    divider: `rgba(0, 0, 0, 0.45)`,
    tableHeader: `rgba(0, 0, 0, 0.02)`,
    disable: `rgba(0, 0, 0, 0.25)`,

    // point-color
    default: {
      main: '#fbfbfb',
      text: '#000',
      border: '#333',
      accent: '#f0f0f0',
      disabled: `rgba(0, 0, 0, 0.25)`
    },
    primary: {
      main: '#ff9425',
      text: `#fff`,
      border: `rgba(255, 148, 37, 0.5)`,
      accent: `#f57e00`,
      disabled: '#FFC485'
    },
    secondary: {
      main: '#dbe0e6',
      text: `rgba(0, 0, 0, 0.75)`,
      border: `rgba(232, 232, 232, 0.2)`,
      accent: `#c3cbd5`,
      disabled: '#F0F0F0'
    },
    ghost: {
      main: 'transparent',
      text: '#ff9425',
      border: `rgba(0, 0, 0, 0)`,
      accent: `#FFF5EB`,
      disabled: `rgba(0, 0, 0, 0.25)`
    }
  };

export const themes = { dark, light };