import React, { useState } from 'react'
import Navbar from './Navbar'
import "../Auth.css"
import { Link } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitDetails = (e) => {
        e.preventDefault()
        const data = {email, password}
        console.log(data.email)
        console.log(data.password)
    }
  return (
    <>
     <Navbar /> 
<form className='auth-body' onSubmit={submitDetails}>
  <div className="wrapper">
    <h2>Login</h2>

    <div className="input-box">
      <input type="text" placeholder="Enter your email" required style={{ height : "40px"}} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="input-box">
      <input type="password" placeholder="Enter password" required style={{ height : "40px"}} onChange={(e) => setPassword(e.target.value) }/>
    </div>
    <div className="input-box button">
      <input type="Submit" defaultValue="Login" />
    </div>
    <div className="text">
      <h3>Don't have an account? <Link to="/register">Register now</Link></h3>
    </div>
  </div></form>

    </>
  )
}

export default Login
