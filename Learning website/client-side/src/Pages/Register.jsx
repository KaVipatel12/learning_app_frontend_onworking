import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/Auth";
import Navbar from "../components/Navbar";

function Register() {
  const beckend_api_url = "http://localhost:8000";
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [mobile, setMobile] = useState(""); // State for mobile
  const [role, setRole] = useState(""); // State for role selection
  const [loading, setLoading] = useState(false);
  const { storeTokenLocalStorage } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, email, password, mobile, role };
    setLoading(true);

    // Validate that all fields are filled
    if (!role) {
      toast.error("Please select a role!");
      return;
    }
    try {
      const response = await fetch(`${beckend_api_url}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        const token = data.token;
        storeTokenLocalStorage(token);
        toast.success("Registration Successful");
        if(role === "provider"){
        navigate("/educator/profile");
        }
      } else {
        setLoading(false);
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("There is some error in the server please try again later");
    }
  };

  return (
    <>
      <Navbar />
      <form className="auth-body" onSubmit={handleSubmit}>
        <div className="wrapper">
          <h2>Registration</h2>

          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ height: "40px" }}
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ height: "40px" }}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ height: "40px" }}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              style={{ height: "40px" }}
            />
          </div>

          {/* Role Selection */}
          <div style={{ margin: "20px 0" }}>
            <h4>Select Your Role:</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "10px",
              }}
            >
              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value="student"
                  onChange={(e) => setRole(e.target.value)}
                  checked={role === "student"}
                  style={{ marginRight: "10px" }}
                />
                Student
              </label>
              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value="provider"
                  onChange={(e) => setRole(e.target.value)}
                  checked={role === "provider"}
                  style={{ marginRight: "10px" }}
                />
                Educator
              </label>
            </div>
          </div>
          
          { loading ? (
          <button class="btn btn-primary input-box button" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Loading...</span>
            </button>
          ) : (
          <div className="input-box button">
            <input type="submit" value="Register Now" />
          </div>
          )}
          <div className="text">
            <h3>
              Already have an account? <Link to="/login">Login here</Link>
            </h3>
          </div>
        </div>
      </form>
    </>
  );
}

export default Register;
