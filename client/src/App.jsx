import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Sign_in from "./Cutomers_Section/pages/User_access/Sign_in";
import Sign_up from "./Cutomers_Section/pages/User_access/Sign_up";
import AdminHome from "./Admin_section/Pages/Home/AdminHome";
import App_ from "./Admin_section/App_";
import Home from "./Cutomers_Section/pages/Home/Home";
import Cart from "./Cutomers_Section/pages/Cart/Cart";
import Profile from "./Cutomers_Section/pages/Profile/Profile";
import Search from "./Cutomers_Section/pages/Search/Search";
import Header from  './Cutomers_Section/compnents/Header'
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign_up" element={<Sign_up />} />
          <Route exact path="/admin_home" element={<AdminHome />} />
          <Route exact path="/users_home" element={<App_ />} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="search" element={<Search />} />
          <Route exact path="cart" element={<Cart />} />
          <Route exact path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <App_ />
    </>
  );
}

export default App;
