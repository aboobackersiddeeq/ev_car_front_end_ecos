import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/user/login/Login';
import Signup from '../pages/user/signup/Signup';
import Home from '../pages/user/Home';
import Ev from '../pages/user/Ev';
import EvMax from '../pages/user/evList/EvMax';
import EvPrime from '../pages/user/evList/EvPrime';
import DarkEdition from '../pages/user/evList/DarkEdition';
import EvTestBooking from '../pages/user/EvTestBooking';
import ThankYou from '../pages/user/ThankYou';
import Booking from '../pages/user/Booking';
import Checkout from '../pages/user/Checkout';
import MapboxMap from '../pages/user/MapBox';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import axios from '../axios/axios';
import { userData } from '../redux/User';
import { useDispatch } from 'react-redux';
// import Errorpage from '../components/error/Errorpage';

const UserRouters = () => {
  const dispatch = useDispatch(userData);
  const { setUserLoginStatus, userLoginStatus } = useContext(AppContext);
  useEffect(() => {
    axios
      .get('/is-user-auth', {
        headers: { 'x-access-token': localStorage.getItem('usertoken') },
      })
      .then((response) => {
        if (!response.data.auth) {
          setUserLoginStatus(false);
        } else {
          dispatch(userData(response.data));
          setUserLoginStatus(true);
        }
      });
  }, [userLoginStatus, setUserLoginStatus, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/ev" element={<Ev />}></Route>
        <Route path="/ev-max" element={<EvMax />}></Route>
        <Route path="/ev-prime" element={<EvPrime />}></Route>
        <Route path="/ev-dark" element={<DarkEdition />}></Route>
        <Route path="/ev-test-booking" element={<EvTestBooking />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/ev-thank" element={<ThankYou />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/map" element={<MapboxMap />}></Route>
        {/* <Route path="*" element={<Errorpage />}></Route> */}
      </Routes>
    </>
  );
};

export default UserRouters;
