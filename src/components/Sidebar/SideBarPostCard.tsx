import React from "react";
import "../styles.css";
import { BsChevronRight } from "react-icons/bs";

const SidebarPostCard = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="sidebar-post-card d-flex align-items-center">
      <div className="post-image-container">
        <img
          src={image}
          alt="Post Preview"
          className="img-fluid rounded"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      </div>
      <div className="post-content ms-3 flex-grow-1">
        <h5 className="post-title mb-1 text-truncate">{title}</h5>
        <p className="post-description mb-0 text-truncate">{description}</p>
      </div>
      <BsChevronRight className="chevron-icon" size={20} />
    </div>
  );
};

export default SidebarPostCard;
