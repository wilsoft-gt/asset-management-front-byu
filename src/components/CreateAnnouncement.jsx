import { useState } from "react"
import { Modal } from "../components/Modal"
import { useForm } from "react-hook-form"
import { Input, TextArea } from "./Input"
import { Select } from "./Select"
import { IconX, IconDeviceFloppy} from '@tabler/icons-react';



export const CreateAnnouncement = ({setRef, action}) => {
  const [modal, setModal] = useState()
  const {register, reset, handleSubmit} = useForm()

  const handleClose = () =>{
    modal.close()
    reset()
  }

  const create = (data) =>{
    action(data)
    reset()
  }

  const handleModal = (modal) => {
    setModal(modal)
    setRef(modal)
  }

  return (
    <Modal setRef={handleModal}>
      <section className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Create new announcement</h1>
        <form className="flex flex-col gap-4" id="createAnnouncement" action={null} onSubmit={handleSubmit(create)}>
          <Input label="Title" name="title" hook={register} />
          <TextArea label="Content" name="content" hook={register} />
          <Select label="Active" name="active" hook={register} options={[{label: "Yes", value: 1}, {label: "No", value: 0}]}/>
        </form>
        <div className="flex gap-3 justify-end mt-5">
          <button form="createAnnouncement" className="flex gap-2 items-center justify-center bg-blue-500 text-white pt-1 pb-1 min-w-30 rounded-sm hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer"><IconDeviceFloppy size={18}/> Continue</button>
          <button className="flex gap-2 items-center justify-center bg-red-500 text-white pt-1 pb-1 min-w-30 rounded-sm hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer" onClick={handleClose}> <IconX size={18}/> Close</button>
        </div>
      </section>
    </Modal>
  )
}