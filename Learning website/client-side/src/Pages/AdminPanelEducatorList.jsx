import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'

function AdminPanelEducatorList() {
    
    const APP_URI = "http://localhost:8000";
    const token = localStorage.getItem("token");
    const [educator, setEducator] = useState([])
    const FetchAllUsers = async () => {
        try {
          const response = await fetch(`${APP_URI}/api/admin/providerlists`, {
            method: "GET",
            headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
    
          const data = await response.json();
          console.log("Educator list")
          console.log(data)
          if (response.ok) {
            setEducator(data.msg); 
          } else {
            setEducator([]);
          }
        } catch (error) {
            setEducator([]);
        }
      };
    
      // Fetch courses on component mount
      useEffect(() => {
        FetchAllUsers();
      }, []);

  return (
    <>
      <AdminNavbar /> 
      { educator.map((educator) => {
        return <div className='main' key={educator._id}>
            <li> {educator.username} </li>
        </div>
      }) }
    </>
  )
}

export default AdminPanelEducatorList

