import "./profile.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import { useNavigate } from "react-router-dom";
import createStore from "../../../Store/userStore";

const Profile = () => {
  const [loading, setLoading] = useState("");
  const { user, clearUser } = createStore((state) => ({
    user: state.user,
    clearUser: state.clearUser
  }));
  const [error, setError] = useState();
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const updateDetails = async () => {
    navigate("update_details");
  };

  const handleLogout = async () => {
    clearUser()
    // navigate('/')
  }
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const profile = await axios
          .get(`${VITE_API_URL_BASE}/customers`, {
            withCredentials: true,
          })
          .catch((error) => console.log(error));
        console.log("profile data", profile);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, []);
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
