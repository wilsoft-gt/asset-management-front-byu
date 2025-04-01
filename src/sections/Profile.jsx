import { AuthStore } from "../zustand/login"
import { IconLogout } from '@tabler/icons-react';
import { useNavigate } from 'react-router'
export default function Profile() {
  const userData = AuthStore(store => store.userData)
  const logout = AuthStore(store => store.logout)
  const navigation = useNavigate()

  const handleLogout = () => {
    navigation("/")
    logout()
  }

  return(
    <div className="flex flex-col text-center" id="profileContainer">
      <h2 className="font-bold text-xl">
        Welcome {userData.name}
      </h2>
      <p>
        <span className="text-sm">Role:</span> {userData.usertype}
      </p>
      <button onClick={handleLogout} className="flex w-fit mt-3 items-center self-end gap-2 px-4 py-1 text-neutral-500 rounded-sm cursor-pointer hover:bg-neutral-200 hover:text-neutral-900">
        <IconLogout stroke={1} size={18}/>
        Logout
      </button>
    </div>
  )
}