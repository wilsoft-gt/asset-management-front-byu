import { useParams, NavLink, useNavigate } from "react-router"
import { UserStore } from "../zustand/users"
import { useShallow } from "zustand/react/shallow"
import { useEffect, useState } from "react"
import Separator from "../components/Separator"
import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { useForm } from "react-hook-form"
import userService from "../services/userService"
import projectService from "../services/projectService"
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { ProjectsStore } from "../zustand/projects"


export default function UserEdit () {
  const navigate = useNavigate()
  const {userId} = useParams()
  const [getUserById, updateUser] = UserStore(useShallow(store => [store.getUserById, store.updateUser]))
  const [user, setUser] = useState({})
  const {register, handleSubmit, reset } = useForm({defaultValues: {}})
  const [projects, setProjects] = ProjectsStore(useShallow(store => [store.projects, store.setProjects]))

  const getProjects = async () => {
    try {
      if (projects.length < 1) {
        const projectsResult = await projectService.getAll()
        setProjects(projectsResult.data)
      }
    } catch(e) {
      console.log(e)
    }
  }

  const getUserData = async () => {
    const userResult = await getUserById(userId)
    setUser(userResult)
    reset(userResult)
  }

  const getData = async () => {
    await getProjects()
    await getUserData()
  }
  
  const submitAction = async (data) => {
    const modifiedFields = Object.keys(data).reduce((acc, key) => {
      if(data[key] !== user[key]) {
        acc[key] = data[key]
      }
      return acc
    }, {})
    const response = await userService.update(user.id, modifiedFields)
    setUser(response.data[0])
    updateUser(response.data[0])
    reset(response.data[0])
    navigate(-1)
  }
  
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  if ((user && user.id) && projects.length > 1){
    return(
      <section>
        <h1 className="text-3xl font-bold flex items-center gap-2">Editing {user.name}</h1>
        <Separator />
        <form className="flex flex-col gap-4" action={null} onSubmit={handleSubmit(submitAction)}>
          <h2>User Data</h2>
          <div className="flex gap-3 w-full">
            <Input label="User ID" name="userid" hook={register}/>
            <Input label="Name" name="name" hook={register} />
          </div>
          <div className="flex gap-3 w-full">
            <Select label="User Type" name="usertype" hook={register} options={[{value: "user", label: "User"}, {value: "sup", label:"supervisor"}, {value: "admin", label: "Administrator"}]} />
            <Select label="Enabled" name="enabled" hook={register} options={[{value: 1, label: "True"}, {value: 0, label: "False"}]}/>
          </div>
          <Select label="Project" name="fk_project_id" hook={register} options={projects.map(project => ({value: project.id, label: project.name}))}/>
          <div className="flex flex-row gap-2">
            <button  className="mb-4 min-w-30 bg-blue-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconDeviceFloppy size={18} /> Save</button>
            
            <NavLink to={`/users/${user.id}`} end type="button" className="mb-4 min-w-30 bg-red-500 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer flex justify-center items-center gap-2"><IconX size={18} /> Cancel</NavLink>
          </div>
        </form>
      </section>
    )
  } else {
    return <span>Loading...</span>
  }
}