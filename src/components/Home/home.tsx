import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import "./styles.css";
import Sidebar from "../Sidebar/sidebar";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [latestMembers, setLatestMembers] = useState([
    { id: 1, name: "SecondBest", profilePic: "surge.png" },
    { id: 2, name: "JuanCarlos", profilePic: "kit.jpg" },
  ]);
  const [recentPosts, setRecentPosts] = useState([
    { id: 1, title: "My Current Meta Tier List" },
    { id: 2, title: "Which Map is the Most Fun?!" },
  ]);

  useEffect(() => {
    // Future: Fetch dynamic data here
  }, []);

  return (
    <div className="container-fluid" id="bs-home">
      {/* Header Section */}
      <header
        className="row align-items-center bg-darker text-white position-fixed"
        id="bs-header"
      >
        <div className="col-12 col-md-3 mb-2 mb-md-0">
          <img
            src="logo.png"
            alt="Melodie Stats Logo"
            className="img-fluid"
            style={{ maxWidth: "300px" }}
          />
        </div>
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <ul
            className="list-unstyled d-flex justify-content-center mb-0"
            id="bs-carousel"
          >
            {latestMembers.map((member) => (
              <li key={member.id} className="me-2 text-center">
                <img
                  src={member.profilePic}
                  alt={`${member.name} profile`}
                  className="rounded-circle mb-1"
                  style={{
                    width: "30px", // Reduced size
                    height: "30px",
                    objectFit: "cover", // Maintain aspect ratio
                  }}
                />
                <small>{`${member.name} just joined!`}</small>{" "}
                {/* Smaller text */}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-12 col-md-3 text-md-end d-flex flex-column align-items-end">
          {isLoggedIn ? (
            <div id="bs-profile" className="d-flex align-items-center">
              <img
                src="/user_placeholder.jpg"
                alt="User Profile"
                className="rounded-circle me-2"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
              <span>Username</span>
            </div>
          ) : (
            <div id="bs-auth-buttons" className="text-center">
              <button className="btn btn-primary btn-lg mb-2 me-2">
                Log In
              </button>
              <button className="btn btn-success btn-lg mb-2">Sign Up</button>
              <p className="text-secondary small mb-0">
                Sign in to access personalized features!
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Section */}
      <main className="row" id="bs-main-content">
        {/* Sidebar */}
        <Sidebar />

        {/* Posts Viewer */}
        <section className="col-md-9 offset-md-3" id="bs-posts-viewer">
          <h2 className="h4">Explore Posts</h2>
          <ul className="row list-unstyled">
            {recentPosts.map((post) => (
              <li key={post.id} className="col-md-4 mb-4">
                <div className="card">
                  <img src="tierlist.png" alt="Post" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">Click to explore more...</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Home;
