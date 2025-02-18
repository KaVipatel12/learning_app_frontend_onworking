import React from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

function Card({ loading = false, courses, borderRadius = "10px", backgroundColor = "white", isCart = false, functions}) {
  const APP_URI = "http://localhost:8000";

  if (loading) {
    return <Loading />; // Load spinner till the data is fetched
  }

  return (
    <>
      <div className="container search-container-card">
        {courses?.length > 0 ? (
          courses.map((course) => (            
            <Link
              to={!course.courseId ? (`/course/${course._id}`) : (`/course/${course.courseId}`)}
              key={course._id}
              className="card m-2"
              style={{ width: "18rem", textDecoration: "none" }}
            >
              <div
                className="card-body"
                style={{
                  transition: "transform 0.2s",
                  cursor: "pointer",
                  backgroundColor, 
                  borderRadius,
                }}
              >
                {course.courseImage && (
                  <img
                    src={`${APP_URI}${course.courseImage}`}
                    className="card-img-top"
                    alt={course.title || ""}
                    style={{ borderRadius }}
                  />
                )}
                <h5 className="card-title mt-2" style={{color : "#2c3e50"}}>{course.title || ""}</h5>
                <p className="card-text" style={{color : "#27ae60"}}>{course.price || ""} </p>
 
                  <p                 
                    style={{
                      backgroundColor: " #007bff",
                      width: "fit-content",
                      borderRadius: "30px",
                      fontSize: "11px",
                      color: "white",
                      padding: "3px",
                    }}
                    >
                    {course.category || ""}
                  </p>
                  {                    
                    course.purchaseDate &&
                  <p                 
                    style={{
                      fontSize: "11px",
                      color: "black",
                      padding: "3px",
                    }}
                    >
                    Enrolled on : { new Date(course.purchaseDate).toLocaleDateString() || ""}
                  </p>
                  }

                    {isCart && (
                      <div className="cart-items" onClick={(e) => { 
                        e.preventDefault(); 
                        functions(course._id);
                      }}>
                        <i className="ri-delete-bin-5-line"></i>
                      </div>
                    )}

              </div>
              <style jsx>{`
                .card {
                  border: 1px solid #dee2e6; /* Default Bootstrap border (light gray) */
                  transition: all 0.3s ease; /* Smooth transition */
                }

                .card:hover {
                  transform: scale(1.05); /* Slight scale effect */
                }
                .card:hover {
                  transform: scale(1.05); /* Slight scale effect */
                }
              `}</style>
            </Link>
          ))
        ) : isCart ? (
          <div className="cart-empty w-100 d-flex justify-content-center my-4 h-100">
                          <div className="container justify-content-center">
                            <div className="card w-100">
                              <div className="card-body">
                                <h5 style={{style : "darkBlue"}}> Cart is empty</h5>
                              </div>
                            </div>
                          </div>
          
          </div>
        ) : 
         (
          <p>Couldn't load the courses, Poor Internet connection</p>
        )}
      </div>
    </>
  );
}

export default Card;
