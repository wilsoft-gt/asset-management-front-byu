import { IconBuildingWarehouse } from '@tabler/icons-react';
import { AuthStore } from '../zustand/login';
import {jwtDecode} from "jwt-decode"
import axios from "axios"
import { useState } from 'react';
import ContainerFull from '../components/ContainerFull';
import { Card, CardHeader, CardBody } from '../components/Card';
import { Input } from '../components/Input';
import toast, {Toaster} from "react-hot-toast"

export default function Login () {

  const [userName, setUsername] = useState("WilsonOmar")
  const [password, setPassword] = useState("Omar4291.")
  const {VITE_HOST, VITE_PORT} = import.meta.env
  const setLogedIn = AuthStore(store => store.login)
  
  const login = async () => {
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
      const response = await axios.post(`${VITE_HOST}:${VITE_PORT}/auth/login`, {userName, password})
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
          <Input value={userName} onChange={setUsername} label="User Name"/>
          <Input value={password} onChange={setPassword} label="Password"/>
        </CardBody>
        <footer className='w-100'>
          <button className='mb-4 w-100 bg-neutral-700 pt-1 pb-1 rounded-sm text-white hover:shadow-md hover:bg-neutral-600 hover:text-neutral-100 cursor-pointer' onClick={login}>Login</button>
        </footer>
      </Card>      
    </ContainerFull>
  )
}