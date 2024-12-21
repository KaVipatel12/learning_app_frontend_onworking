import React, { useEffect, useState } from 'react'
import "../Navbar.css"
import { Link } from 'react-router-dom'
import { useAuth } from '../store/Auth'

function ProviderNavbar() {

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
      <li><Link to="/user/userlist">User lists</Link></li>      
      <li><Link to="/educator/educatorlist">Educators list</Link></li>      
      <li><Link to="/logout">logout</Link></li>      
    </ul>
  </nav>
</div>

  )
}

export default ProviderNavbar
