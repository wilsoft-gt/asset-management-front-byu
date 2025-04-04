import axios from "axios";
import { AuthStore } from "../zustand/login";

const {VITE_HOST, VITE_PORT} = import.meta.env
const asset = {}

asset.getAll = async () => {
const token = AuthStore.getState().token
  const response = await axios.get(`${VITE_HOST}:${VITE_PORT}/assets`, { headers: {"Authorization": `Bearer ${token}`}})
  return response
}

asset.get = async (id) => {
  const token = AuthStore.getState().token
  const response = await axios.get(`${VITE_HOST}:${VITE_PORT}/assets/${id}`, { headers: {"Authorization": `Bearer ${token}`}})
  return response
}

asset.create = async (payload) => {
  const token = AuthStore.getState().token
  const response = await axios.post(`${VITE_HOST}:${VITE_PORT}/assets`, payload, { headers: {"Authorization": `Bearer ${token}`}})
  return response
}

asset.assignUser = async (assetId, userId) => {
  const token = AuthStore.getState().token
  const response = await axios.post(`${VITE_HOST}:${VITE_PORT}/assets/${assetId}/assign`, {userId} ,{ headers: {"Authorization": `Bearer ${token}`}})
  return response
}

asset.update = async (assetId, payload) => {
  const token = AuthStore.getState().token
  const response = await axios.put(`${VITE_HOST}:${VITE_PORT}/assets/${assetId}`, payload, { headers: {"Authorization": `Bearer ${token}`}})
  return response
}

asset.delete = async (assetId) => {
  const token = AuthStore.getState().token
  const response = await axios.delete(`${VITE_HOST}:${VITE_PORT}/assets/${assetId}`, { headers: {"Authorization": `Bearer ${token}`}})
  return response
}

asset.release = async (assetId) => {
  const token = AuthStore.getState().token
  const response = await axios.post(`${VITE_HOST}:${VITE_PORT}/assets/${assetId}/release`, { headers: {"Authorization": `Bearer ${token}`}})
  return response
}

asset.getBySerial = async (payload) => {
  const token = AuthStore.getState().token
  const response = await axios.post(`${VITE_HOST}:${VITE_PORT}/assets/serial`, payload, { headers: {"Authorization": `Bearer ${token}`}})
  return response
}

export default asset