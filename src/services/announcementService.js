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
const announcements = {}

announcements.getAll = async () => {
const token = AuthStore.getState().token
  const response = await axios.get(`${VITE_HOST}/announcements`, { headers: {"Authorization": `Bearer ${token}`}})
  return response
}

announcements.create = async (payload) => {
  const token = AuthStore.getState().token
  const response = await axios.post(`${VITE_HOST}/announcements`, payload, { headers: {"Authorization": `Bearer ${token}`}})
  return response
}

announcements.togle = async (id) => {
  const token = AuthStore.getState().token
  const response = await axios.put(`${VITE_HOST}/announcements/${id}`,{}, { headers: {"Authorization": `Bearer ${token}`}})
  return response
}

announcements.delete = async (id) => {
  const token = AuthStore.getState().token
  const response = await axios.delete(`${VITE_HOST}/announcements/${id}`, { headers: {"Authorization": `Bearer ${token}`}})
  return response
}


export default announcements