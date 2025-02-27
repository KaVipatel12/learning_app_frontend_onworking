import React, { useState, useRef } from "react";

function Categories({ categories, onCategoryClick }) {
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the selected category
  const scrollContainerRef = useRef(null); // Ref for the scrollable container

  const handleCategoryClick = (categoryTitle) => {
    setSelectedCategory(categoryTitle); // Set the selected category
    onCategoryClick(categoryTitle); // Call the onCategoryClick function passed from parent
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth; // Scroll distance equals visible width
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
      {/* Left arrow button */}
      <button
        onClick={() => handleScroll("left")}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "none",
          borderRadius: "50%",
          color: "white",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        &#8249;
      </button>

      {/* Scrollable container for categories */}
      <div
        ref={scrollContainerRef}
        className="categories-container"
        style={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
          scrollBehavior: "smooth",
          padding: "10px 0",
        }}
      >
        {categories?.map((category, index) => (
          <button
            key={index}
            className={`category-button ${selectedCategory === category.title ? 'active' : ''}`} // Add 'active' class if it's the selected one
            onClick={() => handleCategoryClick(category.title)} // Trigger category change
            style={{
              padding: "10px 20px",
              backgroundColor: selectedCategory === category.title ? "white" : "#007bff", // White background for active, blue for inactive
              color: selectedCategory === category.title ? "black" : "white", // Black text for active, white for inactive
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Right arrow button */}
      <button
        onClick={() => handleScroll("right")}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "none",
          borderRadius: "50%",
          color: "white",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        &#8250;
      </button>
    </div>
  );
}

export default Categories;
