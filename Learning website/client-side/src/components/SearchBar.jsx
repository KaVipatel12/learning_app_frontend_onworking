import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); // Send search query to parent
    };

    return (
        <div className="container mt-3">
            <input
                type="text"
                className="form-control shadow-sm border-0 p-3"
                placeholder="Search using username, email or mobile"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
