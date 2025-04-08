import { useEffect } from "react"
import { AssetStore } from "../zustand/assets"
import { UserStore } from "../zustand/users"
import { useShallow } from 'zustand/react/shallow'
import { AgGridReact } from 'ag-grid-react'
import { NavLink } from "react-router"
import asset from "../services/assetService"
import user from "../services/userService"
import { IconPlus } from "@tabler/icons-react"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AssetList () {
  const [users, setUsers] = UserStore(useShallow(store => [store.users, store.setUsers]))
  const [setAssets, setError] = AssetStore( useShallow(store => [store.setAssets, store.setError]))
  const [isLoading, error, assets] = AssetStore( useShallow(store => [store.isLoading, store.error, store.assets]))

  const fetchAssetData = async () => {
    try {
      const response = await asset.getAll()
      setAssets(response.data)
      if (users.length < 1) {
        const userlist = await user.getAll()
        setUsers(userlist.data)
      }
    } catch (e) {
      setError(e.message)
    }
  }
  
  useEffect(() => {
    fetchAssetData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getUserName = (userId) => {
    const response = users.find(user => user.id == userId)
    return response.name
  }
  const gridColumns = [
    {flex: 1, field: "serial", headerName: "Serial #", cellRenderer: props => <NavLink to={`/assets/${props.data.id}`} className="text-blue-500">{props.value} </NavLink>, filter: true},
    {flex: 1, field: "model", headerName: "Model", filter: true},
    {flex: 1, field: "brand", headerName: "Brand", filter: true},
    {flex: 1, field: "size", headerName: "Size", cellRenderer: props => <span className="text-neutral-600">{props.value ? props.value : "N/A"}</span>, filter: true, },
    {flex: 1, field: "fk_user_id", headerName: "Asigned To", cellRenderer: props => <NavLink to={`/users/${props.value}`} className={props.value ? "text-blue-500" : "text-neutral-700"}>{props.value ? getUserName(props.value) : "N/A"}</NavLink>},
    {flex: 1, field: "type", headerName: "Type", cellRenderer: props => <span className="text-neutral-600">{props.value ? `${props.value[0].toUpperCase()}${props.value.slice(1)}` : "N/A"}</span> ,filter: true}
  ]


  if (isLoading)  return <span>Loading...</span>
  if (error) return <span>Error: {error}</span>
  if (assets && users.length > 0) {
    return(
      <section className="flex flex-col h-full">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Asset List</h1>
          <NavLink to="/assets/create" end className="mb-4 min-w-30 bg-blue-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconPlus size={18} /> Add Asset</NavLink>
        </div>
        <div className="flex-1">
          <AgGridReact
            rowData={assets}
            columnDefs={gridColumns}
            pagination={true}
          />
        </div>
      </section>
    )
  }
}