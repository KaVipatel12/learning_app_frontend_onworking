import React from 'react'

function PillButton({toggleCategory, selectedCategories}) {
    const categories = [
        { title: "Web Development" },
        { title: "Artificial Intelligence" },
        { title: "Data Science" },
        { title: "Cloud Computing" },
        { title: "Blockchain" },
        { title: "Cybersecurity" },
        { title: "Programming" },
        { title: "cloudfare category" },
    
      ];
  return (
    <>
    <br />
    <div className="category-container">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => toggleCategory(category.title)}
          className={`category-button ${
            selectedCategories.includes(category.title) ? "selected" : ""
          }`}
        >
          {category.title}
        </button>
      ))}
    </div>
  </>
  )
}

export default PillButton
