import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'

function AdminPanelUserList() {
    
    const APP_URI = "http://localhost:8000";
    const token = localStorage.getItem("token");
    const [users, setUsers] = useState([])
    const FetchAllUsers = async () => {
        try {
          const response = await fetch(`${APP_URI}/api/admin/userlists`, {
            method: "GET",
            headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
    
          const data = await response.json();
          console.log("User list")
          console.log(data)
          if (response.ok) {
            setUsers(data.msg); 
          } else {
            setUsers([]);
          }
        } catch (error) {
            setUsers([]);
        }
      };
    
      // Fetch courses on component mount
      useEffect(() => {
        FetchAllUsers();
      });

  return (
    <>
      <AdminNavbar /> 
      { users.map((user) => {
        return <div className='main' key={user._id}>
            <li> {user.username} </li>
        </div>
      }) }
    </>
  )
}

export default AdminPanelUserList
