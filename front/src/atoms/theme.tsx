import { atom, selector } from "recoil";

export const themeState = atom({
    key: 'themeState',
    default: 'light'
})

export const toggleThemeState = selector({
    key: 'toggleThemeState',
    get: ({get}) => get(themeState),
    set: ({set, get}) => set(themeState, get(themeState)==='light'?'dark':'light')
});