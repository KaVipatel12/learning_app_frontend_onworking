import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/Auth'
import Navbar from '../components/Navbar'

function UserProfile() {
    const[username, setUsername] = useState("")
    const[course, setCourse] = useState([])
    const[content, setContent] = useState("")
    const {User, loading} = useAuth()
    const token = localStorage.getItem("token")
    const APP_URI = "http://localhost:8000"
    useEffect(() => {
      if(User){
        setUsername(User.username)
      }
    }, [User])
     
    useEffect(() => {
        const FetchAllChapter = async () => {
          try {
            const response = await fetch(
              `${APP_URI}/api/fetchpurchasedcourse`,
              {
                method: "GET",
                headers: {
                "Authorization" : `Bearer ${token}`, 
                "Content-Type": "application/json",
                },
              }
            );
      
            const data = await response.json();
            if (response.ok) {
                setCourse(data.msg); 
                setContent(true)
            } else {
                setCourse();
                setContent(false)
            }
        } catch (error) {
              setContent(false)
            setCourse();
          }
        };
      
        // Fetch chapters on component mount
        FetchAllChapter();
        }, [token]);

    if(loading){
        return (
            <>
            loading...
            </>
        )
    }
  return (
    <>
    <Navbar />
    <div>
      {username || "Username"}
       <br />
      {course.map(course => <div key={username}><p> {course.title} </p> </div>  )}
    </div>
    </>
  )
}
export default UserProfile
