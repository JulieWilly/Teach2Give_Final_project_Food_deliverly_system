import "./profile.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { VITE_API_URL_BASE } from "../../../configs/configs";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState();
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const updateDetails = async () => {
    navigate("update_details");
  };
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const profile = await axios
          .get(`${VITE_API_URL_BASE}/customers`, {
            withCredentials:true
          })
          .catch((error) => console.log(error));
        console.log(profile)
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile()
  }, []);
  return (
    <div className="profile_sect">
      <h3>Customer name</h3>
      <p>Email address</p>
      <div className="buttons">
        <button onClick={updateDetails}>Edit</button>
        <button>Log out</button>
      </div>
    </div>
  );
};

export default Profile;
