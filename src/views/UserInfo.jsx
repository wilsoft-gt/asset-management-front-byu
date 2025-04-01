import { UserStore } from "../zustand/users"
import { AssetStore } from "../zustand/assets"
import { useShallow } from "zustand/react/shallow"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import Separator from "../components/Separator"
import { NavLink } from "react-router"
import { IconEdit, IconTrash, IconUser, IconDevices } from '@tabler/icons-react';


export function UserInformation () {
  const [getUserById] = UserStore(useShallow(store => [store.getUserById]))
  const [getAssetsByUserId] = AssetStore(useShallow(store => [store.getAssetsByUserId]))
  const [user, setUser] = useState({})
  const [userAssets, setUserAssets] = useState({})
  let params = useParams()

  const getUserInfo = () => {
    let user = getUserById(params.userId)
    let assets = getAssetsByUserId(params.userId)
    setUser(user)
    setUserAssets(assets)
  }

  useEffect(() => {
    getUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    try {
    return (
      <section>
        <h1 className="text-3xl font-bold flex items-center gap-2"><IconUser stroke={3}/> User Information</h1>
        <Separator />
        <p><span className="font-bold">ID: </span><span>{user.id}</span></p>
        <p><span className="font-bold">Name: </span><span>{user.name}</span></p>
        <p><span className="font-bold">Enabled: </span><span>{user.enabled}</span></p>
        <p><span className="font-bold">User Type: </span><span>{user.usertype}</span></p>
        <p><span className="font-bold">Project: </span><span>{user.fk_project_id ? user.fk_project_id : "Not set"}</span></p>
        <h2 className="text-2xl font-bold flex items-center gap-2 mt-10"><IconDevices />Asets</h2>
        <Separator />
        <table className="w-full border-collapse mb-7 shadow-md shadow-neutral-300">
          <thead className="">
            <tr className="bg-neutral-400">
              <th className="border-b-neutral-400 pt-2 pb-2">ID</th>
              <th className="border-b-neutral-400 pt-2 pb-2">Serial #</th>
              <th className="border-b-neutral-400 pt-2 pb-2">Model</th>
              <th className="border-b-neutral-400 pt-2 pb-2">Brand</th>
              <th className="border-b-neutral-400 pt-2 pb-2">Size</th>
              <th className="border-b-neutral-400 pt-2 pb-2">Asset Type</th>
            </tr>
          </thead>
          <tbody>
            { 
              userAssets ?
                userAssets.map((asset, index) => {
                  return(
                  <tr key={index} className="odd:bg-white even:bg-neutral-200">
                    <td className="border-t-neutral-300 border-t-solid border-t-1 text-center pt-2 pb-2 font-bold">{asset.id}</td>
                    <td className="border-t-neutral-300 border-t-solid border-t-1 text-center pt-2 pb-2"><NavLink className="text-blue-500" to={`/assets/${asset.id}`}>{asset.serial}</NavLink></td>
                    <td className="border-t-neutral-300 border-t-solid border-t-1 text-center pt-2 pb-2">{asset.model}</td>
                    <td className="border-t-neutral-300 border-t-solid border-t-1 text-center pt-2 pb-2">{asset.brand}</td>
                    <td className="border-t-neutral-300 border-t-solid border-t-1 text-center pt-2 pb-2">{asset.size ? asset.size : "N/A"}</td>
                    <td className="border-t-neutral-300 border-t-solid border-t-1 text-center pt-2 pb-2">{asset.fk_asset_type ? asset.fk_asset_type : "N/A"}</td>
                  </tr>
                  )
                })
              : <span>User has no assets associated</span>
              
            }
          </tbody>
        </table>
        <Separator />
        <div className="flex flex-row gap-2">
          <NavLink to={`/users/${user.id}/edit`} className="mb-4 min-w-30 bg-blue-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconEdit size={18} /> Edit</NavLink>
          <NavLink to={`/users/${user.id}/delete`} className="mb-4 min-w-30 bg-red-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconTrash size={18} /> Delete</NavLink>
        </div>
      </section>
    )} catch(e) {
      return <span>Error: {JSON.stringify(e)}</span>
    }
}