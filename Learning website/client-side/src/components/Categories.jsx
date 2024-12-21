import React, { useRef } from "react";
import { Link } from "react-router-dom";

function Categories({ category }) {
  const scrollContainerRef = useRef(null);

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
      {/* Left arrow */}
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

      {/* Scrollable container */}
      <div
        className="card-category"
        ref={scrollContainerRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          padding: "10px 0",
          gap: "1rem",
        }}
      >
        {category?.length > 0 &&
          category.map((category) => (
            <Link
              to={`/category/${category._id}`}
              key={category._id}
              className="card"
              style={{
                minWidth: "200px",
                textDecoration: "none",
                borderRadius: "30px",
              }}
            >
              <div
                className="card-body p-0"
                style={{
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
              >
                <h5
                  className="card-title mt-2"
                  style={{ color: "#424242", textAlign: "center" }}
                >
                  {category.title || ""}
                </h5>
              </div>
              <style jsx>{`
                .card {
                  border: 1px solid #dee2e6;
                  transition: all 0.3s ease;
                  background-color: #e3f2fd;
                }

                .card:hover {
                  transform: scale(1.05);
                  background-color: rgb(164, 202, 236);
                  color : "black"
                }

                .card-category::-webkit-scrollbar {
                  display: none;
                }
                .card-category {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
            </Link>
          ))}
      </div>

      {/* Right arrow */}
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
