import React from "react";
import { Link, useNavigate } from "react-router-dom";
import createStore from "../../Store/userStore";
const NavigationLink = () => {
  const navigate = useNavigate();
  const clearUser = createStore((state) => state.clearUser);
  const handleLogOut = () => {
    clearUser();
    navigate("/");
  };
  return (
    <div className="heros_sect">
      <nav>
        <ul>
          <Link className={"link"} to={"/dashboard"}>
            Dashboard
          </Link>
          <Link to={"/orders"}>Orders</Link>
          <Link to={"/products"}>Add products</Link>
          <Link to={"/manage_users"}>Manage customers</Link>
          <Link to={"/reviewers"}>Reviewers</Link>
          <Link onClick={handleLogOut}>Log out</Link>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationLink;
