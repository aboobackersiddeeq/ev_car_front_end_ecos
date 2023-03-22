import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import DealerDashboard from '../pages/dealer/DealerDashboard';
import DealerLogin from '../pages/dealer/DealerDashboard';
import { AppContext } from '../context/AppContext';
import axios from '../axios/axios';
import { useDispatch } from 'react-redux';
import { dealerLogin } from '../redux/Dealer';
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
      <Route
        path="/dealer"
        element={dealerLoginStatus ? <DealerDashboard /> : <DealerLogin />}
      ></Route>
    </Routes>
  );
};

export default DealerRouters;
