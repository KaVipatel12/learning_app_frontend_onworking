import React, { useState } from "react";
import "../App.css"; // Importing external CSS
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PillButton from "../components/PillButton";

function Categories() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const APP_URI = "http://localhost:8000"; 
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const toggleCategory = (categoryTitle) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(categoryTitle)
        ? prev.filter((item) => item !== categoryTitle)
        : [...prev, categoryTitle];

      // Limit to 3 selected categories
      if (updated.length > 3) {
        updated.shift(); // Remove the first item if there are more than 3
      }
      return updated;
    });
  };

  const handleSubmit = async () => {

    if(selectedCategories.length === 0){
        return toast.error("Please select atleast 1 category")
    }
     try{
        const response = await fetch(`${APP_URI}/api/category`, {
            method : "POST", 
            headers : {
            "Authorization" : `Bearer ${token}`, 
            "Content-Type" : "application/json"
        }, 
        body : JSON.stringify(selectedCategories)
    }); 
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                toast.success(data.msg)
                navigate("/home")
            } else {
                toast.error(data.msg)
            }
        }catch(error){
        console.log(error)
        toast.error("Error");
        }
  }
  return (
    <>
    <Navbar />
    <center className="mt-4">
      <h2 style={{ color: "#2c3e50", fontFamily: "Poopins", width: "fit-content" }}>
        Select your favourite Categories
      </h2>
    </center>
    <PillButton toggleCategory={toggleCategory} selectedCategories={selectedCategories} />
    <button className="btn btn-success" onClick={handleSubmit}> Submit </button>
    </>
  );
}

export default Categories;