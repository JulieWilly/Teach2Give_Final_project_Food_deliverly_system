import React, { useEffect } from "react";
import createStore from "../Store/userStore";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const user = createStore((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/");
  }, []);
  return <div>{children}</div>;
};

export default ProtectedRoute;
