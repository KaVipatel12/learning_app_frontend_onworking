function PillButton({ toggleCategory, selectedCategories, isSingleSelect = false }) {
  const categories = [
    { title: "Web Development" },
    { title: "Artificial Intelligence" },
    { title: "Data Science" },
    { title: "Cloud Computing" },
    { title: "Blockchain" },
    { title: "Cybersecurity" },
    { title: "Programming" },
    { title: "Cloudflare Category" },
  ];

  return (
    <>
      <br />
      <div className="category-container">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              toggleCategory(category.title);
            }}
            className={`category-button ${
              isSingleSelect
                ? selectedCategories === category.title
                : selectedCategories.includes(category.title)
                ? "selected"
                : ""
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>
    </>
  );
}

export default PillButton;
