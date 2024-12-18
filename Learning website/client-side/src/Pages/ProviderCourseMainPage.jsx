// This is  to update the course 

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

function ProviderCourseMainPage() {
  const APP_URI = "http://localhost:8000";
  const {courseId} = useParams()
  const token = localStorage.getItem("token")
  const [course, setCourse] = useState();
  const [isContentLoad, setContent] = useState(false)
  const navigate = useNavigate()
  // Fetch function to retrieve chapters of particular course

  useEffect(() => {
    const FetchAllCourse = async () => {
      try {
        const response = await fetch(
          `${APP_URI}/api/educator/fetchcoursemainpage/${courseId}`,
          {
            method: "GET",
            headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json",
            },
          }
        );
    
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            setCourse(data.msg); // Assuming `data.data` contains the array of chapters
            setContent(true)
        } else {
            setCourse();
            setContent(false)
            toast.warning(data.msg)
            navigate(-1)
        }
    } catch (error) {
        setContent(false)
        setCourse();
      }
    };
  
    // Fetch chapters on component mount
      FetchAllCourse();
    }, [courseId, navigate, token]);

    const deleteCourse = async () => {
        try {
            const response = await fetch(
              `${APP_URI}/api/educator/deletecourse/${courseId}`,
              {
                method: "DELETE",
                headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json",
                },
              }
            );
        
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                toast.success("Course deleted Successfully")
                navigate("/educator/fetchMyCourse")
            } else {
                toast.error("Error")
            }
        } catch (error) {
            toast.error("Error")
          }
    }
  return (

      <>
       <Navbar></Navbar>
    { isContentLoad ? (
        <div>
        <p> {course.title || "title"} </p>
        <p> {course.description || "desc"} </p>
        <Link to={`/mycourse/chapters/${course._id}`} className="btn btn-primary">Explore</Link>
        <Link to={`/mycourse/udpatecourseinfo/${course._id}`} className="btn btn-warning mx-3">Update</Link>
        <button className="btn btn-danger mx-3" onClick={deleteCourse}>delete</button>
        </div>
    ): (
        <div>
            Page not loading
        </div>
    )
}
</>
  )
}

export default ProviderCourseMainPage
