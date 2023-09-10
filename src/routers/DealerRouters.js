import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import DealerDashboard from '../pages/dealer/DealerDashboard';
import DealerLogin from '../pages/dealer/DealerLogin';
import { AppContext } from '../context/AppContext';
import axios from '../axios/axios';
import { useDispatch } from 'react-redux';
import { dealerLogin } from '../redux/Dealer';
import Booking from '../pages/dealer/Booking';
import TestDriveBooking from '../pages/dealer/TestDriveBooking';
import Products from '../pages/dealer/Products';
import Profile from '../pages/dealer/Profile';
import Errorpage from '../components/error/Errorpage';
const DealerRouters = () => {
  const dispatch = useDispatch(dealerLogin);
  const { dealerLoginStatus, setDealerLoginStatus } = useContext(AppContext);
  useEffect(() => {
    axios
      .get('/dealer/isDealerAuth', {
        headers: {
          'x-access-dealertoken': localStorage.getItem('dealertoken'),
        },
      })
      .then((response) => {
        if (!response.data.auth) {
          setDealerLoginStatus(false);
        } else {
          setDealerLoginStatus(true);
          dispatch(dealerLogin(response.data));
        }
      });
  }, [dealerLoginStatus, dispatch, setDealerLoginStatus]);
  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={!dealerLoginStatus ? <DealerLogin /> : <DealerDashboard />}
      ></Route>
      {dealerLoginStatus && (
        <>
          <Route exact path="/bookings" element={<Booking />}></Route>
          <Route exact path="/products" element={<Products />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>

          <Route
            exact
            path="/test-drive"
            element={<TestDriveBooking />}
          ></Route>
        </>
      )}
      <Route
        exact
        path="/"
        element={dealerLoginStatus ? <DealerDashboard /> : <DealerLogin />}
      ></Route>
      <Route path="/*" element={<Errorpage />}></Route>
    </Routes>
  );
};

export default DealerRouters;
