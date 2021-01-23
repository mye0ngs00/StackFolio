import { atom } from "recoil";

export interface User {
    id: string
    email:string
    name: string
    avatar: string
}

export const userState = atom({
    key:'userState',
    default:null
})