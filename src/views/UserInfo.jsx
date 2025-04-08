import { UserStore } from "../zustand/users"
import { AssetStore } from "../zustand/assets"
import { ProjectsStore } from "../zustand/projects"
import { useShallow } from "zustand/react/shallow"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import Separator from "../components/Separator"
import { NavLink, useNavigate } from "react-router"
import userService from "../services/userService"
import projectService from "../services/projectService"
import assetService from "../services/assetService"
import { IconEdit, IconTrash, IconUser, IconDevices, IconUnlink, IconLibraryPlus } from '@tabler/icons-react';
import { ReleaseAsset } from "../components/ReleaseAsset"
import { SearchAsset } from "../components/SearchAsset"
import { DeleteUser } from "../components/DeleteUser"
import toast, {Toaster} from "react-hot-toast"


export function UserInformation () {
  const [getUserById] = UserStore(useShallow(store => [store.getUserById]))
  const [getAssetsByUserId, updateAsset] = AssetStore(useShallow(store => [store.getAssetsByUserId, store.updateAsset]))
  const [getProjectById, setProjects] = ProjectsStore(useShallow(store => [store.getProjectById, store.setProjects]))
  const [project, setProject] = useState({})
  const [user, setUser] = useState({})
  const [userAssets, setUserAssets] = useState([])
  const [releaseModal, setReleaseModal] = useState()
  const [searchModal, setSearchModal] = useState()
  const [deleteModal, setDeleteModal] = useState()
  const [assetToRelease, setAssetToRelease] = useState()
  const navigator = useNavigate()

  let params = useParams()

  const handleModal = (id) => {
    setAssetToRelease(id)
    releaseModal.showModal()
  }

  const handleRelease = async () => {
    const result = await assetService.release(assetToRelease.id)
    updateAsset(result.data[0])
    setUserAssets([...userAssets.filter(asset => asset.id != result.data[0].id)])
    releaseModal.close()
    setAssetToRelease(null)
  }

  const handleNewAsset = (newAsset) => {
    try {
      assetService.assignUser(newAsset.id, user.id)
      updateAsset(newAsset)
      setUserAssets([...userAssets, newAsset])
      searchModal.close()
    } catch(e) {
      console.log(e)
    }

  }

  const handleDelete = async () => {
    const result = await userService.delete(user.id)
    console.log(result.status)
    if (result.status == 204) navigator("/users")
    if (result.status == 403) toast.error("Not authorized to delete the user")

  }

  const fetchAssets = async () => {
    let assets = getAssetsByUserId(params.userId)
    if (userAssets.length < 1){
      const resultAssets = await userService.getAssets(params.userId)
      assets = resultAssets.data
    }
    setUserAssets(assets)
  }

  const fetchProjects = async (id) => {
    let projectData = getProjectById(id)
    if (!projectData) {
      projectData = await projectService.get(id)
      setProjects(projectData.data)
      projectData = projectData.data.find(project => project.id == id)
    }
    setProject(projectData)
  }

  const getUserInfo = async () => {
    let userResult = getUserById(params.userId)
    await setUser(userResult)
    if (userResult && userResult.fk_project_id) await fetchProjects(userResult.fk_project_id)
    await fetchAssets()
  }

  useEffect(() => {
    getUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if ((user && user.id) && userAssets) {
    return (
      <section>
        <Toaster />
        <ReleaseAsset asset={assetToRelease} setRef={setReleaseModal} action={handleRelease} />
        <SearchAsset setRef={setSearchModal} action={handleNewAsset} />
        <DeleteUser setRef={setDeleteModal} user={user} action={handleDelete}/>
        <h1 className="text-3xl font-bold flex items-center gap-2"><IconUser stroke={3}/> User Information</h1>
        <Separator />
        <p><span className="font-bold">ID: </span><span>{user.id}</span></p>
        <p><span className="font-bold">Employee ID: </span><span>{user.userid}</span></p>
        <p><span className="font-bold">Name: </span><span>{user.name}</span></p>
        <p><span className="font-bold">Enabled: </span><span>{user.enabled == 1 ? "True" : "False"}</span></p>
        <p><span className="font-bold">User Type: </span><span>{user.usertype}</span></p>
        <p><span className="font-bold">Project: </span><span>{user.fk_project_id ? project.name : "Not set"}</span></p>
        <h2 className="text-2xl font-bold flex items-center gap-2 mt-10"><IconDevices />Asets</h2>
        <Separator />
        { userAssets && userAssets.length > 0 ?
                <table className="w-full border-collapse mb-7 shadow-md shadow-neutral-300">
                  <thead className="">
                    <tr className="bg-neutral-400">
                      <th className="border-b-neutral-400 pt-2 pb-2">ID</th>
                      <th className="border-b-neutral-400 pt-2 pb-2">Serial #</th>
                      <th className="border-b-neutral-400 pt-2 pb-2">Model</th>
                      <th className="border-b-neutral-400 pt-2 pb-2">Brand</th>
                      <th className="border-b-neutral-400 pt-2 pb-2">Size</th>
                      <th className="border-b-neutral-400 pt-2 pb-2">Asset Type</th>
                      <th className="border-b-neutral-400 pt-2 pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {userAssets.map((asset, index) => {
                    return(
                      <tr key={index} className="odd:bg-white even:bg-neutral-200">
                        <td className="border-t-neutral-300 border-t-solid border-t-1 text-center pt-2 pb-2 font-bold">{asset.id}</td>
                        <td className="border-t-neutral-300 border-t-solid border-t-1 text-center pt-2 pb-2"><NavLink className="text-blue-500" to={`/assets/${asset.id}`}>{asset.serial}</NavLink></td>
                        <td className="border-t-neutral-300 border-t-solid border-t-1 text-center pt-2 pb-2">{asset.model}</td>
                        <td className="border-t-neutral-300 border-t-solid border-t-1 text-center pt-2 pb-2">{asset.brand}</td>
                        <td className="border-t-neutral-300 border-t-solid border-t-1 text-center pt-2 pb-2">{asset.size ? asset.size : "N/A"}</td>
                        <td className="border-t-neutral-300 border-t-solid border-t-1 text-center pt-2 pb-2">{asset.type ? `${asset.type[0].toUpperCase()}${asset.type.slice(1)}` : "N/A"}</td>
                        <td className="border-t-neutral-300 border-t-solid border-t-1 flex justify-center pt-2 pb-2"><button className="flex items-center justify-center gap-2 py-1 rounded-sm bg-green-500 min-w-30 cursor-pointer hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100" onClick={() => handleModal(asset)}><IconUnlink size={18}/> Release</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
          : <span>User has no assets associated</span> 
        }
        <Separator />
        <div className="flex flex-row gap-2">
          <NavLink to={`/users/${user.id}/edit`} end className="mb-4 min-w-30 bg-blue-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconEdit size={18} /> Edit</NavLink>
          <button className="mb-4 min-w-30 bg-green-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2" onClick={() => searchModal.showModal()}><IconLibraryPlus size={18} /> Add asset</button>
          <button className="mb-4 min-w-30 bg-red-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2" onClick={() => deleteModal.showModal()}><IconTrash size={18} /> Delete</button>
        </div>
      </section>
    )
  } else {
    return <span>Loading...</span>
  }
}