import React, { useEffect, useState } from 'react'
import "../Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/Auth'

function AdminNavbar() {

  const navigate = useNavigate()
  const [IsLoggedIn, setLoggedIn] = useState(false)  
  const {User, loading, isAdmin} = useAuth(); 

  useEffect(() => {
    if (User && isAdmin){
      setLoggedIn(true)
    }else{
        navigate(-1)
    }
  }, [User, isAdmin, navigate])

  return (
<div>
  <meta charSet="utf-8" />
  <title>Responsive Navbar</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  {/* Font Awesome Link for Icons */}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
  <nav>
    {/* Checkbox for toggling menu */}
    <input type="checkbox" id="check" />
    {/* Menu icon */}
    <label htmlFor="check" className="checkbtn">
      <i className="fas fa-bars" />
    </label>
    {/* Site logo */}
    <label className="logo">WowLearning</label>
    {/* Navigation links */}
    <ul>
      <li><Link className="active" to="/home">Home</Link></li>
      <li>  <Link to="/adminpanel/userlist"> UserList </Link> </li>
      <li> <Link to="/adminpanel/educatorlist"> Educators list </Link></li>    
      {
      !loading && (
      IsLoggedIn ? (
      <li><Link to="/logout">Logout</Link></li>
      ) : (
        <>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
        </>
      ))
      }
    </ul>
  </nav>
</div>

  )
}

export default AdminNavbar
