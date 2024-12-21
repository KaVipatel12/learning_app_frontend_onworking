import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProviderNavbar from '../components/ProviderNavbar';
import { toast } from 'react-toastify';

function AddChapter() {
    const token = localStorage.getItem("token");
    const { courseId } = useParams();
    const Backend_URL = "http://localhost:8000";

    const [chapters, setChapters] = useState([{ title: '', description: '', videoUrl: ""}]);
    const [submitting, setSubmit] = useState("")
    // Handle input changes
    const handleInputChange = (index, field, value) => {
        const newChapters = [...chapters];
        newChapters[index][field] = value;
        setChapters(newChapters);
    };

    // Add new chapter field
    const addChapter = () => {
        setChapters([...chapters, { title: '', description: '', videoUrl: '' }]);
    };

    // Remove chapter field
    const removeChapter = (index) => {
        const newChapters = chapters.filter((_, i) => i !== index);
        setChapters(newChapters);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setSubmit("Submitting")
        const formData = new FormData();
        formData.append('chapters', JSON.stringify(chapters.map(({ title, description, videoUrl }) => ({ title, description, videoUrl }))));
        try {
            const response = await fetch(`${Backend_URL}/api/educator/addchapters/${courseId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setSubmit("Submitted")
                toast.success(data.msg);
                setChapters([{ title: '', description: '', videoUrl: '' }]); // Reset the form
              } else {
              setSubmit("Not Submitted")
              toast.error(data.msg);
            }
          } catch (error) {
          setSubmit("Not Submitted")
            toast.error("Error in adding chapters");
            console.error(error);
        }
    };

    return (
        <>
            <ProviderNavbar />
            <form className="m-4" onSubmit={handleSubmit}>
              <p> { submitting} </p>
                {chapters.map((chapter, index) => (
                    <div key={index} className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={chapter.title}
                            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                        />
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            value={chapter.description}
                            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                        />
                        <label className="form-label">Video url</label>
                        <input
                            type="text"
                            className="form-control"
                            value={chapter.videoUrl}
                            onChange={(e) => handleInputChange(index, 'videoUrl', e.target.value)}
                        />
                        <button type="button" className="btn btn-danger mt-2" onClick={() => removeChapter(index)}>Remove Chapter</button>
                    </div>
                ))}
                <button type="button" className="btn btn-secondary mb-3" onClick={addChapter}>Add Another Chapter</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default AddChapter;
