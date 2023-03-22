import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/user/Login/Login";
import Signup from "../pages/user/Signup/Signup";
import Home from "../pages/user/Home";
import Ev from "../pages/user/Ev";
import EvMax from "../pages/user/EvList/EvMax";
import EvPrime from "../pages/user/EvList/EvPrime";
import DarkEdition from "../pages/user/EvList/DarkEdition";
import EvTestBooking from "../pages/user/EvTestBooking";

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
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
      </Routes>
    </>
  );
};

export default UserRouters;
