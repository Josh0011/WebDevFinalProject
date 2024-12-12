import React from "react";
import { useParams, Link } from "react-router-dom";

const Profile = () => {
  const { uid } = useParams();
  return (
    <div className="profile">
      <h1>Profile Page</h1>
      <p>Public details for user {uid}</p>
      <p>Private details for user {uid}</p>
      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default Profile;
