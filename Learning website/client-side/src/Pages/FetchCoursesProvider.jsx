// fetching the courses in the provider profile 

import React, {useEffect, useState} from 'react'
import ProviderNavbar from '../components/ProviderNavbar';
import { Link } from 'react-router-dom';

function FetchCoursesProvider() {
    
    const APP_URI = "http://localhost:8000"
    const [courses, setCourses] = useState("")

    const FetchAllCourses = async () => {
        try {
          const response = await fetch(`${APP_URI}/api/course/fetchcourses`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log("this is the course data" + data.msg)
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
    <div>
    <>
    <ProviderNavbar />
    
<div className="container">

    <h2>Explore the trending courses</h2>
    {courses.length > 0 ? (
      courses.map((course) => (

<div className="card" style={{width: '18rem'}} key={course._id}>
<img src={`${APP_URI}${course.courseImage}`} className="card-img-top" alt="..." />
<div className="card-body">
  <h5 className="card-title">{course.title}</h5>
  <p className="card-text"> {course.courseImage} </p>
  <Link to={`/mycourse/${course._id}`} className="btn btn-primary">Explore</Link>
</div>
</div>

      ))
    ) : (
      <p>No courses available.</p>
    )}
</div>
  </>
    </div>
  )
}

export default FetchCoursesProvider
