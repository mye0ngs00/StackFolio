import { atom, selector } from "recoil";

export const signInModalState = atom({
    key: 'signInModalState',
    default: 'none'
})

export const toggleSignInModalState = selector({
    key: 'toggleSignInModalState',
    get: ({get}) => get(signInModalState),
    set: ({set, get}) => set(signInModalState, get(signInModalState)==='none'?'block':'none')
});