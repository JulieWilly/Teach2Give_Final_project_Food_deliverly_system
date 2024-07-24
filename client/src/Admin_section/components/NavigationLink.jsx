import React from "react";
import { Link } from "react-router-dom";

const NavigationLink = () => {
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
          <Link to={"/reviewers"}>Log out</Link>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationLink;
