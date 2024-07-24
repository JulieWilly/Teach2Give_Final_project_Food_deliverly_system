import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Orders from "./Pages/Order/Orders";
import NavigationLink from "./components/NavigationLink";
import ManageUsers from "./Pages/ManageUsers/ManageUsers";
import Reviewers from "./Pages/Reviews/Reviewers";
import Products from "./Pages/Products/Products";
import AdminHome from "./Pages/Home/AdminHome";
import Add_products from "./Pages/Products/Add_products";
const AdminPage = () => {
  <div className="admin_layout">
    <NavigationLink/>
    <div className="admin_main">
      <Outlet/>
    </div>
  </div>
}

const CustomerPage = () => {
  <div className="admin_layout">
    <Header />
    <div className="admin_main">
      <Outlet />
    </div>
  </div>;
};
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header /> 
        <NavigationLink />
        <div className="app">
          <Routes>
            {/* <Route path="/admin_home" element={<AdminHome />}></Route> */}
            <Route exact path="dashboard" element={<Dashboard />} />
            <Route exact path="orders" element={<Orders />} />
            <Route exact path="manage_users" element={<ManageUsers />} />
            <Route exact path="products" element={<Products />} />
            <Route exact path="reviewers" element={<Reviewers />} />
            {/* <Route exact path="*" element={<div>Page not found.</div>} /> */}
            <Route exact path="add_product" element={<Add_products />} />

            <Route
              exact
              path="/add_product/:product_id"
              element={<Add_products/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
