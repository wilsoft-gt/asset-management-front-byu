import { useEffect, useState } from "react"
import { Modal } from "./Modal"
import Search from "./Search"
import { AssetStore } from "../zustand/assets"
import { useShallow } from "zustand/react/shallow"
import assetService from "../services/assetService"
import { IconSearch, IconX, IconLibraryPlus} from '@tabler/icons-react';

export const SearchAsset = ({action, setRef}) => {
  const [newAsset, setNewAsset] = useState()
  const [text, setText] = useState("")
  const [modal, setModal] = useState()
  const [error, setError] = useState(false)
  const [getAssetById] = AssetStore(useShallow(store => [store.getAssetById]))

  useEffect(() => {
    setRef(modal)
  })

  const handleSearch = async () => {
    let assetResponse = getAssetById(text)
    if (!assetResponse) {
      const fetchResponse = await assetService.getBySerial({serial: text})
      if (!fetchResponse.data[0]) setError(true)
        assetResponse = fetchResponse.data[0]
    }
    setNewAsset(assetResponse)
  }
  
  const handleConfirm = () => {
    action(newAsset)
    setNewAsset()
    setText("")
    modal.close()
  }

  const closeModal = () => {
    setNewAsset()
    setText("")
    modal.close()
  }

  return (
    <Modal setRef={setModal}>
      {
        !newAsset ?
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl">Search asset</h2>
          <Search text={text} setText={setText}/>
          {error ? <sup className="font-bold text-red-500">No data found</sup> : null}
          <div className="flex gap-4">
            <button className="mb-4 min-w-30 bg-green-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2" onClick={handleSearch}><IconSearch size={18} /> Search</button>
            <button className="mb-4 min-w-30 bg-red-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2" onClick={() => closeModal()}><IconX size={18}/>Cancel</button>
          </div>
          
        </div>
        : 
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl">Add asset?</h2>
          <div>
            <p><span>Serial: </span> {newAsset.serial}</p>
            <p><span>Model: </span> {newAsset.model}</p>
            <p><span>Brand: </span> {newAsset.brand}</p>
            <p><span>Type: </span> {newAsset.type}</p>
            <p><span>Size: </span> {newAsset.size ? newAsset.size : "N/A"}</p>
            {newAsset.fk_user_id ? <span className="font-bold text-red-500">Asset is assigned, release it first!</span> : null}
          </div>
          <div className="flex gap-4">
            <button className="mb-4 min-w-30 bg-blue-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2 disabled:bg-neutral-400 disabled:text-neutral-700 disabled:hover:shadow-none disabled:hover:cursor-not-allowed" disabled={newAsset.fk_user_id != null} onClick={ () => handleConfirm()}><IconLibraryPlus size={18} /> Add</button>
            <button className="mb-4 min-w-30 bg-red-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2" onClick={() => closeModal()}><IconX size={18}/>Cancel</button>
          </div>
        </div>
      }    
    </Modal>
  )
  
}