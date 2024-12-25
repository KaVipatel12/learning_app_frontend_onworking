import React, { useEffect, useState } from 'react'
import "../Navbar.css"
import { Link } from 'react-router-dom'
import { useAuth } from '../store/Auth'

function Navbar() {

  const [IsLoggedIn, setLoggedIn] = useState(false)  
  const {User, Provider, loading, isAdmin} = useAuth(); 
  useEffect(() => {
    if (User || Provider){
      setLoggedIn(true)
    }
  }, [User , Provider])

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
    <ul className='mb-0'>
      <li><Link className="active" to="/">Home</Link></li>
      <li><Link to="#">About</Link></li>
      <li><Link to="/explorecourses">Explore Courses</Link></li>
      <li><Link to="#">Contact</Link></li>
      <li><Link to={Provider? "/educator/profile" : "/user/profile"}>profile</Link></li>      
      <li><Link to="/user/cart" >Cart </Link></li>      
      {isAdmin ? <li><Link to="/adminpanel" >Admin </Link></li> : null }
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

export default Navbar
