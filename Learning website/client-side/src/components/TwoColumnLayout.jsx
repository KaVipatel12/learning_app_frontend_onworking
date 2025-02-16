import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { toast } from "react-toastify";
import ModalComponent from "./ModalComponent.jsx";
import { useAuth } from "../store/Auth.js";

function TwoColumnLayout({ course, token, handlePurchase, purchaseLoading, isModify }) {
  const APP_URI = "http://localhost:8000";
  const [ratings, setRatings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isCoursePurchased, setIsCoursePurchased] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const { cart, User } = useAuth(); 

  const navigate = useNavigate();
  const { courseId } = useParams();

  const handleClick = () => {
    if (token) {
      handlePurchase();
    } else {
      navigate("/login");
    }
  };

  const deleteCourse = async () => {
    setDeleteLoading(true);
    try {
      const response = await fetch(`${APP_URI}/api/educator/deletecourse/${courseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.ok) {
        toast.success("Course Deleted successfully");
        navigate(-1);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const fetchRating = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${APP_URI}/api/course/fetchallreviews/${courseId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        setRatings(data.msg);
      } else {
        setRatings(null);
      }
    } catch (error) {
      console.log(error);
      setRatings(null);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  const addToCart = async () => {
    setCartLoading(true);
    try {
      const response = await fetch(
        `${APP_URI}/api/cartfunctionality/${courseId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setIsCart((prev) => !prev);
        toast.success(data.msg);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error");
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    fetchRating();
  }, [fetchRating]);

  useEffect(() => {
    if (cart) {
      setIsCart(cart.some((item) => item._id === courseId));
    }
  }, [cart, courseId]);

  useEffect(() => {
    if (User) {
      setIsCoursePurchased(User.purchaseCourse.some((item) => item.courseId === courseId));
    }
  }, [User, courseId]);

  return (
    <>
      <div className="main-box">
        <div className="box-70">
          <div className="small-box" style={{ backgroundColor: "#e8f0fc", color: "#6188b0" }}>
            Top rated {course.category} Course
          </div>
          <div className="small-box">
            <h1 style={{ color: "#101828" }}>{course.title}</h1>
          </div>
          <div className="small-box" style={{ color: "#949ba5" }}>
            <p>{course.description}</p>
          </div>
          <div className="button-box">
            <Link to={`/chapters/${course._id}`}>
              <button className="btn box-button btn-1" style={{ backgroundColor: "#196ae5" }}>
                Explore
              </button>
            </Link>
            {isModify ? (
              <>
                <Link to={`/educator/mycourse/updatecourseinfo/${course._id}`} style={{ textDecoration: "none", outline: "none", boxShadow: "none" }}>
                  <button className="btn box-button btn-2" style={{ border: "2px solid #196ae5" }}>
                    Update
                  </button>
                </Link>
                <ModalComponent func={deleteCourse} alert="Delete" alertTitle="Delete course" alertMessage="By clicking, It will delete all the resources of course permanently." buttonStyle="danger" confirm="Delete" titleColor="red" loading={deleteLoading} />
              </>
            ) : !isCoursePurchased && !purchaseLoading ? (
              <>
                <button className="btn box-button btn-2" onClick={handleClick}>
                  Apply
                </button>
                {
                  cartLoading ?
                  (<button class="btn btn-`success` : `danger`} box-button" type="button" disabled>
                    <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                    <span class="visually-hidden" role="status">Loading...</span>
                  </button>) :
                  (<button className={`btn btn-2 box-button`} style={{backgroundColor: isCart ? `red` : `green`, color: "white"}} onClick={addToCart}>
                  {isCart ? "Remove Cart" : "Add Cart"}
                </button>)
                }
              </>
            ) : null}
          </div>
          <div className="small-box">
            <div className="info-container">
              <div className="info-item">
                <h4>{loading ? <Loading /> : ratings ? `${ratings} ⭐` : "No ratings available"}</h4>
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

      <div className="contact-info my-3" style={{ width: "100vw", height: "fit-content", backgroundColor: "#fff5e5" }}>
        For more info contact us: <Link to={`tel:${course.mobilenumber || "1234567890"}`} style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>{course.mobilenumber || "1234567890"}</Link>
      </div>
    </>
  );
}

export default TwoColumnLayout;
