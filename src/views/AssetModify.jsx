import { Input, TextArea } from "../components/Input"
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
  const {register, reset, watch, unregister, handleSubmit, getValues } = useForm()
  const disposed = watch("disposed")

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
    if (!asset) {
      const result = getAssetById(assetId)
      setAsset(result)
      reset(result)
    }
  }

  const updateAssetInfo = async (data) => {
    const modifiedFields = Object.keys(data).reduce((acc, key) => {
      if(data[key] !== asset[key]) {
        acc[key] = data[key]
      }
      return acc
    }, {})
    modifiedFields.disposed = parseInt(modifiedFields.disposed)
    modifiedFields.size = parseInt(modifiedFields.size)
    const response = await assetService.update(assetId,modifiedFields)
    reset(response.data[0])
    updateAsset(response.data[0])
  }

  useEffect(() => {
    getAssetInfo()
    if (disposed == 0) {
      unregister("disposed_reason")
    }
    console.log(getValues())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disposed, unregister])


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
        <div>
          <Select label="Type" name="type" hook={register} options={typeOptions} />
          <Select label="Disposed" name="disposed" hook={register} options={[{label: "True", value: 1}, {label: "False", value: 0}]} />
        </div>
        {disposed == 1 ? <TextArea label="Dispose reason" name="disposed_reason" hook={register} /> : null}
      </form>
      <Separator />
      <div className="flex gap-4">
        <button form="createForm" className="mb-4 min-w-30 bg-blue-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconPlus size={18} /> Save</button>
        <NavLink to="/assets" end className="mb-4 min-w-30 bg-red-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2" onClick={() => navigator("/users")}><IconX size={18} /> Cancel</NavLink>
      </div>
    </section>
  )
}
