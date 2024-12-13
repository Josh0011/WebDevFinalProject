import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data } = await axios.get("http://localhost:8080/profiles/1"); // Replace with user ID
            setProfile(data);
        };
        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            {profile && (
                <div>
                    <p>Name: {profile.user.name}</p>
                    <p>Email: {profile.user.email}</p>
                    <p>Bio: {profile.bio}</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
