import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import "./styles.css";
import Sidebar from "../Sidebar/sidebar";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig"; // Import Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth";
import SearchBar from "../Search/searchbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Protection/authReducer";

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const [currentUser, setCurrentUser] = useState(null);
  const [latestMembers, setLatestMembers] = useState([
    { id: 1, name: "SecondBest", profilePic: "surge.png" },
    { id: 2, name: "JuanCarlos", profilePic: "kit.jpg" },
    { id: 3, name: "Benjamin Welsh", profilePic: "kit.jpg" },
    { id: 4, name: "Andres Matton-Conover", profilePic: "kit.jpg" },
  ]);
  const [recentPosts, setRecentPosts] = useState([
    {
      id: 1,
      title: "My Current Meta Tier List",
      body: "This place is for a small description. I love Brawl Stars!",
      image: "tierlist.png",
      poster: {
        username: "SecondBest",
        profilePic: "surge.png",
      },
      comments: [
        {
          id: 1,
          user: "SecondBest",
          profilePic: "surge.png",
          text: "put kit at F bro",
        },
        {
          id: 2,
          user: "JuanCarlos",
          profilePic: "kit.jpg",
          text: "put kit at S bro",
        },
      ],
    },
    {
      id: 2,
      title: "Which Map is the Most Fun?!",
      body: "Discussion about maps in Brawl Stars. What's your favorite?",
      image: "maps.png",
      poster: {
        username: "JuanCarlos",
        profilePic: "kit.jpg",
      },
      comments: [
        {
          id: 1,
          user: "Alice",
          profilePic: "user3.png",
          text: "Mine is Double Swoosh!",
        },
      ],
    },
  ]);

  useEffect(() => {
    // Monitor Firebase authentication state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(login()); // Update Redux state
        setCurrentUser(user);
        try {
          setCurrentUser(user);
          // Fetch user-specific data (e.g., latest members or posts)
          const token = await user.getIdToken();
          const response = await axios.get(
            `${import.meta.env.VITE_REMOTE_SERVER}/api/user/data`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("User data fetched:", response.data);

          // Optionally update latest members or other user-specific data here
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      dispatch(logout());
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="container-fluid" id="bs-home">
      {/* Header Section */}
      <header
        className="row align-items-center bg-darker text-white position-fixed"
        id="bs-header"
        style={{ flexWrap: "nowrap" }}
      >
        {/* LOGO */}
        <div className="col-3 d-flex justify-content-start me-2">
          <img
            src="logo.png"
            alt="Melodie Stats Logo"
            className="img-fluid"
            style={{ maxWidth: "300px" }}
          />
        </div>
        {/* CAROUSEL */}
        <div className=" col-6 d-md-flex d-none justify-content-center">
          <div id="bs-carousel-wrapper" className="w-100">
            <div id="bs-carousel-fade-left"></div>
            <div className="d-flex" id="bs-carousel">
              {latestMembers.map((member) => (
                <div
                  key={member.id}
                  className="d-flex flex-column align-items-center text-center mx-3"
                >
                  <img
                    src={member.profilePic}
                    alt={`${member.name} profile`}
                    className="rounded-circle mb-1"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <small className="text-truncate">{`${member.name} just joined!`}</small>
                </div>
              ))}
            </div>
            <div id="bs-carousel-fade-right"></div>
          </div>
        </div>
        {/* LOGIN/LOGOUT */}
        <div className="col-3 d-flex flex-column">
          {isLoggedIn ? (
            <div
              id="bs-profile"
              className="d-flex flex-column align-items-start ms-3"
            >
              <div className="d-flex align-items-center">
                <Link
                  to="/profile"
                  className="text-decoration-none text-white d-flex align-items-center"
                >
                  <span className="fw-bold me-2">
                    {currentUser?.displayName || currentUser?.email || "User"}
                  </span>
                  <img
                    src="byron.png"
                    alt="User Profile"
                    className="rounded-circle border border-4 border-success"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-danger btn-sm mt-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div id="bs-auth-buttons" className="text-center">
              <Link to="/login" className="btn btn-primary btn-lg mb-2 me-2">
                Log In
              </Link>
              <Link to="/register" className="btn btn-success btn-lg mb-2">
                Sign Up
              </Link>
              <p className="text-secondary small mb-0">
                Sign in to access personalized features!
              </p>
            </div>
          )}
        </div>
      </header>

      <main className="row" id="bs-main-content">
        {/* Posts Viewer */}
        <section className="col-lg-9 col-md-8" id="bs-posts-viewer">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="posts-header">For You</h2>
            <SearchBar />
          </div>
          <div className="posts-container mx-auto">
            {recentPosts.map((post) => (
              <div key={post.id} className="post-container mb-4 p-3">
                {/* Poster Section */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={post.poster.profilePic}
                    alt={`${post.poster.username}'s profile`}
                    className="rounded-circle me-2"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />
                  <span className="fw-bold">{post.poster.username}</span>
                </div>
                {/* Post Image */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="img-fluid mb-3 rounded "
                  style={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                {/* Post Title and Description */}
                <h5 className="fw-bold text-start">{post.title}</h5>
                <p className="text-start">{post.body}</p>
                <hr />
                {/* Comments Section */}
                <h6 className="fw-bold text-start">Comments</h6>
                <div
                  className="comments-section mb-3"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="d-flex align-items-center mb-2"
                    >
                      <img
                        src={comment.profilePic}
                        alt={comment.user}
                        className="rounded-circle me-2"
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                        }}
                      />
                      <p className="mb-0">
                        <strong>{comment.user}:</strong> {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
                {isLoggedIn ? (
                  <div className="d-flex">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="form-control rounded-pill me-2"
                    />
                    <button className="btn btn-primary rounded-pill">
                      Comment
                    </button>
                  </div>
                ) : (
                  <p className="text-secondary">Sign in to comment</p>
                )}
                <hr />
              </div>
            ))}
          </div>
        </section>
        <aside
          className="col-lg-3 col-md-4 px-3 d-none d-md-block"
          id="bs-sidebar"
        >
          {isLoggedIn && <Sidebar />}
        </aside>
      </main>
    </div>
  );
};

export default Home;
