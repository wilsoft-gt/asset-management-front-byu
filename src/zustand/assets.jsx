import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  assets: [],
  isLoading: true,
  error: null
}

export const AssetStore = create(devtools((set, get) => ({
  ...initialState,
  setAssets: (assets) => set({assets, isLoading: false}),
  setError: (error) => set({error, isLoading: false}),
  getAssetById: (id) => get().assets.find(asset => asset.id == id),
  getAssetsByUserId: (id) => get().assets.filter(asset => asset.fk_user_id == id)
})))