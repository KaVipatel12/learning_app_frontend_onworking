import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Chapters() {
  const APP_URI = "http://localhost:8000";
  const { courseId } = useParams();
  const [chapters, setChapters] = useState([]);

  // Fetch function to retrieve chapters of particular course
  const FetchAllChapter = async () => {
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
        setChapters(data.msg); // Assuming `data.data` contains the array of chapters
      } else {
        setChapters([]);
      }
    } catch (error) {
      setChapters([]);
    }
  };

  // Fetch chapters on component mount
  useEffect(() => {
    FetchAllChapter();
  }, []);
  return (
    <>
    <Navbar />
    <div className="container">
      {chapters.length > 0 ? (
        chapters.map((chapters) => (
          <div className="card my-2" style={{ width: "18rem" }} key={chapters._id}>
            <div className="card-body">
              <h5 className="card-title">{chapters.title}</h5>
              <p className="card-text"> {chapters.price} </p>
              <Link to={`/chapter/${chapters._id}`} className="btn btn-primary">
                Explore
              </Link>
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
