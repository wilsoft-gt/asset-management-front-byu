import { useEffect } from "react"
import auth from "../services/authService"
import { UserStore } from "../zustand/users"
import { ProjectsStore } from "../zustand/projects"
import { useShallow } from "zustand/react/shallow"
import { NavLink } from "react-router"
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { IconPlus } from "@tabler/icons-react"
import user from "../services/userService"
import project from "../services/projectService"
ModuleRegistry.registerModules([AllCommunityModule]);


export default function UserList () {
  const [setUsers, setError] = UserStore(useShallow(store => [store.setUsers, store.setError]))
  const [projects, setProjects] = ProjectsStore(useShallow(store=> [store.projects, store.setProjects]))
  const [isLoading, error, users] = UserStore(useShallow(store => [store.isLoading, store.error, store.users]))
  
  
  const getUsersList = async () => {
    try {
      const result = await user.getAll()
      if (projects.length < 1) {
        const projectsResult = await project.getAll()
        setProjects(projectsResult.data)
      }
      setUsers(result.data)
    } catch(e) {
      setError(e)
      if (e && e.status == 401) {
        auth.logout()
      }
    }
  }
   
  const getProjectName = (id) => {
    const result = projects.find(project => project.id == id)
    return result.name
  }
  
  const griColumns = [
    {flex: 1, field: "userid", headerName: "User ID",cellRenderer: props => <NavLink className="text-blue-500"to={`/users/${props.data.id}`} end>{props.value}</NavLink>, filter: true},
    {flex: 2, field: "name",headerName: "Name", filter: true},
    {flex: 1, field: "enabled",headerName: "Enabled", cellRenderer: props => <span>{props.value ? "True" : "False"}</span>},
    {flex: 1, field: "usertype",headerName: "Type"},
    {flex: 2, field: "fk_project_id",headerName: "Project", cellRenderer: props => props.value ? getProjectName(props.value) : "N/A"}
  ]
  
  useEffect(() => {
    getUsersList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <span>Loading...</span>
  }
  if (error) {
    console.log(error)
    return <span>There was an error: {error.message}</span>
  }
  if (users && projects) {
    return(
      <section className="flex flex-col h-full">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">User List</h1>
          <NavLink to="/users/create" end className="mb-4 min-w-30 bg-blue-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconPlus size={18} /> Add user</NavLink>
        </div>
        <div className="grow-1">
          <AgGridReact
            rowData={users}
            columnDefs={griColumns}
            pagination={true}
          />
        </div>
      </section>
    )
  }
}