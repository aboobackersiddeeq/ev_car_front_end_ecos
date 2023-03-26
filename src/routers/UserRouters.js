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

const UserRouters = () => {
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
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="/map" element={<MapboxMap />}></Route>
      </Routes>
    </>
  );
};

export default UserRouters;
