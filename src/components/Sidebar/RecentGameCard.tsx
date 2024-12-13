import React from "react";
import "./styles.css";

const RecentGameCard = ({
  mode,
  map,
  mapImage,
  brawlerImage,
  brawlerName,
  brawlerLevel,
  kills,
  deaths,
  damage,
}) => {
  return (
    <div className="recent-game-card d-flex align-items-start">
      <div className="map-image-container">
        <img
          src={mapImage}
          alt={`${map} map`}
          className="img-fluid rounded"
          style={{
            width: "126px", // 504px / 4
            height: "204px", // 816px / 4
            objectFit: "cover",
          }}
        />
      </div>
      <div className="game-info ms-3 d-flex flex-column justify-content-between">
        <h5 className="game-title mb-2">{`${mode}  ${map}`}</h5>
        <div className="brawler-info d-flex align-items-center mb-3">
          <img
            src={brawlerImage}
            alt={brawlerName}
            className="rounded"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
            }}
          />
          <div className="ms-3">
            <p className="brawler-name mb-0">{brawlerName}</p>
            <p className="brawler-level mb-0">{`Level ${brawlerLevel}`}</p>
          </div>
        </div>
        <div className="game-stats d-flex flex-column justify-content-between align-items-start">
          <p className="game-stat kills mb-1">{`Kills: ${kills}`}</p>
          <p className="game-stat deaths mb-1">{`Deaths: ${deaths}`}</p>
          <p className="game-stat damage">{`Damage: ${damage}`}</p>
        </div>
      </div>
    </div>
  );
};

export default RecentGameCard;
