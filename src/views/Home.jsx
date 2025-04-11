import ContainerFull from "../components/ContainerFull"
import {Toaster} from "react-hot-toast"
import { BrowserRouter, Routes, Route} from 'react-router'
import UserEdit from "./UserEdit"
import UserList from "./UserList"
import Index from "./Index"
import AssetList from "./AssetList"
import { UserInformation } from "./UserInfo"
import { AssetInformation } from "./AssetInfo"
import { UserCreate } from "./UserCreate"
import { AssetCreate } from "./AssetCreate"
import { AssetEdit } from "./AssetModify"
import { Reports } from "./Reports"

import Navigation from "../sections/Navigation"
import { TopMenu } from "../sections/TopMenu"


export default function  Home() {
  return(
    <ContainerFull>
      <Toaster />
        <BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
          <article className="w-1/4 p-2">
            <Navigation />
          </article>
          <article className="flex flex-col w-full p-2 gap-4">
            <section>
              <TopMenu />
            </section>
            <section className="bg-white rounded-md p-4 flex-1 shadow-md">
              <Routes>
                <Route exact path="/" element={<Index />} />
                <Route exact path="/users" element={<UserList />} />
                <Route exact path="/users/:userId" element={<UserInformation />} />
                <Route exact path="/users/:userId/edit" element={<UserEdit />} />
                <Route exact path="/users/create" element={<UserCreate />}/>
                <Route exact path="/assets" element={<AssetList />} />
                <Route exact path="/assets/:assetId" element={<AssetInformation />} />
                <Route exact path="/assets/create" element={<AssetCreate />} />
                <Route exact path="/assets/:assetId/edit" element={<AssetEdit />} />
                <Route exact path="/reports" element={<Reports />} />
              </Routes>
            </section>
          </article>
        </BrowserRouter>

    </ContainerFull>
  )
  
}