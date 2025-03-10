import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth"; // Custom Auth hook
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "../Profile.css";
import Loading from "../components/Loading.jsx";
import Card from "../components/Card.jsx"; // Import the Card component

function UserProfile() {
  const { User, loading } = useAuth(); // Access user data from context or state
  const [email, setEmail] = useState("NA");
  const [username, setUsername] = useState("NA");
  const [mobile, setMobile] = useState("NA");
  const [loggedin, setLoggedin] = useState(false);
  const [purchasedCourse, setPurchasedCourse] = useState([]);

  useEffect(() => {
    if (User) {
      setEmail(User.email);
      setUsername(User.username);
      setMobile(User.mobile);
      setLoggedin(true);
      setPurchasedCourse(User.purchaseCourse || []);
    }
  }, [User]);

  useEffect(() => {
    document.title = `WowLearning - Profile`;
  }, []);

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
                  {loggedin ? username : "Unknown"}
                </h2>
                <div>
                  {!loggedin && (
                    <>
                      <Link to="/register" className="mx-2">
                        <button type="button" className="btn btn-warning my-2">
                          Register
                        </button>
                      </Link>
                      <Link to="/login">
                        <button type="button" className="btn btn-primary my-2">
                          Login
                        </button>
                      </Link>
                    </>
                  )}
                </div>
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
                  Enrolled Courses
                </h5>
                {purchasedCourse.length > 0 ? (
                  <center>                    
                    <Card courses={purchasedCourse}/>
                  </center>
                ) : null}
              </div>
            </div>
    </>
  );
}

export default UserProfile;
