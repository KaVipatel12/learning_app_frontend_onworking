import React, { useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProviderNavbar from '../components/ProviderNavbar';

function UpdateCourse() {
  const APP_URI = "http://localhost:8000";
  const { courseId } = useParams();
  const token = localStorage.getItem("token");
  const [isContentLoad, setContent] = useState(false);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  
  useEffect(() => {
    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${APP_URI}/api/course/fetchcoursemainpage/${courseId}`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setContent(true);
          const { title, description, category, price, duration, level, language } = data.msg;
          setTitle(title || "");
          setDescription(description || "");
          setCategory(category || "");
          setPrice(price || "");
          setDuration(duration || "");
          setLevel(level || "");
          setLanguage(language || "");
        } else {
          setContent(false);
          console.log(data.error)
          toast.warning(data.msg);
        }
      } catch (error) {
        setContent(false);
        toast.error("Failed to fetch course details. Please try again later.");
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourse();
  }, [courseId, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      title,
      description,
      category,
      price,
      duration,
      level,
      language,
    };

    try {
      const response = await fetch(`${APP_URI}/api/educator/updatecourse/${courseId}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg);
        navigate(-1);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Error in updating the course");
      console.error(error);
    }
  };


  return (
    <>
    <ProviderNavbar></ProviderNavbar>
 { isContentLoad ? (
    <form className="m-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <div class="form-floating">
            <textarea className="form-control" placeholder="Write description here" id="floatingTextarea2" style= {{height : "100px"}} value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="level" className="form-label">Level</label>
            <input
              type="text"
              className="form-control"
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="language" className="form-label">Language</label>
            <input
              type="text"
              className="form-control"
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
 ): (
     <div>
         Page not loading
     </div>
 )
}
</>
  )
}

export default UpdateCourse
