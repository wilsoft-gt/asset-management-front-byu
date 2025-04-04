import { useEffect } from "react"
import { AuthStore } from "../zustand/login"
import { UserStore } from "../zustand/users"
import { ProjectsStore } from "../zustand/projects"
import { useShallow } from "zustand/react/shallow"
import { NavLink } from "react-router"
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import user from "../services/userService"
import project from "../services/projectService"
ModuleRegistry.registerModules([AllCommunityModule]);


export default function UserList () {
  const [logout] = AuthStore(useShallow(store => [store.logout]))
  const [setUsers, setError] = UserStore(useShallow(store => [store.setUsers, store.setError]))
  const [projects, setProjects] = ProjectsStore(useShallow(store=> [store.projects, store.setProjects]))
  const [isLoading, error, users] = UserStore(useShallow(store => [store.isLoading, store.error, store.users]))
  

  const getProjectName = (id) => {
    const result = projects.find(project => project.id == id)
    return result.name
  }

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
        logout()
      }
    }
  }

  const griColumns = [
    {flex: 1,field: "id",headerName: "ID", cellRenderer: props => <NavLink className="text-blue-500"to={`/users/${props.value}`} end>{props.value}</NavLink>, filter: true},
    {flex: 2,field: "name",headerName: "Name", filter: true},
    {flex: 1,field: "enabled",headerName: "Enabled", cellRenderer: props => <span>{props.value ? "True" : "False"}</span>},
    {flex: 1,field: "usertype",headerName: "Type"},
    {flex: 2,field: "fk_project_id",headerName: "Project", cellRenderer: props => props.value ? getProjectName(props.value) : "N/A"}
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
      <>
        <AgGridReact
          rowData={users}
          columnDefs={griColumns}
          pagination={true}
        />
      </>
    )
  }
}