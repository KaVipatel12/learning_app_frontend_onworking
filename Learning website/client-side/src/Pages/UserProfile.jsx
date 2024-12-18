import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/Auth'

function UserProfile() {
    const[username, setUsername] = useState("")
    const {User, loading} = useAuth()

    useEffect(() => {
      if(User){
        setUsername(User.username)
      }
    }, [User])

    if(loading){
        return (
            <>
            loading...
            </>
        )
    }
  return (
    <div>
      {username || "Username"}
    </div>
  )
}

export default UserProfile
