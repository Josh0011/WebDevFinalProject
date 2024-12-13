import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?criteria=${query}`);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSearch}>
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search Clubs..."
        style={{ minWidth: "250px" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
