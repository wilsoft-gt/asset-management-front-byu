import { UserStore } from "../zustand/users"
import { AssetStore } from "../zustand/assets"
import { useShallow } from "zustand/react/shallow"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import Separator from "../components/Separator"
import { NavLink } from "react-router"
import { IconEdit, IconTrash, IconDevices } from '@tabler/icons-react';


export function AssetInformation () {
  const [getAssetById] = AssetStore(useShallow(store => [store.getAssetById]))
  const [getUserById] = UserStore(useShallow(store => [store.getUserById]))
  const [asset, setAsset] = useState({})
  const [user, setUser] = useState({})
  let params = useParams()

  const getAssetInfo = () => {
    let assetResult = getAssetById(params.assetId)
    let userResult = getUserById(assetResult.fk_user_id)
    setAsset(assetResult)
    setUser(userResult)
  }

  useEffect(() => {
    getAssetInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section>
        <h1 className="text-3xl font-bold flex items-center gap-2"><IconDevices stroke={3}/> Asset Information</h1>
        <Separator />
        <p><span className="font-bold">ID: </span><span>{asset.id}</span></p>
        <p><span className="font-bold">Serial #: </span><span>{asset.serial}</span></p>
        <p><span className="font-bold">Model: </span><span></span>{asset.model}</p>
        <p><span className="font-bold">Brand: </span><span>{asset.brand}</span></p>
        <p><span className="font-bold">Size: </span><span>{asset.size ? asset.size : "N/A"}</span></p>
        <p><span className="font-bold">Disposed: </span><span>{asset.disposed ? asset.disposed : "No"}</span></p>
        {
          asset.disposed ?
          <>
            <p><span className="font-bold">Disposed Date: </span><span></span></p>
            <p><span className="font-bold">Disposed Reason: </span><span></span></p>
          </>
          : null
        }
        <p><span className="font-bold">User: </span><NavLink className="text-blue-500" to={`/users/${user.id}`}>{user.name ? user.name : "N/A"}</NavLink></p>
        <p><span className="font-bold">Type: </span><span>{asset.fk_asset_type_id ? asset.fk_asset_type_id : "N/A"}</span></p>
        <Separator />
        <div className="flex flex-row gap-2">
          <NavLink to={`/assets/${asset.id}/edit`} className="mb-4 min-w-30 bg-blue-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconEdit size={18} /> Edit</NavLink>
          <NavLink to={`/assets/${asset.id}/delete`} className="mb-4 min-w-30 bg-red-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconTrash size={18} /> Delete</NavLink>
        </div>
      </section>
  )
}