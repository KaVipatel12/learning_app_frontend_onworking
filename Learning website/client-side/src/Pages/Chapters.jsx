import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";
import "../App.js"
import Loading from "../components/Loading.jsx";

function Chapters() {
  const APP_URI = "http://localhost:8000";
  const token = localStorage.getItem("token");
  const { courseId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [isCoursePurchased, setIsCoursePurchased] = useState(false);
  const [isModify, setIsModify] = useState(false); 
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { User } = useAuth();

  const capitalizeFirstLetter = (text) => {
    if (!text) return ""; // Handle empty or undefined text
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Fetch function to retrieve chapters of the particular course
  const FetchAllChapter = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${APP_URI}/api/course/fetchchaptersmainpage/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setChapters(data.msg); // Assuming `data.msg` contains the chapters
        setIsModify(data.isCourseModify); 
      } else {
        setChapters([]);
      }
    } catch (error) {
      setChapters([]);
    }finally{
      setLoading(false)
    }
  }, [APP_URI, courseId, token]);

  // UseEffect to fetch chapters and check purchase status
  useEffect(() => {
    FetchAllChapter();

    if (User && User.purchaseCourse) {
      const purchased = User.purchaseCourse.some(
        (course) => course.courseId === courseId
      );
      setIsCoursePurchased(purchased);
    }

  }, [FetchAllChapter, User , courseId]);

  const handleNavigate = (courseId, chapterId) => {
    if (isCoursePurchased || isModify) {
      navigate(`/chapter/${courseId}/${chapterId}`);
    } else {
      toast.warning("Course not purchased");
    }
  };

  if(loading){
    return(
    <>
    <Navbar />
    <Loading/>
    </>
    ) 
  }
  return (
    <>
      <Navbar />
      {/* Course owner can add courses*/}
      {isModify &&
      <div className="header-container"> <Link to={`/educator/mycourse/addchapter/${courseId}`} className="header-icon" style={{ textDecoration: 'none' }}><i class="ri-add-line"></i></Link></div>
      }
      <div className="container-chapter">
        {chapters.length > 0 ? (
          chapters.map((chapter, sr) => (
            <div
              onClick={() => handleNavigate(courseId, chapter._id)}
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                cursor: "pointer"
              }}
              key={chapter._id}
            >
              <div className="card card-chapter m-3" style={{backgroundColor : "#f0f8ff"}}>
                <div className="card-body">
                  <center>
                    <p style={{color : "#8bb6de"}}> Chapter {sr + 1} </p>
                  </center>
                  <h4 className="card-title m-0" style={{color : '#101828'}}>
                    {capitalizeFirstLetter(chapter.title)}
                  </h4>
                  <p className="card-text"> {chapter.price} </p>
                  <p className="card-text" style={{color : "#f5a623"}}>
                    {!isCoursePurchased ? (isModify ? ("My course") : (null)) : ("Not Purchased")}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No chapters available.</p>
        )}
      </div>
    </>
  );
}

export default Chapters;
