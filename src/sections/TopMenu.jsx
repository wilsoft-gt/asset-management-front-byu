import { IconUserCog } from '@tabler/icons-react';
import { useState } from "react"
import Search from "../components/Search"
import Profile from "./Profile"

export const TopMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <section className="flex items-center justify-between relative p-4 h-full w-full bg-white rounded-md shadow-md">
      <Search />
      <div className="">
        <button className='hover:bg-neutral-300 rounded-full p-1.5 cursor-pointer' onClick={() => setShowMenu(!showMenu)}><IconUserCog size={18} /></button>
          {showMenu ?   
          <div className="absolute bg-white right-0 w-80 mt-6 p-4 rounded-xl shadow z-50 border-neutral-200 border">
            <Profile /> 
          </div>
        : null}
      </div>
    </section>
  )
}
