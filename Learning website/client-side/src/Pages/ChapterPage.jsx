import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import ReviewStars from '../components/ReviewStars';
import CommentBox from '../components/CommentBox';

function ChapterPage() {
  const APP_URI = "http://localhost:8000";
  const {chapterId} = useParams()
  const {courseId} = useParams()
  const [chapter, setChapter] = useState();
  const [loading, setLoading] = useState(true)
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
            setLoading(false)
        } else {
            setChapter();
            setLoading(false)
            toast.warning(data.msg)
            navigate(-1)
        }
    } catch (error) {
          setLoading(false)
          setChapter();
      }
    };
  
    // Fetch chapters on component mount
    FetchAllChapter();
    }, [chapterId , token , navigate, courseId]);

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
      <Navbar />
    { chapter ? (
      <>
        <video src="" class="object-fit-contain" autoplay></video>
        <div className='chapter-main'>
        <h3  style={{color : "#2c3e50", fontWeight: "bold"}}> {chapter.title.charAt(0).toUpperCase() + chapter.title.slice(1) || "title"} </h3>
        <p className="card card-chapter m-3 p-3" style={{backgroundColor : "#f0f8ff", color : "#1A1A1A"}}>{chapter.description.charAt(0).toUpperCase() + chapter.description.slice(1) + "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est ullam corporis doloremque quisquam nobis similique esse facilis asperiores corrupti omnis pariatur, maxime quod magni incidunt at laudantium amet repellat! Distinctio." || "desc"} </p>
         
         <div className="chapter-flex-box">
         <ReviewStars></ReviewStars>
         <CommentBox></CommentBox>
         </div>

        </div>        
      </>
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
