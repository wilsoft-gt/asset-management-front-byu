import {create} from 'zustand'
import {devtools} from "zustand/middleware"

const initialState = {
  isLoading: false,
  error: null,
  projects: []
}

export const ProjectsStore = create(devtools((set, get) => ({
  ...initialState,
  setProjects: (projects) => set({projects}, undefined, "ProjectsStore/setProjects"),
  getProjectById: (id) => get().projects.find(project => project.id == id),
  resetProjects: () => set(initialState)
}), {name: "ProjectsStore"}))

