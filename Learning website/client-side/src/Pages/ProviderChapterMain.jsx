import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import ProviderNavbar from '../components/ProviderNavbar';

function ProviderChapterMain() {
  const APP_URI = "http://localhost:8000";
  const {chapterId} = useParams()
  const [chapter, setChapter] = useState();
  const [courseId, setCourseId] = useState("")
  const [isContentLoad, setContent] = useState(false)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  // Fetch function to retrieve chapters of particular course
  useEffect(() => {
    const FetchAllChapter = async () => {
      try {
        const response = await fetch(
          `${APP_URI}/api/educator/fetchchaptermainpage/${chapterId}`,
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
            setChapter(data.msg); // Assuming `data.data` contains the array of chapters
            setCourseId(data.msg.courseId);
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
    }, [chapterId , token , navigate]);

    const deleteChapter = async () => {
        try {
            const response = await fetch(
              `${APP_URI}/api/educator/deletechapter/${courseId}/${chapterId}`,
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
                toast.success("Chapter deleted Successfully")
                navigate("educator/fetchMyCourse")
            } else {
                toast.error(data.msg)
            }
        } catch (error) {
            toast.error("Error")
            console.log(error)
          }
    }

  return (

      <>
      <ProviderNavbar />
      { isContentLoad ? (
        <div>
        <p> {chapter.title || "title"} </p>
        <p> {chapter.description || "desc"} </p>
        <Link to={`/mycourse/updatechapterinfo/${chapterId}`} className='btn btn-warning'> Update </Link>
        <button className='btn btn-danger' onClick={deleteChapter}> Delete </button>
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

export default ProviderChapterMain;
