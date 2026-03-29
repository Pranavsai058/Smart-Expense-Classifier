import { useState } from "react"
import axios from "axios"

function Register({ setPage }) {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const register = async () => {

    await axios.post(
      "http://localhost:5000/auth/register",
      { name,email,password }
    )

    alert("User registered")

    setPage("login")
  }

  return (

    <div>

      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e)=>setName(e.target.value)}
      />

      <br/><br/>

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

      <button onClick={register}>Register</button>

      <p>
        Already have account?
        <button onClick={()=>setPage("login")}>
          Login
        </button>
      </p>

    </div>

  )

}

export default Register