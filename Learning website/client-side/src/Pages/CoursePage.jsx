import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Loading from "../components/Loading"
import TwoColumnLayout from '../components/TwoColumnLayout';
function CoursePage() {
  const APP_URI = "http://localhost:8000";
  const {courseId} = useParams()
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false)
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
            setLoading(false)
        } else {
            setCourse();
            setLoading(false)
            toast.warning(data.msg)
            navigate(-1)
        }
    } catch (error) {
        setLoading(false)
        setCourse();
      }
    };
  
    // Fetch chapters on component mount
      FetchAllCourse();
    }, [courseId, navigate]);

    const handlePurchase = async () => {
      const title = course.title
      const category = course.category
      const courseData = [{courseId , title , category }]
      try {
        const response = await fetch(
          `${APP_URI}/api/purchasecourse`,
          {
            method: "POST",
            headers: {
            "Authorization" : `Bearer ${token}`,  
            "Content-Type": "application/json"
            },
            body : JSON.stringify(courseData)
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

    if(loading){
      return (
      <>
      <Navbar></Navbar>
      <Loading></Loading>
      </>
      )
    }

  return (

      <>
       <Navbar></Navbar>
    { course ? (
        <TwoColumnLayout course={course} token={token} handlePurchase= {handlePurchase}></TwoColumnLayout>
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
