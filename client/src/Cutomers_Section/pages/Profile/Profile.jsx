import "./profile.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createStore from "../../../Store/userStore";

const Profile = () => {
  const { user, clearUser } = createStore((state) => ({
    user: state.user,
    clearUser: state.clearUser,
  }));

  const navigate = useNavigate();

  const updateDetails = async () => {
    navigate("update_details");
  };

  const handleLogout = async () => {
    clearUser();
    navigate("/");
  };

  return (
    <div className="profile_sect">
      <h3>{user.data.custName}</h3>
      <p>{user.data.custEmail}</p>
      <div className="buttons">
        <button onClick={updateDetails}>Edit</button>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Profile;
