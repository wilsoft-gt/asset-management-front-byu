import { useEffect } from "react"
import axios from "axios"
import { AuthStore } from "../zustand/login"
import { UserStore } from "../zustand/users"
import { useShallow } from "zustand/react/shallow"
import { NavLink } from "react-router"
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
ModuleRegistry.registerModules([AllCommunityModule]);


export default function UserList () {
  const [token, logout] = AuthStore(useShallow(store => [store.token, store.logout]))
  const [setUsers, setError] = UserStore(useShallow(store => [store.setUsers, store.setError]))
  const [isLoading, error, users] = UserStore(useShallow(store => [store.isLoading, store.error, store.users]))
  const {VITE_HOST, VITE_PORT} = import.meta.env
  
  
  const getUsersList = async () => {
    try {
      const result = await axios.get(`${VITE_HOST}:${VITE_PORT}/users`, {headers: {"Authorization": `Bearer ${token}`}})
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
    {flex: 2,field: "username",headerName: "User Name", filter: true},
    {flex: 2,field: "name",headerName: "Name", filter: true},
    {flex: 1,field: "enabled",headerName: "Enabled"},
    {flex: 1,field: "usertype",headerName: "Type"},
    {flex: 2,field: "fk_project_id",headerName: "Project"}
  ]
  
  useEffect(() => {
    getUsersList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <span>Loading...</span>
  }
  if (error) {
    return <span>There was an error: {error.message}</span>
  }
  if (users) {
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