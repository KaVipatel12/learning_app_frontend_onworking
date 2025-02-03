import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";

function TwoColumnLayout({ course, token, handlePurchase, purchaseLoading }) {
  const APP_URI = "http://localhost:8000";
  const [ratings, setRatings] = useState(null); // Null indicates no fetch attempt yet
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const handleClick = () => {
    if (token) {
      handlePurchase();
    } else {
      navigate("/login");
    }
  };

  const fetchRating = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${APP_URI}/api/course/fetchallreviews/${courseId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setRatings(data.msg); // Assuming `msg` contains the ratings
      } else {
        setRatings(null); // No ratings available
      }
    } catch (error) {
      console.log(error);
      setRatings(null); // Handle fetch failure
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRating();
  }, [courseId]);

  return (
    <>
      <div className="main-box">
        <div className="box-70">
          <div
            className="small-box"
            style={{ backgroundColor: "#e8f0fc", color: "#6188b0" }}
          >
            Top rated {course.category} Course
          </div>
          <div className="small-box">
            <h1 style={{ color: "#101828" }}>{course.title}</h1>
          </div>
          <div className="small-box" style={{ color: "#949ba5" }}>
            <p>{course.description}</p>
          </div>
          <div className="button-box">
            <Link to={`/chapters/${course._id}`} className="small-box">
              <button
                className="btn box-button btn-1"
                style={{ backgroundColor: "#196ae5" }}
              >
                Explore
              </button>
            </Link>
            {!purchaseLoading ? (
              <button
                className="btn box-button btn-2"
                style={{ border: "2px solid #196ae5" }}
                onClick={handleClick}
              >
                Apply
              </button>
            ) : (
              <button class="btn btn-warning box-button" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden" role="status">
                  Loading...
                </span>
              </button>
            )}
          </div>
          <div className="small-box">
            <div className="info-container">
              <div className="info-item">
                <h4>
                  {loading ? (
                    <Loading></Loading>
                  ) : ratings ? (
                    `${ratings} ⭐`
                  ) : (
                    "No ratings available"
                  )}
                </h4>
                <p>Ratings</p>
              </div>
              <div className="info-item">
                <h4>{course.duration} Months</h4>
                <p>Program Duration</p>
              </div>
              <div className="info-item">
                <h4>Hands-On</h4>
                <p>Real-world case studies</p>
              </div>
              <div className="info-item">
                <h4>Live Mentorship</h4>
                <p>From industry professionals</p>
              </div>
            </div>
          </div>
        </div>
        <div className="box-30">
          <img src={`${APP_URI}${course.courseImage}`} alt="Sample" />
        </div>
      </div>

      <div
        className="contact-info my-3"
        style={{
          width: "100vw",
          height: "fit-content",
          backgroundColor: "#fff5e5",
        }}
      >
        For more info contact us:{" "}
        <Link
          to={`tel:${course.mobilenumber || "1234567890"}`}
          style={{
            color: "black",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          {course.mobilenumber || "1234567890"}
        </Link>
      </div>
    </>
  );
}

export default TwoColumnLayout;
