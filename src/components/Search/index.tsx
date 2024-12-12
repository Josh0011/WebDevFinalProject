import React from "react";
import { Link } from "react-router-dom";

const Search = () => (
  <div className="search">
    <h1>Search</h1>
    <form>
      <input type="text" placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
    <div>
      <p>List of search results with links:</p>
      <Link to="/details/1">Details of Item 1</Link>
      <br />
      <Link to="/details/2">Details of Item 2</Link>
    </div>
  </div>
);

export default Search;
