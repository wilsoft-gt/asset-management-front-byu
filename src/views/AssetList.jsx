import { useEffect } from "react"
import axios from "axios"
import { AuthStore } from "../zustand/login"
import { AssetStore } from "../zustand/assets"
import { useShallow } from 'zustand/react/shallow'
import { AgGridReact } from 'ag-grid-react'
import { NavLink } from "react-router"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AssetList () {
  const [setAssets, setError] = AssetStore( useShallow(store => [store.setAssets, store.setError]))
  const [isLoading, error, assets] = AssetStore( useShallow(store => [store.isLoading, store.error, store.assets]))
  const token = AuthStore(store => store.token)
  const {VITE_HOST, VITE_PORT} = import.meta.env

  const gridColumns = [
    {flex: 1, field: "id", headerName: "ID", cellRenderer: props => <NavLink to={`/assets/${props.value}`} className="text-blue-500">{props.value} </NavLink>, filter: true},
    {flex: 1, field: "serial", headerName: "Serial #", filter: true},
    {flex: 1, field: "model", headerName: "Model", filter: true},
    {flex: 1, field: "brand", headerName: "Brand", filter: true},
    {flex: 1, field: "size", headerName: "Size", cellRenderer: props => <span className="text-neutral-600">{props.value ? props.value : "N/A"}</span>, filter: true, },
    {flex: 1, field: "fk_user_id", headerName: "Asigned To", cellRenderer: props => <span className={props.value ? "text-blue-500" : "text-neutral-700"}>{props.value ? props.value : "N/A"}</span>},
    {flex: 1, field: "fk_asset_type_id", headerName: "Type", cellRenderer: props => <span className="text-neutral-600">{props.value ? props.value : "N/A"}</span> ,filter: true}
  ]

  const fetchAssetData = async () => {
    try {
      const response = await axios.get(`${VITE_HOST}:${VITE_PORT}/assets`, { headers: {
        "Authorization": `Bearer ${token}`
      }})
      setAssets(response.data)
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => {
    fetchAssetData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  if (isLoading)  return <span>Loading...</span>
  if (error) return <span>Error: {error}</span>
  if (assets) {
    return(
      <AgGridReact
        rowData={assets}
        columnDefs={gridColumns}
        pagination={true}
      />
    )
  }
}