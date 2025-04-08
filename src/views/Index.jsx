import { useEffect, useState } from "react"
import { Announcement } from "../components/Announcement"
import Separator from "../components/Separator"
import announcementService from "../services/announcementService"
import { IconMessagePlus } from "@tabler/icons-react"
import { CreateAnnouncement } from "../components/CreateAnnouncement"
import { AuthStore } from "../zustand/login"


export default function Index () {
  const [announcements, setAnnouncements] = useState()
  const [announcementModal, setAnnouncementModal] = useState()
  const userData = AuthStore(store => store.userData)


  const handleFetch = async () => {
    const response = await announcementService.getAll()
    setAnnouncements(response.data)
  }

  const handleDelete = async (id) => {
    const result = await announcementService.delete(id)
    if (result.status == 204) setAnnouncements([...announcements.filter(announce => announce.id != id)])    
  }

  const handleTogle = async (id) => {
    const result = await announcementService.togle(id)
    setAnnouncements([...announcements.filter(announce => announce.id != id), result.data[0]])
  }

  const handleCreate = async (data) => {
    const result = await announcementService.create(data)
    setAnnouncements([...announcements, result.data[0]])
    announcementModal.close()
  }

  useEffect(() => {
    handleFetch()
  }, [])

  if (announcements) {
      return(
        <section className="flex flex-col gap-2">
          <CreateAnnouncement setRef={setAnnouncementModal} action={handleCreate} />
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl">Announcements</h1>
            { userData.usertype == "admin" ?
              <button className="flex gap-2 items-center justify-center bg-blue-500 text-white pt-1 pb-1 min-w-30 rounded-sm hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer" onClick={() => announcementModal.showModal()}><IconMessagePlus size={18}/> Add</button>
            
            : null
          }
          </div>
          <Separator />
          {announcements.map(announce => <Announcement announcement={announce} handleDelete={handleDelete} handleTogle={handleTogle}/>)}
        </section>
      )
    } else {
      return <span>Loading...</span>
    }
    
}