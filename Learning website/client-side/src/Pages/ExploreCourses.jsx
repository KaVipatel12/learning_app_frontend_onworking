import React, { useCallback, useEffect, useState } from "react";
import "../SearchCoursesPage.css";
import Card from "../components/Card";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";

const ExploreCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(null);
  const [courseName, setCourseName] = useState(""); // This is from the main search bar
  const [category, setCategory] = useState(null);
  const [showFilter, setShowFilter] = useState(false)
  const APP_URI = `http://localhost:8000`;

  const categories = [
    { title: "All courses" },
    { title: "Web Development" },
    { title: "Artificial Intelligence" },
    { title: "Data Science" },
    { title: "Cloud Computing" },
    { title: "Blockchain" },
    { title: "Cybersecurity" },
    { title: "Programming" },
    { title: "Cloudflare Category" }
  ];

  const money = [
    { title: "No limits" },
    { title: 1000 },
    { title: 10000 },
    { title: 50000 },
    { title: 100000 }
  ];

  // Fetch courses based on filters
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const queryParams = new URLSearchParams();

    queryParams.append("page", 1);
    queryParams.append("limit", 4);
    if (courseName) queryParams.append("courseName", courseName);
    if (price !== null) queryParams.append("price", price);
    if (category !== null) queryParams.append("category", category);

    const fetchURL = `/api/course/fetchcourses?${queryParams.toString()}`;
    console.log(fetchURL);

    try {
      const response = await fetch(`${APP_URI}${fetchURL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCourses(data.msg);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [APP_URI, courseName, price, category]);

  // Debounced API call (waits 1 second before making the request)
  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      setLoading(false);
      fetchCourses();
    }, 1000);
    
    return () => clearTimeout(delayDebounceFn);
  }, [courseName, price, category, fetchCourses]);

  return (
    <>
      <Navbar />
      <div className="search-courses-page" style={{color: "#2c3e50"}}>
        <button className="btn btn-primary" style={{width : "fit-content"}} onClick={() => setShowFilter(prev => !prev)}> {showFilter ? "Hide Filter" : "Show Filter"} </button>
        <div className={`sidebar ${!showFilter && "close"}`}>
          <h3>Filters</h3>

          {/* Category (Now using Categories Component) */}
          <label>Category</label>
          <Categories
            categories={categories}
            onCategoryClick={(selectedCategory) =>
              setCategory(selectedCategory === "All courses" ? null : selectedCategory)
            }
          />

          {/* Price */}
          <label>Price</label>
          <Categories
            categories={money}
            onCategoryClick={(selectedPrice) =>
              setPrice(selectedPrice === "No limits" ? null : selectedPrice)
            }
          />
        </div>

        {/* Main Content */}
        <div className="main-section">
          {/* Main Search Bar (For courseName) */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by course name..."
              onChange={(e) => setCourseName(e.target.value)}
              value={courseName}
            />
          </div>
          <Card loading={loading} courses={courses} verticleContainer={true}/>
        </div>
      </div>
    </>
  );
};

export default ExploreCourses;
