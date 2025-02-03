import React, { useState } from 'react'
import "../Auth.css"
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../store/Auth'
import { toast } from 'react-toastify'

function Login() {
    const beckend_api_url = "http://localhost:8000"
    const {storeTokenLocalStorage} = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const submitDetails = async (e) => {
        e.preventDefault()
        const userData = {email , password}
        setLoading(true)
        // Validate that all fields are filled
  try{

    const response = await fetch(`${beckend_api_url}/api/auth/login`, {
      method: 'POST',
      headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
      }) 
      const data = await response.json()
      if(response.ok){
        setLoading(false)
        const token = data.token; 
        storeTokenLocalStorage(token)
        toast.success('Login Successful');
        if(data.role === "provider"){
          navigate("/educator/profile");
        }else{
          navigate("/home")
        }
          }
          else {
            setLoading(false)
            toast.error(data.extraDetails ? data.extraDetails : data.message);
          }
        }catch(error){
          setLoading(false)
          toast.error("There is some error in the server please try again later")
        }
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
    { loading ? (
          <button class="btn btn-primary input-box button" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Loading...</span>
            </button>
          ) : (
          <div className="input-box button">
            <input type="submit" value="Login" />
          </div>
          )}
    <div className="text">
      <h3>Don't have an account? <Link to="/register">Register now</Link></h3>
    </div>
  </div></form>

    </>
  )
}

export default Login
