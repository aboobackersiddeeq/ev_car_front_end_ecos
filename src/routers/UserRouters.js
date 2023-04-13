import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/user/Login';
import Signup from '../pages/user/Signup';
import Home from '../pages/user/Home';
import Ev from '../pages/user/Ev';
import EvMax from '../pages/user/EvList/EvMax';
import EvPrime from '../pages/user/EvList/EvPrime';
import DarkEdition from '../pages/user/EvList/DarkEdition';
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
import ChatAgent from '../components/ChatAgent';
import Community from '../pages/user/Community';
import { hideLoading } from '../redux/Loading';
import Errorpage from '../components/error/Errorpage';

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
          dispatch(hideLoading());
        } else {
          dispatch(userData(response.data.result));
          setUserLoginStatus(true);
          dispatch(hideLoading());
        }
      });
  }, [userLoginStatus, setUserLoginStatus, dispatch]);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/ev" element={<Ev />}></Route>
        <Route exact path="/ev-max" element={<EvMax />}></Route>
        <Route exact path="/ev-prime" element={<EvPrime />}></Route>
        <Route exact path="/ev-dark" element={<DarkEdition />}></Route>
        <Route
          exact
          path="/ev-test-booking"
          element={<EvTestBooking />}
        ></Route>
        <Route exact path="/booking" element={<Booking />}></Route>
        <Route exact path="/ev-thank" element={<ThankYou />}></Route>
        <Route exact path="/checkout" element={<Checkout />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/map" element={<MapboxMap />}></Route>
        <Route exact path="/chat" element={<ChatAgent />}></Route>

        <Route
          path="/community"
          element={!userLoginStatus ? <Login /> : <Community />}
        ></Route>
        <Route path="*" errorElement={<Errorpage />}></Route>
      </Routes>
    </>
  );
};

export default UserRouters;
