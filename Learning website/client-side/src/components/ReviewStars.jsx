import React, { useCallback, useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from './Loading';

function ReviewStars() {
    const APP_URI = "http://localhost:8000";
    const { courseId } = useParams();
    const token = localStorage.getItem("token");
    const [stars, setStars] = useState(0); // Default value set to 0 (numeric)
    const [starLoading , setStarLoading] = useState(false)

    const fetchRating = useCallback(async () => {
        try {
            const response = await fetch(
                `${APP_URI}/api/fetchreview/${courseId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();
            if (response.ok) {
                setStarLoading(true)
                setStars(data.userReview?.stars || 0); // API response ke stars set karo
            } else {
                setStarLoading(true)
                setStars(0); // Default to 0 if no review
            }
        } catch (error) {
            setStarLoading(true)
            console.error("Error fetching rating:", error);
            setStars(0); // Error ke case mein 0 set karo
        }
    }, [token , courseId])

    const ratingChanged = async (newRating) => {
        setStars(newRating); // UI ko optimistically update karo
        try {
            const response = await fetch(
                `${APP_URI}/api/addreview/${courseId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ stars: newRating }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                toast.success(data.msg);
            } else {
                toast.error("Failed to update review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Error submitting review");
        }
    }

    useEffect(() => {
        fetchRating(); // Component mount hone par fetchRating ko call karo
    }); // Dependency ke andar sirf courseId rakho

    return (
        <div style={{marginTop : "30px"}}>
            <center>
               { stars === 0 ? (<h5 style={{ color : "#6b4848", fontWeight:"bold"}}>Rate our course</h5> ) : (<h5 style={{ color : "#6b4848", fontWeight:"bold"}}> Your Review </h5>) }
            </center>

            {
               starLoading ? (
                <ReactStars
                count={5}
                onChange={ratingChanged}
                value={stars} // API se aaye stars ko bind karo
                size={50}
                activeColor="#ffd700"
                />
               ) : (<Loading />)
            }
        </div>
    );
}

export default ReviewStars;
