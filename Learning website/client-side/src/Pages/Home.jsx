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
  const { Provider, User } = useAuth(); 
  const token = localStorage.getItem("token");
  const courseId = null;
  UseCourseRedirect(Provider, courseId , "/educator/profile");

  const carouselImages = [
    { index: "1", img: "./photos/homeimage1.jpg" },
    { index: "2", img: "./photos/homeimage3.jpg" },
    { index: "3", img: "./photos/homeimage2.jpg", heading: "Get skilled by top educators" }
  ];

  const categories = [
    { title: "Web Development" },
    { title: "Artificial Intelligence" },
    { title: "Data Science" },
    { title: "Cloud Computing" },
    { title: "Blockchain" },
    { title: "Cybersecurity" },
    { title: "Programming" },
    { title: "Cloudflare Category" },
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
  
  // State Variables
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [category, setCategory] = useState(""); 
  const [studentCategoryCourses, setStudentCategoryCourses] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [page, setPage] = useState(1); 
  const [totalCourses, setTotalCourses] = useState(0);
  const coursesPerPage = 4;
  const lastPage = Math.ceil(totalCourses / coursesPerPage);

  // Fetch courses based on category & page
  const FetchCoursesByCategory = useCallback(async (selectedCategory, pageNumber) => {
    setCoursesLoading(true);
    try {
      const fetchURL = selectedCategory 
        ? `/api/course/fetchcourses?category=${selectedCategory}&page=${pageNumber}`
        : `/api/course/fetchcourses?page=${pageNumber}`;

      const response = await fetch(`${APP_URI}${fetchURL}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      if (response.ok) {
        setCourses(data.msg);
        setTotalCourses(data.totalCourses);
      } else {
        setCourses([]);
      }
    } catch (error) {
      setCourses([]);
    } finally {
      setCoursesLoading(false);
    }
  }, []);

  // Fetch student category courses (ONLY ONCE when token is available)
  const fetchCourseStudentCategory = useCallback(async () => {
    if (!token) return; // Prevent unnecessary API calls
    try {
      const response = await fetch(`${APP_URI}/api/fetchcategorycourses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();
      if (response.ok) {
        setStudentCategoryCourses(data.msg);
      } else {
        setStudentCategoryCourses([]);
      }
    } catch (error) {
      setStudentCategoryCourses([]);
    }
  }, [token]);

  // Fetch courses when category or page changes
  useEffect(() => {
    FetchCoursesByCategory(category, page);
  }, [category, page, FetchCoursesByCategory]);

  // Fetch user courses (Only Once)
  useEffect(() => {
    if (User) {
      setStudentCourses(User.purchaseCourse || []);
    }
  }, [User]);

  // Fetch student category courses only once
  useEffect(() => {
    fetchCourseStudentCategory();
  }, [fetchCourseStudentCategory]);

  return (
    <>
      <Navbar />
      <Carousel carouselImages={carouselImages} />

      {studentCourses.length > 0 && (
        <>
          <center className="mt-4">
            <h2 style={{ color: "#2c3e50", fontFamily: "Poppins", backgroundColor: "#f0f8ff", width: "fit-content" }}>
              Purchased Courses
            </h2>
            <br />
          </center>
          <Card loading={false} courses={studentCourses} />
        </>
      )}

      <center className="mt-4">
        <h2 style={{ color: "#2c3e50", fontFamily: "Poppins", backgroundColor: "#f0f8ff", width: "fit-content" }}>
          Explore the trending courses
        </h2>
        <br />
      </center>

      <center className="categories">
        <Categories categories={categories} onCategoryClick={(newCategory) => {
          setCategory(newCategory);
          setPage(1); // Reset pagination when changing category
        }} />
      </center>

      <Card loading={coursesLoading} courses={courses} />

      {/* Pagination Controls */}
      <div className="flex-end-button">
        <button
          className="btn btn-primary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={page >= lastPage}
        >
          Next
        </button>
      </div>

      {studentCategoryCourses.length > 0 && (
        <>
          <center className="mt-4">
            <h2 style={{ color: "#2c3e50", fontFamily: "Poppins", backgroundColor: "#f0f8ff", width: "fit-content" }}>
              Courses that might interest you
            </h2>
            <br />
          </center>
          <Card loading={false} courses={studentCategoryCourses} />
        </>
      )}

      <div>
        {infoData.map((data, index) => (
          <PhotoPara key={index} imageUrl={data.img1} heading={data.heading} paragraph={data.paragraph} />
        ))}
      </div>
    </>
  );
}

export default Home;
