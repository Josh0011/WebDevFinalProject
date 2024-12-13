import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import RecentGameCard from "../Sidebar/RecentGameCard";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import profileClient from "./client";
import { updateProfile, addPost, deletePost } from "./reducer";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, recentPosts, recentGames } = useSelector(
    (state: any) => state.profile
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await profileClient.fetchProfile();
        dispatch(
          updateProfile({
            email: data.user.email,
            brawlStarsId: data.user.brawlStarsId,
          })
        );
        data.posts.forEach((post: any) => dispatch(addPost(post)));
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [dispatch]);

  const handleUpdateProfile = async (email: string, brawlStarsId: string) => {
    try {
      const updatedProfile = await profileClient.updateProfile({
        email,
        brawlStarsId,
      });
      dispatch(
        updateProfile({
          email: updatedProfile.email,
          brawlStarsId: updatedProfile.brawlStarsId,
        })
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await profileClient.deletePost(postId);
      dispatch(deletePost(postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="profile-page w-100">
      {/* HEADER */}
      <div className="header-image">
        <img src="header.jpg" alt="Header" className="blurred-header" />
      </div>
      <div className="profile-picture-container">
        <img
          src="lily.png"
          alt="Profile"
          className="rounded-circle profile-picture"
        />
      </div>
      <div className="profile-info text-white text-center w-100">
        <h1 className="mb-1 fw-bold">
          {profile.user?.name || "Loading..."}{" "}
          <span className="text-secondary fw-bold me-3">
            @{profile.user?.id || ""}
          </span>
          <p className="user-type ">{profile.user?.type || "User"}</p>
        </h1>

        <div className="row mt-5 ms-2 me-2">
          <div className="col-12 d-flex mb-3">
            <h4 className="me-3 fw-bold">Email:</h4>
            <input
              type="email"
              className="form-control"
              value={profile.user?.email || ""}
              onChange={(e) =>
                handleUpdateProfile(e.target.value, profile.brawlStarsId)
              }
            />
          </div>
          <div className="col-12 d-flex mb-5">
            <h4 className="me-3 fw-bold">Brawl Stars ID:</h4>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Brawl Stars ID"
              value={profile.brawlStarsId || ""}
              onChange={(e) =>
                handleUpdateProfile(profile.user?.email, e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* FOLLOWERS */}
      <section className="followers-section ms-3 mb-5 me-3">
        <h3 className="text-white text-start fw-bold">
          Followers ({profile.followers.length}):
        </h3>
        <div className="position-relative" id="carousel-wrapper">
          <div id="carousel-fade-left"></div>
          <div className="d-flex" id="carousel">
            {profile.followers.map((follower) => (
              <div
                key={follower.id}
                className="follower-card mx-2 flex-shrink-0"
              >
                <img
                  src={follower.profilePic}
                  alt={follower.name}
                  className="rounded-circle mt-2"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
                <p className="mt-2 text-white fw-bold">{follower.name}</p>
              </div>
            ))}
          </div>
          <div id="carousel-fade-right"></div>
        </div>
      </section>

      {/* FOLLOWING */}
      <section className="following-section ms-3 mb-5 me-3 ">
        <h3 className="text-white text-start fw-bold">
          Following ({profile.following.length}):
        </h3>
        <div className="position-relative" id="carousel-wrapper">
          <div id="carousel-fade-left"></div>
          <div className="d-flex" id="carousel">
            {profile.following.map((following) => (
              <div
                key={following.id}
                className="following-card mx-2 flex-shrink-0"
              >
                <img
                  src={following.profilePic}
                  alt={following.name}
                  className="rounded-circle mt-2"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
                <p className="mt-2 text-white fw-bold">{following.name}</p>
              </div>
            ))}
          </div>
          <div id="carousel-fade-right"></div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="recent-posts-section p-4 w-100">
        <h3 className="text-white text-start fw-bold">Recent Posts</h3>
        <div className="position-relative" id="carousel-wrapper">
          <div id="carousel-fade-left"></div>
          <div className="d-flex" id="carousel">
            {recentPosts.map((post) => (
              <div
                key={post._id}
                className="recent-post-card d-flex flex-column mb-4"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="img-fluid mb-3 rounded"
                  style={{
                    width: "30%",
                    objectFit: "contain",
                  }}
                />
                <div className="post-body text-start text-white">
                  <h4 className="fw-bold">{post.title}</h4>
                  <p>{post.body}</p>
                </div>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete Post
                </button>
                <div className="comments-section text-white">
                  <h6 className="fw-bold text-start">Comments</h6>
                  <div
                    className="mb-3"
                    style={{ maxHeight: "150px", overflowY: "auto" }}
                  >
                    {post.comments.map((comment) => (
                      <div
                        key={comment._id}
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
                </div>
              </div>
            ))}
          </div>
          <div id="carousel-fade-left"></div>
        </div>
      </section>

      {/* RECENT GAMES */}
      <section className="recent-games-section p-4 w-100">
        <h3 className="text-white text-start fw-bold">Recent Games</h3>
        <div className="carousel d-flex overflow-auto">
          {recentGames.map((game) => (
            <li key={game.id} className="mb-3 me-3">
              <RecentGameCard
                mode={game.mode}
                map={game.map}
                mapImage={game.mapImage}
                brawlerImage={game.brawlerImage}
                brawlerName={game.brawlerName}
                brawlerLevel={game.brawlerLevel}
                kills={game.kills}
                deaths={game.deaths}
                damage={game.damage}
              />
            </li>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
