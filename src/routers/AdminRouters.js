import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../pages/admin/admin-products/Products';
import Booking from '../pages/admin/booking/Booking';
import TestDriveBooking from '../pages/admin/booking/TestDriveBooking';
import Community from '../pages/admin/community/Community';
import Dealers from '../pages/admin/dealers/Dealers';
import AdminUser from '../pages/admin/user-management/AdminUser';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import { AppContext } from '../context/AppContext';
const AdminRouters = () => {
  const { adminLoginStatus } = useContext(AppContext);
  return (
    <>
      <Routes>
        <Route
          exact
          path="/admin/login"
          element={!adminLoginStatus ? <AdminLogin /> : <AdminDashboard />}
        ></Route>
        <Route
          exact
          path="/admin"
          element={adminLoginStatus ? <AdminDashboard /> : <AdminLogin />}
        ></Route>
        {adminLoginStatus && (
          <>
            <Route exact path="/admin/users" element={<AdminUser />}></Route>
            <Route exact path="/admin/products" element={<Products />}></Route>
            <Route exact path="/admin/bookings" element={<Booking />}></Route>
            <Route
              exact
              path="/admin/community"
              element={<Community />}
            ></Route>
            <Route exact path="/admin/dealers" element={<Dealers />}></Route>
            <Route
              exact
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
