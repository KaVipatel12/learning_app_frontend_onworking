import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

function ChapterPage() {
  const APP_URI = "http://localhost:8000";
  const {chapterId} = useParams()
  const {courseId} = useParams()
  const [chapter, setChapter] = useState();
  const [isContentLoad, setContent] = useState(false)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  // Fetch function to retrieve chapters of particular course
  useEffect(() => {
    const FetchAllChapter = async () => {
      try {
        const response = await fetch(
          `${APP_URI}/api/course/fetchchapter/${courseId}/${chapterId}`,
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
            setChapter(data.msg); 
            setContent(true)
        } else {
            setChapter();
            setContent(false)
            toast.warning(data.msg)
            navigate(-1)
        }
    } catch (error) {
          setContent(false)
        setChapter();
      }
    };
  
    // Fetch chapters on component mount
    FetchAllChapter();
    }, [chapterId , token , navigate, courseId]);
  return (

      <>
      <Navbar />
    { isContentLoad ? (
        <div>
        <p> {chapter.title || "title"} </p>
        <p> {chapter.description || "desc"} </p>
        <button>  </button>
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

export default ChapterPage
