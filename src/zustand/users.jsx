import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  users: [],
  isLoading: true,
  error: null
}

export const UserStore = create(devtools((set, get) => ({
  ...initialState,
  setUsers: (users) => set({users, isLoading: false}, undefined, "setUser"),
  setError: (error) => set({error, isLoading: false}, undefined, "setError"),
  getUserById: (id) => get().users.find(user => user.id == id),
  updateUser: (user) => {
    const temp = get().users.filter(u => u.id != user.id)
    set({users: [...temp, user]}, undefined, "updateUser")
  },
  resetUsers: () => set({...initialState})
}),{name: "UserStore"}))