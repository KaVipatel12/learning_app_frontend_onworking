import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

function Chapters() {
  const APP_URI = "http://localhost:8000";
  const { courseId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [isCoursePurchased, setIsCoursePurchased] = useState(false);
  const navigate = useNavigate();
  const { User } = useAuth();

  const capitalizeFirstLetter = (text) => {
    if (!text) return ""; // Handle empty or undefined text
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Fetch function to retrieve chapters of the particular course
  const FetchAllChapter = useCallback(async () => {
    try {
      const response = await fetch(
        `${APP_URI}/api/course/fetchchaptersmainpage/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setChapters(data.msg); // Assuming `data.msg` contains the chapters
      } else {
        setChapters([]);
      }
    } catch (error) {
      setChapters([]);
    }
  }, [APP_URI, courseId]);

  // UseEffect to fetch chapters and check purchase status
  useEffect(() => {
    FetchAllChapter();

    if (User && User.purchaseCourse) {
      const purchased = User.purchaseCourse.some(
        (course) => course.course === courseId
      );
      setIsCoursePurchased(purchased);
    }
  }, [User, courseId, FetchAllChapter]);

  const handleNavigate = (courseId, chapterId) => {
    if (isCoursePurchased) {
      navigate(`/chapter/${courseId}/${chapterId}`);
    } else {
      toast.warning("Course not purchased");
    }
  };

  return (
    <>
      <Navbar />
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
                    {!isCoursePurchased && "Not Purchased"}
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
