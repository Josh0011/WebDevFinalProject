import React from "react";
import { useParams, Link } from "react-router-dom";

const Details = () => {
  const { did } = useParams();
  return (
    <div className="details">
      <h1>Details Page</h1>
      <p>Content from remote services for item {did}</p>
      <p>Content from local services for item {did}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Details;
