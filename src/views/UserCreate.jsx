import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { useForm } from "react-hook-form"
import { ProjectsStore } from "../zustand/projects"
import { UserStore } from "../zustand/users"
import userService from "../services/userService"
import Separator from "../components/Separator"
import { useEffect } from "react"
import { useNavigate, NavLink } from "react-router"
import { IconUserPlus, IconX } from "@tabler/icons-react"

export const UserCreate = () => {
  const projects = ProjectsStore(store => store.projects)
  const updateUser = UserStore(store => store.updateUser)
  const {register, watch, unregister, handleSubmit } = useForm({defaultValues: {}})
  const userType = watch("user.usertype")
  const navigator = useNavigate()
  useEffect(() => {
    if (userType == "user") {
      unregister(["auth.username", "auth.password"])   
    }
  }, [userType, unregister])

  const handleCreate = async (data) => {
    let newUser = {}
    if (data.user.usertype === "user") {
      const result1 = await userService.create(data)
      newUser = result1.data[0]
    } else {
      const result2 = await userService.createAuth(data)
      newUser = result2.data[0]
    }
    console.log(newUser)
    updateUser(newUser)
    navigator(`/users/${newUser.id}`)
  }

  return (
    <section>
      <h1 className="font-bold text-2xl">Create user</h1>
      <Separator/>
      <form id="createForm" className="flex flex-col gap-4 mb-4" action={null} onSubmit={handleSubmit(handleCreate)}>
        <div className="flex gap-4">
          <Input label="User Id" name="user.userid" hook={register}/>
          <Input label="Name" name="user.name" hook={register}/>
        </div>
        <div className="flex gap-4">
          <Select label="Type" name="user.usertype" hook={register} options={[{value: "user", label: "User"}, {value: "sup", label: "Supervisor"}, {value: "admin", label: "Administrator"}]} />
          <Select label="Enabled" name="user.enabled" hook={register} options={[{value: 1, label: "True"}, {value: 0, label: "False"}]} />
        </div>
        <Select label="Project" name="user.fk_project_id" hook={register} options={projects.map(project => ({value: project.id, label: project.name}))} />
        {
          userType != "user" && userType != null ?
          <>
            <Input label="User Name" name="auth.username" hook={register}/>
            <Input label="Password" name="auth.password" hook={register}/>
          </>
          : null
        }
      </form>
      <div className="flex gap-4">
        <button form="createForm" className="mb-4 min-w-30 bg-blue-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconUserPlus size={18} /> Create</button>
        <NavLink to="/users" end className="mb-4 min-w-30 bg-red-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2" onClick={() => navigator("/users")}><IconX size={18} /> Cancel</NavLink>
      </div>
    </section>
  )
}