import {create} from 'zustand'
import {devtools} from "zustand/middleware"

const initialState = {
  isLogedIn: false,
  token: null,
  userData: null
}

export const AuthStore = create(devtools((set) => ({
  ...initialState,
  login: ({token, userData}) => set({token, userData, isLogedIn: true}, undefined, "AuthStore/login"),
  logout: () => set({...initialState}, undefined, "AuthStore/logout")
})))



