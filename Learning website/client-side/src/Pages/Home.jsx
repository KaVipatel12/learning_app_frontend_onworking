import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
// import { toast } from 'react-toastify';
import PhotoPara from '../components/PhotoPara';
import { Link } from 'react-router-dom';

function Home() {
  const APP_URI = "http://localhost:8000";

  // Array of objects
  const infoData = [
    {
      img1: "https://via.placeholder.com/100",
      heading: "Heading 1",
      paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, consequuntur."
    },
    {
      img1: "https://via.placeholder.com/100",
      heading: "Heading 2",
      paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, consequuntur."
    },
    {
      img1: "https://via.placeholder.com/100",
      heading: "Heading 3",
      paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, consequuntur."
    }
  ];

  // State to hold the fetched courses
  const [courses, setCourses] = useState([]);

  // Fetch function to retrieve courses
  const FetchAllCourses = async () => {
    try {
      const response = await fetch(`${APP_URI}/api/course/fetchcourses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Course data")
      console.log(data)
      if (response.ok) {
        setCourses(data.msg); // Assuming `data.data` contains the array of courses
      } else {
        setCourses([]);
      }
    } catch (error) {
      setCourses([]);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    FetchAllCourses();
  }, []);

  return (
    <>
      <Navbar />
<div className="container">

      <h2>Explore the trending courses</h2>
      {courses.length > 0 ? (
        courses.map((course) => (
  
  <div className="card" style={{width: '18rem'}} key={course._id}>
  <img src={`${APP_URI}${course.courseImage}`} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{course.title}</h5>
    <p className="card-text"> {course.price} </p>
    <Link to={`/course/${course._id}`} className="btn btn-primary">Explore</Link>
  </div>
</div>

        ))
      ) : (
        <p>No courses available.</p>
      )}

      <div>
        {/* Static infoData mapping */}
        {infoData.map((data, index) => (
          <PhotoPara
            key={index}
            image={data.img1}
            heading={data.heading}
            paragraph={data.paragraph}
            />
          ))}

        {/* Dynamic courses mapping */}
      </div>
  </div>
    </>
  );
}

export default Home;
