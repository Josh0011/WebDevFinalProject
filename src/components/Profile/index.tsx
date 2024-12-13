import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import RecentGameCard from "../Sidebar/RecentGameCard";
import "../styles.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    user: {
      name: "SecondBest",
      id: 1,
      email: "secondbest@gmail.com",
      type: "User", // "Admin" for admin users
    },
    brawlStarsId: "64YPF2",
    followers: [
      { id: 1, name: "Byron", profilePic: "byron.png" },
      { id: 2, name: "Janet", profilePic: "janet.png" },
      { id: 3, name: "Sandy", profilePic: "sandy.png" },
      { id: 1, name: "Byron", profilePic: "byron.png" },
      { id: 2, name: "Janet", profilePic: "janet.png" },
      { id: 3, name: "Sandy", profilePic: "sandy.png" },
      { id: 2, name: "Janet", profilePic: "janet.png" },
    ],
    following: [
      { id: 3, name: "Ben", profilePic: "r-t.png" },
      { id: 4, name: "Josh", profilePic: "lou.png" },
      { id: 3, name: "Ben", profilePic: "r-t.png" },
      { id: 4, name: "Josh", profilePic: "lou.png" },
      { id: 3, name: "Ben", profilePic: "r-t.png" },
      { id: 4, name: "Josh", profilePic: "lou.png" },
      { id: 3, name: "Ben", profilePic: "r-t.png" },
    ],
    recentPosts: [
      {
        id: 1,
        title: "My Current Meta Tier List",
        body: "This place is for a small description. I love Brawl Stars!",
        image: "tierlist.png",
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
        title: "I WANT TO DIE",
        body: "This place is for a small description. I love Brawl Stars!",
        image: "maps.png",
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
    ],
    recentGames: [
      {
        id: 1,
        mode: "Gem Grab",
        map: "Double Swoosh",
        mapImage: "doubleswoosh.png",
        brawlerImage: "sandy.png",
        brawlerName: "Sandy",
        brawlerLevel: 9,
        kills: 7,
        deaths: 5,
        damage: 13472,
      },
      {
        id: 2,
        mode: "Bounty",
        map: "Shooting Star",
        mapImage: "shootingstar.png",
        brawlerImage: "angelo.png",
        brawlerName: "Angelo",
        brawlerLevel: 10,
        kills: 10,
        deaths: 3,
        damage: 28234,
      },
    ],
  });

  useEffect(() => {
    // Future: Fetch dynamic data from the backend and update the state
  }, []);

  return (
    <div className="profile-page w-100">
      {/* Header Section */}

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
          {profile.user.name}{" "}
          <span className="text-secondary fw-bold me-3">
            @{profile.user.id}
          </span>
          <p className="user-type ">{profile.user.type}</p>
        </h1>

        <div className="row mt-5 ms-2 me-2">
          <div className="col-12 d-flex mb-3">
            <h4 className="me-3 fw-bold">Email:</h4>
            <p className="info-block ">{profile.user.email}</p>
          </div>
          <div className="col-12 d-flex mb-5">
            <h4 className="me-3 fw-bold">Brawl Stars ID:</h4>
            <p className="info-block ">{profile.brawlStarsId}</p>
          </div>
        </div>
      </div>

      {/* Followers */}
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

      {/* Following */}
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
            {profile.recentPosts.map((post) => (
              <div
                key={post.id}
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
                <div className="comments-section text-white">
                  <h6 className="fw-bold text-start">Comments</h6>
                  <div
                    className="mb-3"
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
                </div>
                
              </div>
            ))}
          </div>
          <div id="carousel-fade-left"></div>
        </div>
      </section>

      {/* Recent Games */}
      <section className="recent-games-section p-4 w-100">
        <h3 className="text-white text-start fw-bold">Recent Games</h3>
        <div className="carousel d-flex overflow-auto">
          {profile.recentGames.map((game) => (
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
