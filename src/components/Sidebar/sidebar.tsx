import React from "react";
import "../styles.css";
import SidebarPostCard from "./SideBarPostCard";
import RecentGameCard from "./RecentGameCard";

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
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;
