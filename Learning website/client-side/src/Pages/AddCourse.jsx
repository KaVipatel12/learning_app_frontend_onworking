import React, { useState } from 'react';
import ProviderNavbar from '../components/ProviderNavbar';
import { toast } from 'react-toastify';

const AddCourse = () => {
  const token = localStorage.getItem("token");
  const Backend_URL = "http://localhost:8000";

  // Single state object for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    level: '',
    language: '',
    courseImage: null,
  });

  // Handle input changes for text fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      courseImage: e.target.files[0], // Store the file itself
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
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
          level: '',
          language: '',
          courseImage: null,
        });
        toast.success(result.msg);
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in adding the course");
    }
  };

  return (
    <>
      <ProviderNavbar />
      <form className="m-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="level" className="form-label">Level</label>
            <input
              type="text"
              className="form-control"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="language" className="form-label">Language</label>
            <input
              type="text"
              className="form-control"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="courseImage" className="form-label">Course Image</label>
            <input
              type="file"
              className="form-control"
              id="courseImage"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  );
};

export default AddCourse;
