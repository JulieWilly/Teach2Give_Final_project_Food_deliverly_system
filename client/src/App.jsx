import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import Sign_in from "./Cutomers_Section/pages/User_access/Sign_in";
import Sign_up from "./Cutomers_Section/pages/User_access/Sign_up";
import AdminHome from "./Admin_section/Pages/Home/AdminHome";
import Home from "./Cutomers_Section/pages/Home/Home";
import Cart from "./Cutomers_Section/pages/Cart/Cart";
import Header from "./Cutomers_Section/compnents/Header";
import Billing from "./Cutomers_Section/pages/Billing/Billing";
import Add_products from "./Admin_section/Pages/Products/Add_products";
import Add_Reviews from "./Cutomers_Section/pages/Profile/Reviews/Add_Reviews";
import AdminHeader from "./Admin_section/components/AdminHeader";
import Orders from "./Admin_section/Pages/Order/Orders";
import NavigationLink from "./Admin_section/components/NavigationLink";
import Dashboard from "./Admin_section/Pages/Dashboard/Dashboard";
import ManageUsers from "./Admin_section/Pages/ManageUsers/ManageUsers";
import Products from "./Admin_section/Pages/Products/Products";
import Reviewers from "./Admin_section/Pages/Reviews/Reviewers";
import Update_product from "./Admin_section/Pages/Products/Update_product";
import UpdateCustomerDetails from "./Cutomers_Section/pages/Profile/UpdateCustomerDetails";
import ProtectedRoute from "./Auth/ProtectedRoute";
const AdminLayout = () => (
  <div className="admin-layout">
    <AdminHeader />
    <NavigationLink />
    <div className="admin-main">
      <Outlet />
    </div>
  </div>
);

const UserLayout = () => (
  <div className="user-layout">
    <Header />
    <div className="user-main">
      <Outlet />
    </div>
  </div>
);

const MainLayout = () => {
  return <Outlet />;
};
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route exact path="/" element={<Sign_in />}></Route>
            <Route exact path="/sign_up" element={<Sign_up />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route exact path="/admin_home" element={<AdminHome />} />

            <Route
              exact
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="manage_users"
              element={
                <ProtectedRoute>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="reviewers"
              element={
                <ProtectedRoute>
                  <Reviewers />
                </ProtectedRoute>
              }
            />
            <Route exact path="*" element={<div>Page not found.</div>} />
            <Route
              exact
              path="add_product"
              element={
                <ProtectedRoute>
                  <Add_products />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/add_product/:product_id"
              element={
                <ProtectedRoute>
                  <Add_products />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/update_product/:product_id"
              element={
                <ProtectedRoute>
                  <Update_product />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route element={<UserLayout />}>
            <Route
              exact
              path="/users_home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/billing"
              element={
                <ProtectedRoute>
                  <Billing />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/add_reviews"
              element={
                <ProtectedRoute>
                  <Add_Reviews />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/update_details"
              element={
                <ProtectedRoute>
                  <UpdateCustomerDetails />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
