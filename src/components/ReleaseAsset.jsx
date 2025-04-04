import { useEffect, useState } from "react";
import { Modal } from "./Modal"
import { IconDeviceFloppy, IconX, IconUnlink} from '@tabler/icons-react';

export const ReleaseAsset = ({asset, setRef, action}) => {
  const [ref, setReferencia] = useState()
  
  useEffect(() => {
    setRef(ref)
  })
  
  return (
    <Modal setRef={setReferencia}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <IconUnlink stroke={3} size={30} />  
            <h3 className="text-3xl font-bold">Release asset</h3>
          </div>
          <div>
            <p className="text-red-500 font-bold mb-4">Are you sure you want to release the following asset?</p>
            <p><span className="font-bold">Serial: </span>{asset?.serial || ""}</p>
            <p><span className="font-bold">Model: </span>{asset?.model || ""}</p>
            <p><span className="font-bold">Brand: </span>{asset?.brand || ""}</p>
          </div>
          <div className="flex gap-3 justify-end mt-5">
            <button className="flex gap-2 items-center justify-center bg-blue-500 text-white pt-1 pb-1 min-w-30 rounded-sm hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer" onClick={() => action()}><IconDeviceFloppy size={18}/> Continue</button>
            <button className="flex gap-2 items-center justify-center bg-red-500 text-white pt-1 pb-1 min-w-30 rounded-sm hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer" onClick={() => ref.close()}> <IconX size={18}/> Close</button>
          </div>
        </div>
    </Modal>
  )
}