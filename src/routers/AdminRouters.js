import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../pages/admin/Products';
import Booking from '../pages/admin/Booking';
import TestDriveBooking from '../pages/admin/TestDriveBooking';
import Community from '../pages/admin/Community';
import Dealers from '../pages/admin/Dealers';
import AdminUser from '../pages/admin/AdminUser';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import { AppContext } from '../context/AppContext';
import axios from '../axios/axios';
import { adminlogin } from '../redux/Admin';
import { useDispatch } from 'react-redux';
import Errorpage from '../components/error/Errorpage';
const AdminRouters = () => {
  const { adminLoginStatus, setAdminLoginStatus } = useContext(AppContext);

  const dispatch = useDispatch(adminlogin);
  useEffect(() => {
    try {
      axios
        .get('/admin/isAdminAuth', {
          headers: {
            'x-access-admintoken': localStorage.getItem('admintoken'),
          },
        })
        .then((response) => {
          if (!response.data.auth) {
            setAdminLoginStatus(false);
          } else {
            setAdminLoginStatus(true);
            dispatch(adminlogin(response.data));
          }
        });
    } catch {}
  }, [adminLoginStatus, dispatch, setAdminLoginStatus]);
  return (
    <>
      <Routes>
        <Route
          exact
          path="/login"
          element={!adminLoginStatus ? <AdminLogin /> : <AdminDashboard />}
        ></Route>
        <Route
          exact
          path="/"
          element={adminLoginStatus ? <AdminDashboard /> : <AdminLogin />}
        ></Route>
        {adminLoginStatus && (
          <>
            <Route exact path="/users" element={<AdminUser />}></Route>
            <Route exact path="/products" element={<Products />}></Route>
            <Route exact path="/bookings" element={<Booking />}></Route>
            <Route
              exact
              path="/community"
              element={<Community />}
            ></Route>
            <Route exact path="/dealers" element={<Dealers />}></Route>
            <Route
              exact
              path="/test-drive"
              element={<TestDriveBooking />}
            ></Route>
          </>
        )}
        <Route  path="/*" element={<Errorpage />}></Route>
      </Routes>
    </>
  );
};

export default AdminRouters;
