import React, { useState, useEffect } from 'react';
import ProviderNavbar from '../components/ProviderNavbar';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import PillButton from '../components/PillButton'; 

const AddCourse = () => {
  const token = localStorage.getItem("token");
  const Backend_URL = "http://localhost:8000";
  const [selectedCategories, setSelectedCategories] = useState("");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    level: 'Easy',
    language: '',
    courseImage: null,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      category: selectedCategories,
    }));
  }, [selectedCategories]);

  const toggleCategory = (categoryTitle) => {
    setSelectedCategories(categoryTitle);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLevelChange = (e) => {
    setFormData({
      ...formData,
      level: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      courseImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", selectedCategories);
    data.append("price", formData.price);
    data.append("duration", formData.duration);
    data.append("level", formData.level);
    data.append("language", formData.language);
    data.append("courseImage", formData.courseImage);

    try {
      const response = await fetch(`${Backend_URL}/api/educator/addcourse`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          category: '',
          price: '',
          duration: '',
          level: 'Easy',
          language: '',
          courseImage: null,
        });
        setSelectedCategories("");
        toast.success(result.msg);
        navigate(`educator/mycourse/addchapter/${result.courseId}`)
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in adding the course");
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <ProviderNavbar />
      <form className="m-4">
        <div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category :</label>
            <input type="text" className="form-control" id="category" name="category" value={selectedCategories} readOnly />
            <PillButton toggleCategory={toggleCategory} selectedCategories={selectedCategories} />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration (keep the duration in hours)</label>
            <input type="text" className="form-control" id="duration" name="duration" value={formData.duration} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Level</label>
            <select className="form-select" name="level" value={formData.level} onChange={handleLevelChange}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="language" className="form-label">Language</label>
            <input type="text" className="form-control" id="language" name="language" value={formData.language} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="courseImage" className="form-label">Course Image</label>
            <input type="file" className="form-control" id="courseImage" onChange={handleFileChange} />
          </div>
          {!loading ?
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button> :
            <button className="btn btn-primary input-box button" type="button" disabled>
              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status">Loading...</span>
            </button>
          }
        </div>
      </form>
    </>
  );
};

export default AddCourse;