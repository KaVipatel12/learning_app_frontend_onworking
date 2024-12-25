import React, { useEffect, useState } from "react";
import "../SearchCoursesPage.css";
import Card from "../components/Card";
import Categories from "../components/Categories";

const ExploreCourses = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [courseName, setCourseName] = useState(""); // State for course name input
  const APP_URI = `http://localhost:8000`;

  const money = [
    { title: 1000 },
    { title: 10000 },
    { title: 50000 },
    { title: 100000 }
  ];

  const toggleFilterBar = () => {
    setFilterVisible(!isFilterVisible);
  };

  // Fetch courses based on filters
  const fetchCourses = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams();

    if (courseName) queryParams.append("courseName", courseName);
    if (price) queryParams.append("price", price);

    const fetchURL = `/api/course/fetchcourses?${queryParams.toString()}`;
    console.log(fetchURL)
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
  };

  // Trigger fetching courses when `courseName` or `price` changes
  useEffect(() => {
    fetchCourses();
  }, [courseName, price]);

  return (
    <div className="search-courses-page">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by course name..."
          onChange={(e) => setCourseName(e.target.value)}
          value={courseName}
        />
        <button onClick={fetchCourses}>Search</button>
      </div>

      <div className="flex-search-container">
        {/* Toggle Button for Mobile */}
        <button className="toggle-filter" onClick={toggleFilterBar}>
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filter Bar */}
        <div className={`filter-bar ${isFilterVisible ? "active" : ""}`}>
         <h3>Filters</h3>          
        <label>courseName</label>
        <select>
          <option>All</option>
          <option>Technology</option>
          <option>Design</option>
        </select>
          <label>Price</label>
          <Categories categories={money} onCategoryClick={(price) => setPrice(price)} />
        </div>

        {/* Main Section */}
        <div className="main-section">
          <Card loading={loading} courses={courses} />
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;

