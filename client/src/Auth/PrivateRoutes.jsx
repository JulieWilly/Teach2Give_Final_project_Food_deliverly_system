import React, { useEffect, useState } from "react";
import { VITE_API_URL_BASE } from "../configs/configs";
import createStore from "../Store/userStore";

const PrivateRoutes = () => {
  const [authorized, setAuthorized] = useState();
  const user = createStore((state) => state.user);
  useEffect(() => {
    const getTokenAuthorization = async () => {
      const userID = user.data.cust_id;
      const token = await axios
        .get(`${VITE_API_URL_BASE}/${userID}`)
        .catch((error) => console.log(error));
      console.log(token);
    };
    getTokenAuthorization();
  }, []);
  return <div></div>;
};

export default PrivateRoutes;
