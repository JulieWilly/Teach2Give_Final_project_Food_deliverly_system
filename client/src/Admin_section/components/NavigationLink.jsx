import React from "react";
import { NavLink } from "react-router-dom";

const NavigationLink = () => {
  return (
    <div className="heros_sect">
      <nav>
        <ul>
          <NavLink className={"link"} to={"/dashboard"}>
            Dashboard
          </NavLink>
          <NavLink to={"/orders"}>Orders</NavLink>
          <NavLink to={"/products"}>Add products</NavLink>
          <NavLink to={"/manage_users"}>Manage customers</NavLink>
          <NavLink to={"/reviewers"}>Reviewers</NavLink>
          <NavLink to={"/reviewers"}>Log out</NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationLink;
