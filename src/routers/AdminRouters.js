import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Products from "../pages/admin/AdminProducts/Products";
import Booking from "../pages/admin/Booking/Booking";
import TestDriveBooking from "../pages/admin/Booking/TestDriveBooking";
import Community from "../pages/admin/Community/Community";
import Dealers from "../pages/admin/Dealers/Dealers";
import AdminUser from "../pages/admin/user-management/AdminUser";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/Dashboard/AdminDashboard";
import {AppContext} from '../context/AppContext'
const AdminRouters = () => {
   const{adminLoginStatus}  = useContext(AppContext)
  return (
    <>
      <Routes>
        <Route
          path="/admin/login" exact
          element={!adminLoginStatus ?  <AdminLogin /> : <AdminDashboard />}
        ></Route>
        <Route
          path="/admin" exact
          element={adminLoginStatus ?  <AdminDashboard /> : <AdminLogin />}
        ></Route>
        {adminLoginStatus && (
          <>
            <Route path="/admin/users" element={<AdminUser />}></Route>
            <Route path="/admin/products" element={<Products />}></Route>
            <Route path="/admin/bookings" element={<Booking />}></Route>
            <Route path="/admin/community" element={<Community />}></Route>
            <Route path="/admin/dealers" element={<Dealers />}></Route>
            <Route
              path="/admin/test-drive"
              element={<TestDriveBooking />}
            ></Route>
          </>
        )}
      </Routes>
    </>
  );
};

export default AdminRouters;
