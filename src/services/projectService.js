import axios from "axios";
import { AuthStore } from "../zustand/login";

const {VITE_HOST, VITE_PORT} = import.meta.env
const project = {}

project.getAll = async () => {
  const token = AuthStore.getState().token
  const result =  await axios.get(`${VITE_HOST}/projects`, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

project.get = async (id) => {
  const token = AuthStore.getState().token
  const result =  await axios.get(`${VITE_HOST}/projects/${id}`, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

project.create = async (payload) => {
  const token = AuthStore.getState().token
  const result =  await axios.post(`${VITE_HOST}/projects`, payload, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

project.update = async (id, payload) => {
  const token = AuthStore.getState().token
  const result =  await axios.put(`${VITE_HOST}/projects/${id}`, payload, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

project.delete = async (id) => {
  const token = AuthStore.getState().token
  const result =  await axios.delete(`${VITE_HOST}}/projects/${id}`, {headers: {"Authorization": `Bearer ${token}`}})
  return result
}

export default project