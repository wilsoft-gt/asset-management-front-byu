import axios from "axios";
import { AuthStore } from "../zustand/login";
import auth from "./authService";

axios.interceptors.response.use(null, function(error){
  if (error.status === 401) {
    auth.logout()
  }
  return Promise.reject(error)
})

const {VITE_HOST} = import.meta.env
const user = {}


user.getAll = async () => {
  const token = AuthStore.getState().token
  const result =  await axios.get(`${VITE_HOST}/users`, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

user.get = async (id) => {
  const token = AuthStore.getState().token
  const result = await axios.get(`${VITE_HOST}/users/${id}`, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

user.getDetails = async (id) => {
  const token = AuthStore.getState().token
  const result = await axios.get(`${VITE_HOST}/users/${id}/details`, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

user.getAssets = async (id) => {
  const token = AuthStore.getState().token
  const result =  await axios.get(`${VITE_HOST}/users/${id}/assets`, {headers: {"Authorization": `Bearer ${token}`}})
  return result
} 

user.releaseAssets = async (id) => {
  const token = AuthStore.getState().token
  const result =  await axios.post(`${VITE_HOST}/users/${id}/assets/release`, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

user.asignAssets = async (id, payload) => {
  const token = AuthStore.getState().token
  const result =  await axios.post(`${VITE_HOST}/users/${id}/assets/assign`, {assets: payload}, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

user.update = async (id, payload) => {
  const token = AuthStore.getState().token
  const result =  await axios.put(`${VITE_HOST}/users/${id}`, payload, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

user.delete = async (id) => {
  const token = AuthStore.getState().token
  const result = await axios.delete(`${VITE_HOST}/users/${id}`, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

user.create = async (payload) => {
  const token = AuthStore.getState().token
  const result = await axios.post(`${VITE_HOST}/users`, payload, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

user.createAuth = async (payload) => {
  const token = AuthStore.getState().token
  const result = await axios.post(`${VITE_HOST}/auth/signup`, payload, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

export default user