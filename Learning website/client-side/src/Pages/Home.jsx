import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import PhotoPara from '../components/PhotoPara';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import UseCourseRedirect from '../components/UseCourseRedirect';
import { useAuth } from '../store/Auth';

function Home() {
  const APP_URI = "http://localhost:8000";
  const {Provider, User} = useAuth(); 
  const token = localStorage.getItem("token")
  const courseId = null
  UseCourseRedirect(Provider, courseId , "/educator/profile")

  const carouselImages = [
    {     
      index: "1",
      img: "./photos/homeimage1.jpg",
    },
    {
      index: "2",
      img: "./photos/homeimage3.jpg"
    },
    {
      index: "3",
      img: "./photos/homeimage2.jpg",
      heading : "Get skilled by top educators"
    }
  ];

  const infoData = [
    {
      img1: "./photos/exp-educator.jpeg",
      heading: "Learn from Industry Experts",
      paragraph: "Gain practical skills through direct interaction with seasoned professionals boasting over 20 years of industry experience. Learn from the best and elevate your career with insights and expertise that only experts can provide.."
    },
    {
      img1: "./photos/certificate.jpg",
      heading: "Earn Your Certificate",
      paragraph: "Receive a prestigious certificate upon completion, a valuable asset that can significantly boost your job prospects. This certificate serves as a testament to your newly acquired skills, helping you stand out in the competitive job market."
    },
    {
      img1: "./photos/educator.jpeg",
      heading: "Become an Educator",
      paragraph: "Share your knowledge and passion with eager learners while earning money. Become a mentor and make a lasting impact, all while enriching your professional journey as an educator.."
    }
  ];

  const categories = [
    { title: "Programming" },
    { title: "Data Science" },
    { title: "Machine Learning" },
    { title: "Chatgpt" },
    { title: "MBA" }
  ];

  // State to hold the fetched courses
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");  // State for selected category
  const [studentCategoryCourses, setStudentCategoryCourses] = useState([]);  // Stores the courses of student interest
  const [studentCourses, setStudentCourses] = useState([])

  // Fetch function to retrieve courses based on category
  const FetchCoursesByCategory = async (category) => {
    setLoading(true);  // Set loading state to true while fetching

    const fetchURL = category ? `/api/course/fetchcourses?category=${category}` : "/api/course/fetchcourses";  // Build URL with category if available

    try {
      const response = await fetch(`${APP_URI}${fetchURL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCourses(data.msg); // Set courses based on response
      } else {
        setCourses([]); // Set empty array if no courses found
      }
    } catch (error) {
      setCourses([]);  // Set empty courses array in case of error
    } finally {
      setLoading(false);  // Set loading state to false after fetching
    }
  };

// Fetch function to retrieve courses based on student's category
  const fetchCourseStudentCategory = useCallback(async () => {
    setLoading(true);  
    try {
      const response = await fetch(`${APP_URI}/api/fetchcategorycourses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        },
      });

      const data = await response.json();
      console.log( "Student cateogry courses" +  data.msg); 
      if (response.ok) {
        setStudentCategoryCourses(data.msg); // Set courses based on response
      } else {
        setStudentCategoryCourses([]);
      }
    } catch (error) {
      setStudentCategoryCourses([]);     
    } finally {
      setLoading(false);  // Set loading state to false after fetching
    }
  }, [token]);

  // Fetch courses when category changes
  useEffect(() => {
    FetchCoursesByCategory(category);  // Fetch based on selected category

  }, [category]);  // Trigger when category changes

  useEffect(() => {
   if(User){
    setStudentCourses(User.purchaseCourse || ""); 
   }
  }, [User])
  useEffect(() => {   
    if(token){
      fetchCourseStudentCategory()
    }
  }, [fetchCourseStudentCategory, token]);  // Trigger when category changes

  return (
    <>
      <Navbar />
      <Carousel carouselImages={carouselImages} />
      { studentCourses &&
        <>
      <center className="mt-4">
        <h2 style={{ color: "#2c3e50", fontFamily: "Poopins", backgroundColor : "#f0f8ff", width : "fit-content"}}> Purchased Courses </h2>
        <br />
      </center>
      <Card loading={loading} courses={studentCourses} />
      </>
      }

      <center className="mt-4">
        <h2 style={{ color: "#2c3e50", fontFamily: "Poopins", backgroundColor : "#f0f8ff", width : "fit-content"}}>Explore the trending courses</h2>
        <br />
      </center>
      <center className="categories">
        <Categories categories={categories} onCategoryClick={setCategory} />
      </center>
      <Card loading={loading} courses={courses} />
      {
        studentCategoryCourses ? (
        <> 
        <center className="mt-4">
        <h2 style={{ color: "#2c3e50", fontFamily: "Poopins", backgroundColor : "#f0f8ff", width : "fit-content"}}>Courses that might Interest you</h2>
        <br />
      </center>
      <Card loading={loading} courses={studentCategoryCourses} />
        </> 
    ) : (null)
    }
      <div>
        {infoData.map((data, index) => (
          <PhotoPara
            key={index}
            imageUrl={data.img1}
            heading={data.heading}
            paragraph={data.paragraph}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
