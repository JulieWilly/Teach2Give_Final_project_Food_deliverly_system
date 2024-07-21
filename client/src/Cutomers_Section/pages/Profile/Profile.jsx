import "./profile.css";
import React from "react";

const Profile = () => {
  return (
    <div className="profile_sect">
      <h3>Customer name</h3>
      <p>Email address</p>
      <div className="buttons">
        <button>Edit</button>
        <button>Log out</button>
      </div>
    </div>
  );
};

export default Profile;
