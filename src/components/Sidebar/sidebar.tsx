import React from "react";
import "../styles.css";
import SidebarPostCard from "./SideBarPostCard";

const Sidebar = () => {
  const recentPosts = [
    {
      id: 1,
      title: "My Current Meta Tier List",
      description: "A tier list of all brawlers in the current meta.",
      image: "tierlist.png",
    },
    {
      id: 2,
      title: "Which Map is the Most Fun?!",
      description: "Discussion on the most enjoyable maps in the game.",
      image: "kit.jpg",
    },
    {
      id: 3,
      title: "Tips for Using Surge Effectively",
      description: "How to master Surge in competitive play.",
      image: "kit.jpg",
    },
  ];

  const recentGames = [
    {
      id: 1,
      map: "Double Swoosh",
      mapImage: "doubleswoosh.png",
      kills: 5,
      brawlerImage: "surge.png",
      rank: "Gold",
    },
    {
      id: 2,
      map: "Cavern Churn",
      mapImage: "cavernchurn.png",
      kills: 7,
      brawlerImage: "dynamike.png",
      rank: "Silver",
    },
  ];

  return (
    <aside id="bs-sidebar">
      <section id="bs-recent-posts" className="mb-4">
        <h2 className="h5">Recent Posts</h2>
        <hr />
        <ul className="list-unstyled">
          {recentPosts.map((post) => (
            <li key={post.id} className="mb-3">
              <SidebarPostCard
                title={post.title}
                description={post.description}
                image={post.image}
              />
            </li>
          ))}
        </ul>
      </section>

      <section id="bs-recent-games">
        <h2 className="h5">Recent Games</h2>
        <hr />
        <ul className="list-unstyled">
          {recentGames.map((game) => (
            <li key={game.id} className="mb-3">
              <img
                src={game.mapImage}
                alt={game.map}
                className="img-fluid mb-2"
              />
              <span className="d-block">{`Map: ${game.map}`}</span>
              <span className="d-block">{`Kills: ${game.kills}`}</span>
              <img
                src={game.brawlerImage}
                alt="Brawler"
                className="img-fluid mt-2"
                style={{ width: "30px" }}
              />
              <span className="d-block">{`Rank: ${game.rank}`}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;
