import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Loading from "../components/Loading"
import TwoColumnLayout from '../components/TwoColumnLayout';
import UseCourseRedirect from '../components/UseCourseRedirect';
import { useAuth } from '../store/Auth';
function CoursePage() {
  const APP_URI = "http://localhost:8000";
  const {courseId} = useParams()
  const [course, setCourse] = useState();
  const [isModify, setIsModify] = useState(false);  // Checking if the course belongs to provider or not
  const [loading, setLoading] = useState(false)
  const [purchaseLoading, setPurchaseLoading] = useState(false)
  const navigate = useNavigate()
  const {Provider} = useAuth()
  const token = localStorage.getItem("token")

  // Redirect the user if the user is educator and he doesn't own that course
   UseCourseRedirect(Provider, courseId, -1); 
  // Fetch function to retrieve chapters of particular course
    const FetchCourse = useCallback(async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${APP_URI}/api/course/fetchcoursemainpage/${courseId}`,
          {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
            },
          }
        );
    
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            setCourse(data.msg); // Assuming `data.data` contains the array of chapters
            setIsModify(data.isCourseModify)
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
      }finally{
        setLoading(false); 
    }
    }, [courseId, navigate, token]);

    useEffect(() => {
      FetchCourse();
    }, [FetchCourse]);

    const handlePurchase = async () => {
      setPurchaseLoading(true)
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
          navigate(0)
          setPurchaseLoading(false)
        } else {
          toast.error(data.msg)
          setPurchaseLoading(false)
        }
      } catch (error) {
        toast.error("Error in purchasing")
        setPurchaseLoading(false)
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
        <TwoColumnLayout course={course} token={token} handlePurchase= {handlePurchase} purchaseLoading={purchaseLoading} isModify={isModify}></TwoColumnLayout>
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
