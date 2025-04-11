import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  assets: [],
  isLoading: true,
  error: null
}

export const AssetStore = create(devtools((set, get) => ({
  ...initialState,
  setAssets: (assets) => set({assets, isLoading: false}, undefined, "setAssets"),
  setError: (error) => set({error, isLoading: false}, undefined, "setError"),
  getAssetById: (id) => get().assets.find(asset => asset.id == id),
  getAssetsByUserId: (id) => get().assets.filter(asset => asset.fk_user_id == id),
  updateAsset: (asset) => {
    const temp = get().assets.filter(a => a.id != asset.id)
    set({assets: [...temp, asset]}, undefined, "updateUser")
  },
  reset: () => set(initialState)
}), {name: "AssetStore"}))