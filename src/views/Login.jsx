import { IconBuildingWarehouse } from '@tabler/icons-react';
import { AuthStore } from '../zustand/login';
import {jwtDecode} from "jwt-decode"
import axios from "axios"
import ContainerFull from '../components/ContainerFull';
import { Card, CardHeader, CardBody } from '../components/Card';
import { Input } from '../components/Input';
import toast, {Toaster} from "react-hot-toast"
import { useForm } from 'react-hook-form';

export default function Login () {
  const {VITE_HOST, VITE_PORT} = import.meta.env
  const setLogedIn = AuthStore(store => store.login)
  const { register, handleSubmit} = useForm({ defaultValues: {username: "WilsonOmar", password: "Omar4291."}})
  
  const handleLogin = async (data) => {
    const errors = {
      401: {
        message: "Incorrect username or password"
      }, 
      500: {
        message: "There as an error, try again"
      },
      "ERR_NETWORK": {
        message: "There was an error with your request"
      }
    }
    
    try {
      const response = await axios.post(`${VITE_HOST}:${VITE_PORT}/auth/login`, data)
      const {id, username, name, enabled, usertype, fk_project_id} = jwtDecode(response.data.token)
      setLogedIn({token: response.data.token, userData: {id, username, name, enabled, usertype, fk_project_id}})
    } catch(e) {
      toast.error(errors[e.status || e.code].message)
    }
  }
  
  return (
    <ContainerFull centerContent={true}>
      <Toaster />
      <Card>
        <CardHeader>
          <IconBuildingWarehouse stroke={1} size={120}/>
          <h1 className='font-bold'>Asset Management System</h1>
        </CardHeader>
        <CardBody>
          <form id="loginform" onSubmit={handleSubmit(handleLogin)}>
            <Input value="WilsonOmar" name="username" label="User Name" hook={register}/>
            <Input value="Omar4291." name="password" label="Password" hook={register}/>
          </form>
        </CardBody>
        <footer className='w-100'>
          <button type='submit' form='loginform' className='mb-4 w-100 bg-neutral-700 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer'>Login</button>
        </footer>
      </Card>      
    </ContainerFull>
  )
}