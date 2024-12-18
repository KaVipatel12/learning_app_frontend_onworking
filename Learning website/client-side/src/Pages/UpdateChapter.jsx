import React, { useEffect, useState } from 'react'
import ProviderNavbar from '../components/ProviderNavbar'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateChapter() {
    const APP_URI = "http://localhost:8000";
    const { chapterId } = useParams();
    const token = localStorage.getItem("token");
    const [isContentLoad, setContent] = useState(false);
    const navigate = useNavigate();
  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [courseId, setCourseId] = useState("");
  
    useEffect(() => {
      if (!token) {
        toast.error("You are not authenticated. Please log in.");
        navigate("/login");
        return;
      }
  
      const FetchChapter = async () => {
        try {
          const response = await fetch(
            `${APP_URI}/api/educator/fetchchaptermainpage/${chapterId}`,
            {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
  
          const data = await response.json();
          if (response.ok) {
            setContent(true);
            const { title, description, duration, courseId} = data.msg;
            setTitle(title || "");
            setDescription(description || "");
            setDuration(duration || "");
            setCourseId(courseId || "")
          } else {
            setContent(false);
            toast.warning(data.msg);
            navigate("/dashboard");
          }
        } catch (error) {
          setContent(false);
          toast.error("Failed to fetch course details. Please try again later.");
          console.error("Error fetching course data:", error);
        }
      };
  
      FetchChapter();
    }, [chapterId, navigate, token]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const chapterData = {
        title,
        description,
        duration
      };
  
      try {
        const response = await fetch(`${APP_URI}/api/educator/updatechapter/${courseId}/${chapterId}`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(chapterData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          toast.success(data.msg);
          navigate("/dashboard");
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
      <ProviderNavbar />
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
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default UpdateChapter
