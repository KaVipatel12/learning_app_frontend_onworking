import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PhotoPara from '../components/PhotoPara';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';

function Home() {
  const APP_URI = "http://localhost:8000";

  // Array of images used on the home page upper side. 
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

  // Array of objects
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
    {     // filter the courses by categories
    title : "Programming", 
    urlLink : "course/programmin"
  }, 
    {     
    title : "Data science", 
    urlLink : "course/programmin"
  }, 
    {
    title : "Machine Learning", 
    urlLink : "course/programmin"
  }, 
    {
    title : "Chatgpt", 
    urlLink : "course/programmin"
  }, 
 
    {
    title : "MBA", 
    urlLink : "course/programmin"
  }, 
    {
    title : "MBA", 
    urlLink : "course/programmin"
  }, 
 
]
  // State to hold the fetched courses
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true)
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
      console.log("Course data");
      console.log(data);
      if (response.ok) {
        setLoading(false)
        setCourses(data.msg); // Assuming `data.data` contains the array of courses
      } else {
        setLoading(false)
        setCourses([]);
      }
    } catch (error) {
      setLoading(false)
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
      <Carousel carouselImages={carouselImages}/>
      <center className='mt-4'>
        <h2 style={{color : "navy" , fontFamily : "Poopins"}}>Explore the trending courses</h2> 
        <br />
        </center>
        <div className="categories">
        <Categories category={categories}/>
        </div>
        <Card loading={loading} courses={courses} />
        <div>
          {/* Static infoData mapping */}
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
