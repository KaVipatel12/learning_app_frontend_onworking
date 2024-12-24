import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function TwoColumnLayout({course, token, handlePurchase}) {
    const APP_URI = "http://localhost:8000"
    const navigate = useNavigate()
    const handleClick = () => {
        if (token) {
          handlePurchase();
        } else {
          navigate("/login");
        }
      };
  return (
<>
<div className="main-box">
  <div className="box-70">
    <div className="small-box" style={{backgroundColor : "#e8f0fc" , color: "#6188b0"}}> Top rated {course.category} Course</div>
    <div className="small-box"> <h1 style={{color : "#101828"}}> { course.title}</h1> </div>
    <div className="small-box" style={{color : "#949ba5"}}> <p> {course.description} </p> </div>
    <div className="button-box">
    <Link to={`/chapters/${course._id}`} className="small-box"> <button className='btn box-button btn-1' style={{backgroundColor : "#196ae5"}}> Explore </button> </Link> <button className ="btn box-button btn-2" style={{border : "2px solid #196ae5"}} onClick={handleClick}> Apply</button>
    </div>
    <div className="small-box"><div class="info-container">
  <div class="info-item">
    <h4> {course.rate} <span>⭐</span></h4>
    <p>9245 Ratings</p>
  </div>
  <div class="info-item">
    <h4>{course.duration} Months</h4>
    <p>Program Duration</p>
  </div>
  <div class="info-item">
    <h4>Hands-On</h4>
    <p>Real-world case studies</p>
  </div>
  <div class="info-item">
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

<div className="contact-info my-3" style={{width : "100vw", height : "fit-content" , backgroundColor : "#fff5e5"}}> For more info contact us :     <Link
      to={` tel:${ course.mobilenumber || " 1234567890"}`} // Open dialer on click
      style={{
        color: "black", // Dark black color
        textDecoration: "none", // Remove underline
        fontWeight: "bold", // Optional for emphasis
      }}
    >
      {course.mobilenumber || "1234567890"}
    </Link></div>
</>    
  )
}

export default TwoColumnLayout
