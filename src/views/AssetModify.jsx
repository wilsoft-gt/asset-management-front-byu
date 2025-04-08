import { Input } from "../components/Input"
import Separator from "../components/Separator"
import { useForm } from "react-hook-form"
import { Select } from "../components/Select"
import assetService from "../services/assetService"
import { AssetStore } from "../zustand/assets"
import { useNavigate, NavLink, useParams } from "react-router"
import toast, {Toaster} from "react-hot-toast"


import { IconPlus, IconX } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useShallow } from "zustand/react/shallow"

export const AssetEdit = () => {
  const navigator = useNavigate()
  const {assetId} = useParams()
  const [getAssetById, updateAsset] = AssetStore(useShallow(store => [store.getAssetById, store.updateAsset]))
  const [asset, setAsset] = useState()
  const {register, reset, handleSubmit } = useForm()

  const typeOptions = [
    {label: "Computer", value: "computer" },
    {label: "Monitor", value: "monitor" },
    {label: "Laptop", value: "laptop" },
    {label: "Docking Station", value: "dockstation" },
    {label: "Tablet", value: "tablet" },
    {label: "Webcam", value: "webcam" },
    {label: "Headset", value: "Headset" },
    {label: "IP Phone", value: "ipphone" },
  ]

  const getAssetInfo = () => {
    const result = getAssetById(assetId)
    setAsset(result)
    reset(result)
  }

  const updateAssetInfo = async (data) => {
    const modifiedFields = Object.keys(data).reduce((acc, key) => {
      if(data[key] !== asset[key]) {
        acc[key] = data[key]
      }
      return acc
    }, {})
    const response = await assetService.update(assetId,modifiedFields)
    reset(response.data[0])
    updateAsset(response.data[0])
  }

  useEffect(() => {
    getAssetInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return(
    <section className="flex gap-4 flex-col">
      <Toaster />
      <h1 className="font-bold text-2xl">Create asset</h1>
      <Separator />
      <form id="createForm" action={null} onSubmit={handleSubmit(updateAssetInfo)}>
        <div className="flex gap-4">
          <Input label="Serial" name="serial" hook={register} />
          <Input label="Model" name="model" hook={register} />
        </div>
        <div className="flex gap-4">
          <Input label="Brand" name="brand" hook={register} />
          <Input label="Size" name="size" hook={register} />
        </div>
        <Select label="Type" name="type" hook={register} options={typeOptions} />
      </form>
      <Separator />
      <div className="flex gap-4">
        <button form="createForm" className="mb-4 min-w-30 bg-blue-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconPlus size={18} /> Create</button>
        <NavLink to="/assets" end className="mb-4 min-w-30 bg-red-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2" onClick={() => navigator("/users")}><IconX size={18} /> Cancel</NavLink>
      </div>
    </section>
  )
}
