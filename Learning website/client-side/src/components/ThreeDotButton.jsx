import React from "react";

const ThreeDotButton = ({ options }) => {
  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{fontSize: "30px"}}
      >
        ⋮
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {options.map((option, index) => (
          <li key={index}>
            <button className="dropdown-item" onClick={option.action}>
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreeDotButton;