import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../store/Auth"; // Custom Auth hook
import {useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "../Profile.css";
import Loading from "../components/Loading.jsx";
import Card from "../components/Card.jsx"; // Import the Card component

function ProviderProfile() {

    const APP_URI = "http://localhost:8000"; 
    const token = localStorage.getItem("token")
    const { Provider, loading } = useAuth(); // Access user data from context or state
    const [email, setEmail] = useState("NA");
    const [username, setUsername] = useState("NA");
    const [mobile, setMobile] = useState("NA");
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate(); 
    
  useEffect(() => {
    if (loading) return; 
    if (Provider) {
        setUsername(Provider.username);
        setEmail(Provider.email);
        setMobile(Provider.mobile);
        console.log("This is the info of provider: " + JSON.stringify(Provider));
    } else {
         navigate(-1); 
    }
}, [Provider, loading, navigate])

  useEffect(() => {
    document.title = `WowLearning - Educator Profile`;
  }, []);

  const FetchCourses = useCallback(async () => {
    try {
        const response = await fetch(`${APP_URI}/api/educator/fetchcourses`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log("Fetched data from API:", data); // Debugging log

        if (response.ok && Array.isArray(data.courses)) {
            setCourses(data.courses);
        } else {
            console.error("Error fetching courses:", data.msg);
            setCourses([]);
        }
    } catch (error) {
        console.error("FetchCourses error:", error);
        setCourses([]);
    }
}, [APP_URI, token]);



    useEffect(() => {
        FetchCourses(); 
    }, [FetchCourses])

  if (loading) {
    // Display a loading spinner or message while loading
    return (
      <>
        <Navbar />
        <center>
          <Loading />
        </center>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-main" style={{ width: "100%", overflow: "auto" }}>
        <div className="row">
          <div className="flex-box-profile">
            {/* Profile Picture and Login/Register */}
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-0">
                <img
                  className="mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  style={{ borderRadius: "20%" }}
                  alt="profile pic"
                />
                <h2
                  className="font-weight-bold my-3"
                  style={{
                    color: "black",
                    fontWeight: "bold"
                  }}
                >
                  {username}
                </h2>
              </div>
            </div>

            {/* Profile Details */}
            <div className="col-md-5 border-right">
              <div className="p-3 py-3">
                <h4 className="text-center" style={{ color: "white" }}>
                  Profile
                </h4>
                <div className="row mt-2" style={{ color: "black" }}>
                  <div className="col-md-6">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      disabled
                    />
                  </div>
                  <div className="col-md-12 my-2">
                    <label className="labels">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      disabled
                    />
                  </div>
                  <div className="col-md-12 my-2">
                    <label className="labels">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={mobile}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Purchased Courses Section */}
                <h5
                  className="event-title text-center"
                  style={{ color: "#101828", fontWeight: "bold" }}
                >
                  My Courses
                </h5>
                {courses.length > 0 ? (
                    <center>
                        <Card courses={courses}/>
                    </center>
                ) : (null)}
              </div>
            </div>
    </>
  );
}

export default ProviderProfile;
