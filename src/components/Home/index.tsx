import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="home">
    <h1>Home</h1>
    <p>Anonymous content for users who are not logged in.</p>
    <p>Content for logged-in users appears here.</p>
    <nav>
      <Link to="/login">Login</Link> | <Link to="/search">Search</Link> | <Link to="/profile/1">Profile</Link>
    </nav>
  </div>
);

export default Home;