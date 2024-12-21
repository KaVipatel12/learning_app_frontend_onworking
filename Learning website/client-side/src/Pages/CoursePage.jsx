import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

function CoursePage() {
  const APP_URI = "http://localhost:8000";
  const {courseId} = useParams()
  const [course, setCourse] = useState();
  const [isContentLoad, setContent] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  // Fetch function to retrieve chapters of particular course

  useEffect(() => {
    const FetchAllCourse = async () => {
      try {
        const response = await fetch(
          `${APP_URI}/api/course/fetchcoursemainpage/${courseId}`,
          {
            method: "GET",
            headers: {
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
    }, [courseId, navigate]);

    const handlePurchase = async () => {
      const courseIds = [courseId]
      try {
        const response = await fetch(
          `${APP_URI}/api/purchasecourse`,
          {
            method: "POST",
            headers: {
            "Authorization" : `Bearer ${token}`,  
            "Content-Type": "application/json"
            },
            body : JSON.stringify(courseIds)
          }
        );
    
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          toast.success(data.msg)
        } else {
            toast.error(data.msg)
          }
        } catch (error) {
      toast.error("Error in purchasing")
      console.log(error)
      }
    }
  return (

      <>
       <Navbar></Navbar>
    { isContentLoad ? (
        <div>
        <p> {course.title || "title"} </p>
        <p> {course.description || "desc"} </p>
        <Link to={`/chapters/${course._id}`} className="btn btn-primary">Explore</Link>
        <button className="btn btn-success" onClick={handlePurchase}>Purchase</button>
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

export default CoursePage
