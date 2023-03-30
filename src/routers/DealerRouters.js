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
        path="/dealer/login"
        element={!dealerLoginStatus ? <DealerLogin /> : <DealerDashboard />}
      ></Route>
      {dealerLoginStatus && (
        <>
          <Route path="/dealer/bookings" element={<Booking />}></Route>
          <Route path="/dealer/products" element={<Products />}></Route>
          <Route path="/dealer/test-drive" element={<TestDriveBooking />} ></Route>
        </>
      )}
      <Route
        path="/dealer"
        element={dealerLoginStatus ? <DealerDashboard /> : <DealerLogin />}
      ></Route>
    </Routes>
  );
};

export default DealerRouters;
