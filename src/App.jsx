import Login from "./views/Login"
import Home from "./views/Home"
import { AuthStore } from "./zustand/login"
function App() {
  const isLogedIn = AuthStore(store => store.isLogedIn)
  if (isLogedIn)  return <Home />
  return <Login />
}

export default App
