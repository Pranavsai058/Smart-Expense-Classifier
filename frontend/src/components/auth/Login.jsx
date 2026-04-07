import { useState } from "react"
import axios from "axios"

function Login({ setToken,setPage }) {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const login = async () => {

    const res = await axios.post(
      "https://smart-expense-classifier-backend.onrender.com/auth/login",
      { email,password }
    )

    localStorage.setItem("token",res.data.token)

    setToken(res.data.token)
  }

  return (

    <div>

      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={login}>Login</button>

      <p>
        New user?
        <button onClick={()=>setPage("register")}>
          Register
        </button>
      </p>

    </div>

  )

}

export default Login