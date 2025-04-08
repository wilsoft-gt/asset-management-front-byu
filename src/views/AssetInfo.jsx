import { UserStore } from "../zustand/users"
import { AssetStore } from "../zustand/assets"
import { useShallow } from "zustand/react/shallow"
import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import Separator from "../components/Separator"
import { NavLink } from "react-router"
import assetService from "../services/assetService"
import userService from "../services/userService"
import { IconEdit, IconTrash, IconDevices, IconUnlink } from '@tabler/icons-react';
import { ReleaseAsset } from "../components/ReleaseAsset"
import { DeleteAsset } from "../components/DeleteAsset"
import toast, {Toaster} from "react-hot-toast"


export function AssetInformation () {
  const [getAssetById, updateAsset] = AssetStore(useShallow(store => [store.getAssetById, store.updateAsset]))
  const [getUserById] = UserStore(useShallow(store => [store.getUserById]))
  const [asset, setAsset] = useState({})
  const [user, setUser] = useState({})
  const [releaseModal, setReleaseModal] = useState()
  const [deleteModal, setDeleteModal] = useState()
  const navigator = useNavigate()
  let params = useParams()


  const fetchAssetInfo = async () => {
    const assetResult = await assetService.get(params.assetId)
    return assetResult.data[0]
  }

  const fetchUserInfo = async (id) => {
    const userResult = userService.get(id)
    return userResult.data
  }

  const handleReleaseAsset = async () => {
    const result = await assetService.release(asset.id)
    updateAsset(result.data[0])
    setAsset(result.data[0])
    releaseModal.close()
  }

  const handleDelete = async () => {
    try {
      const result = await assetService.delete(asset.id)
      if (result.status == 204) navigator("/assets")
    } catch(e) {
      toast.error(e.message)
    }
  }

  const getAssetInfo = async () => {
    let assetResult = getAssetById(params.assetId)
    if (!assetResult){
      assetResult = await fetchAssetInfo()
    }
    if (assetResult.fk_user_id) {
      let userResult = getUserById(assetResult.fk_user_id)
      if (!userResult) {
        userResult = await fetchUserInfo(assetResult.fk_user_id)
      }
      setUser(userResult)
    }
    setAsset(assetResult)
  }

  useEffect(() => {
    getAssetInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (asset && user) {
    return (
      <section>
          <Toaster />
          <DeleteAsset setRef={setDeleteModal} asset={asset} action={handleDelete}  />
          <ReleaseAsset asset={asset} setRef={setReleaseModal} action={handleReleaseAsset}  />
          <h1 className="text-3xl font-bold flex items-center gap-2"><IconDevices stroke={3}/> Asset Information</h1>
          <Separator />
          <p><span className="font-bold">ID: </span><span>{asset.id}</span></p>
          <p><span className="font-bold">Serial #: </span><span>{asset.serial}</span></p>
          <p><span className="font-bold">Model: </span><span></span>{asset.model}</p>
          <p><span className="font-bold">Brand: </span><span>{asset.brand}</span></p>
          <p><span className="font-bold">Type: </span><span>{asset.type ? `${asset.type[0].toUpperCase()}${asset.type.slice(1)}` : "N/A"}</span></p>
          <p><span className="font-bold">Size: </span><span>{asset.size ? asset.size : "N/A"}</span></p>
          <p><span className="font-bold">User: </span>{asset.fk_user_id ? <NavLink className="text-blue-500" to={`/users/${user.id}`}>{user.name}</NavLink> : "N/A"}</p>
          <p><span className="font-bold">Disposed: </span><span>{asset.disposed ? asset.disposed : "No"}</span></p>
          {
            asset.disposed ?
            <>
              <p><span className="font-bold">Disposed Date: </span><span></span></p>
              <p><span className="font-bold">Disposed Reason: </span><span></span></p>
            </>
            : null
          }
          <Separator />
          <div className="flex flex-row gap-2">
            <NavLink to={`/assets/${asset.id}/edit`} className="mb-4 min-w-30 bg-blue-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconEdit size={18} /> Edit</NavLink>
            <button disabled={!asset.fk_user_id} className="mb-4 min-w-30 bg-yellow-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2 disabled:bg-neutral-400 disabled:text-neutral-700 disabled:shadow-none disabled:cursor-not-allowed" onClick={() => releaseModal.showModal()}><IconUnlink size={18} /> Release</button>
            <button className="mb-4 min-w-30 bg-red-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2" onClick={() => deleteModal.showModal()}><IconTrash size={18} /> Delete</button>
          </div>
        </section>
    )
  } else {
    return <span>Loading...</span>
  }
}