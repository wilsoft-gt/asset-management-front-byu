import { Menu, MenuItem } from "../components/Menu";
import { IconUsers, IconHome, IconMenu2, IconDevicesPc, IconDeviceDesktopAnalytics } from '@tabler/icons-react';
import Separator from "../components/Separator";
import { AuthStore } from "../zustand/login"


export default function Navigation() {
  const userData = AuthStore(store => store.userData)
  
  return (
    <section className="p-4 h-full w-full bg-white rounded-md shadow-md">
      <div className="flex gap-2 items-center justify-between">
        <h1 className='font-bold text-xl'>Menu</h1>
        <IconMenu2 stroke={1.5} size={25}/>
      </div>
      <Separator />
      <Menu> 
        <MenuItem route="/" label="Home" icon={<IconHome size={18}/>} />
        <MenuItem route="/users" label="Users" icon={<IconUsers size={18}/>} />
        <MenuItem route="/assets" label="Assets" icon={<IconDevicesPc size={18}/>} />
        { userData.usertype == "admin" ?
          <>
            <Separator />
            <MenuItem route="/reports" label="Reports" icon={<IconDeviceDesktopAnalytics size={18}/>} />
          </>
          : null
        
        }
      </Menu>
      <Separator />

    </section>
  )
}