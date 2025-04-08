import { AuthStore } from "../zustand/login"
import { IconLogout } from '@tabler/icons-react';
import { UserStore } from "../zustand/users";
import { AssetStore } from "../zustand/assets";
import { ProjectsStore } from "../zustand/projects";
import { useShallow } from "zustand/react/shallow";

export default function Profile() {
  const userData = AuthStore(store => store.userData)
  const resetAssets = AssetStore(store => store.resetAssets)
  const resetProjects = ProjectsStore(store=>store.resetProjects)
  const resetUsers = UserStore(store => store.resetUsers)
  const [logout] = AuthStore(useShallow(store => [store.logout]))

  const handleLogout = () => {
    logout()
    resetAssets()
    resetProjects()
    resetUsers()
  }

  return(
    <div className="flex flex-col text-center z-50" id="profileContainer">
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