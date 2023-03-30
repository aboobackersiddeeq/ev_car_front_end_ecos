import React, { useContext, useState } from 'react';

import { GoogleButton } from 'react-google-button';
import { auth, provider } from '../../firebase/Firebase-config';
import { signInWithPopup } from 'firebase/auth';

import '../../style/login.css';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from '../../axios/axios';
import { AppContext } from '../../context/AppContext';

function DealerLogin() {
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {});
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setDealerLoginStatus } = useContext(AppContext);
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('/dealer', { email, password })
      .then((response) => {
        if (!response.data.auth) {
          swal(response.data.message);
        } else {
          localStorage.setItem('dealertoken', response.data.token);
          swal('success', response.data.message, 'success');

          setDealerLoginStatus(true);
          navigate('/dealer');
        }
      })
      .catch((err) => {
        swal('sorry', err.message, 'error');
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img
          alt="logo"
          width="200px"
          height="200px"
          className="logo"
          src="../../../Images/ecosLogo2.png"
        ></img>
        <h6>Dealer Sign In</h6>
        <div className="googleButton">
          <GoogleButton onClick={handleClick} id="signInDiv" />{' '}
        </div>

        <h6 className="or">
          <br /> Or <br />{' '}
        </h6>

        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
          />
          <br />
          <br />
          <button className="loginButton">Login</button>
        </form>
      </div>
    </div>
  );
}

export default DealerLogin;
