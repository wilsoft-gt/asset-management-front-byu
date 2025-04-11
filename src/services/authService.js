import axios from "axios"
import { jwtDecode } from "jwt-decode"

import { AuthStore } from "../zustand/login"
import { UserStore  } from "../zustand/users"
import { ProjectsStore } from "../zustand/projects"
import { AssetStore } from "../zustand/assets"

import authService from "./authService";

axios.interceptors.response.use(null, function(error){
  if (error.status === 401) {
    authService.logout()
  }
  return Promise.reject(error)
})


const {VITE_HOST} = import.meta.env

const auth = {}

auth.login = async (payload) => {
  const response = await axios.post(`${VITE_HOST}/auth/login`, payload)
  const {id, username, name, enabled, usertype, fk_project_id} = jwtDecode(response.data.token)
  return {token: response.data.token, userData: {id, username, name, enabled, usertype, fk_project_id}}
}

auth.logout = async () => {
  AuthStore.getState().reset()
  UserStore.getState().reset()
  ProjectsStore.getState().reset()
  AssetStore.getState().reset()
}


export default auth