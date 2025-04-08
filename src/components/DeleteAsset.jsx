import { useState } from "react"
import { Modal } from "../components/Modal"
import { IconTrash, IconX} from '@tabler/icons-react';

export const DeleteAsset = ({setRef, action, asset}) => {
  const [modal, setModal] = useState()
  const [confirm, setConfirm] = useState()
  
  
  const handleClose = () => {
    modal.close()
    setConfirm(false)
  }
  
  const handleDelete = () => {
    action()
    handleClose()
  }

  const handleRef = (modal) => {
    setModal(modal)
    setRef(modal)
  }

  return (
    <Modal setRef={handleRef}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <IconTrash stroke={3} size={30} />  
            <h3 className="text-3xl font-bold">Delete asset</h3>
          </div>
          {
            !confirm ?
              <>
                <div>
                  <p className="text-red-500 font-bold mb-4">Are you sure you want to delete the following asset?</p>
                  <p><span className="font-bold">User ID: </span>{asset?.serial}</p>
                  <p><span className="font-bold">Name: </span>{asset?.model || ""}</p>
                  <p><span className="font-bold">Type: </span>{asset?.brand || ""}</p>
                </div>
                <div className="flex gap-3 justify-end mt-5">
                  <button className="flex gap-2 items-center justify-center bg-blue-500 text-white pt-1 pb-1 min-w-30 rounded-sm hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer" onClick={() => setConfirm(true)}><IconTrash size={18}/> Continue</button>
                  <button className="flex gap-2 items-center justify-center bg-red-500 text-white pt-1 pb-1 min-w-30 rounded-sm hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer" onClick={handleClose}> <IconX size={18}/> Close</button>
                </div>
              </>
            : 
              <>
                <div>
                  <p className="text-red-500 font-bold mb-4">This action can't be reversed, are you sure?</p>
                  <p><span className="font-bold">User ID: </span>{asset?.serial}</p>
                  <p><span className="font-bold">Name: </span>{asset?.model || ""}</p>
                  <p><span className="font-bold">Type: </span>{asset?.brand || ""}</p>
                </div>
                <div className="flex gap-3 justify-end mt-5">
                  <button className="flex gap-2 items-center justify-center bg-yellow-500 text-white pt-1 pb-1 min-w-30 rounded-sm hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer" onClick={handleDelete}><IconTrash size={18}/> Delete</button>
                  <button className="flex gap-2 items-center justify-center bg-red-500 text-white pt-1 pb-1 min-w-30 rounded-sm hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer" onClick={handleClose}> <IconX size={18}/> Close</button>
                </div>
              </>
          }
        </div>
    </Modal>
  )
}