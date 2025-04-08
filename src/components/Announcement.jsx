import { AuthStore } from "../zustand/login"
import { IconEye, IconEyeOff, IconTrash} from '@tabler/icons-react';

export const Announcement = ({announcement, handleTogle, handleDelete}) => {
  
  const userData = AuthStore(store => store.userData)

  return (
    <section className="flex flex-col gap-2 border border-neutral-400 p-4 rounded">
      <div>
        <h1 className="font-bold capitalize text-xl">{announcement.title}</h1>
        <p>{announcement.content}</p>
      </div>
      {
        userData.usertype == "admin" ?
        <div className="flex gap-2">
          <button className={`flex gap-2 items-center justify-center text-white pt-1 pb-1 min-w-30 rounded-sm hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer ${announcement.active == 1 ? "bg-yellow-500" : "bg-green-500"}`} onClick={() => handleTogle(announcement.id)}>{announcement.active == 1 ? <IconEyeOff size={18}/> : <IconEye size={18}/> } {announcement.active == 1 ? "Disable" : "Enable"}</button>
          <button className="flex gap-2 items-center justify-center bg-red-500 text-white pt-1 pb-1 min-w-30 rounded-sm hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer" onClick={() => handleDelete(announcement.id)}> <IconTrash size={18}/> Delete</button>
        </div> :
        null
      }
      
    </section>
  )
}