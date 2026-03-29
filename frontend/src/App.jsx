import { useState } from "react"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Dashboard from "./components/Dashboard"

function App(){

  const [page,setPage] = useState("login")

  const [token,setToken] = useState(
    localStorage.getItem("token")
  )

  if(!token){

    if(page === "login"){
      return <Login setToken={setToken} setPage={setPage}/>
    }

    if(page === "register"){
      return <Register setPage={setPage}/>
    }

  }

  return <Dashboard token={token} setToken={setToken}/>

}

export default App