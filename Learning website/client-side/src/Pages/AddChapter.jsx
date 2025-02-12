import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProviderNavbar from '../components/ProviderNavbar';
import { toast } from 'react-toastify';
import "../App.css"
import Loading from '../components/Loading';

function AddChapter() {
    const token = localStorage.getItem("token");
    const { courseId } = useParams();
    const Backend_URL = "http://localhost:8000";

    const [chapters, setChapters] = useState([{ title: '', description: '', videoUrl: "" }]);
    const [loading, setLoading] = useState(false);

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

        setLoading(true);

        for (const chapter of chapters) {
            if (!chapter.title.trim() || !chapter.description.trim() || !chapter.videoUrl.trim()) {
                toast.error("All fields (Title, Description, and Video URL) are required!");
                setLoading(false)
                return; // Stop submission
            }
        }

        const payload = {
            chapters: chapters.map(({ title, description, videoUrl }) => ({ title, description, videoUrl }))
        };

        try {
            const response = await fetch(`${Backend_URL}/api/educator/addchapters/${courseId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.msg);
                setChapters([{ title: '', description: '', videoUrl: '' }]); // Reset form
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            toast.error("Error in adding chapters");
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <ProviderNavbar />
            {loading && <Loading/>}
            <form className="m-4" onSubmit={handleSubmit}>
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
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                placeholder="Write description here"
                                id="floatingTextarea2"
                                style={{ height: "100px" }}
                                value={chapter.description}
                                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                            ></textarea>
                        </div>

                        <label className="form-label">Video URL</label>
                        <input
                            type="text"
                            className="form-control"
                            value={chapter.videoUrl}
                            onChange={(e) => handleInputChange(index, 'videoUrl', e.target.value)}
                        />

                        <button type="button" className="btn btn-danger mt-2" onClick={() => removeChapter(index)}>Remove Chapter</button>
                    </div>
                ))}

                <div className="flex-button">
                    <button type="button" className="btn btn-secondary mb-3" onClick={addChapter}>Add Another Chapter</button>
                    {!Loading ?
                     (<button classname="btn btn-primary" type="button" disabled>
                        <span classname="spinner-grow spinner-grow-sm" aria-hidden="true" />
                        <span role="status">Submitting</span>
                        </button>
                    ) :
                    (<button type="submit" className="btn btn-primary">Submit</button>)}
                </div>
            </form>
        </>
    );
}

export default AddChapter;
