import React, { useState } from 'react';
import { GoogleButton } from 'react-google-button';
import { auth, provider } from '../../../firebase/Firebase-config';
import { signInWithPopup } from 'firebase/auth';
import swal from 'sweetalert';
import '../../../style/login.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios/axios';
import { AppContext } from '../../../context/AppContext';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userData } from '../../../redux/User';
function Login() {
  const dispatch = useDispatch(userData);
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data, 'data');
      try {
        axios
          .post('/login-with-google', {
            email: data.user.email,
            username: data.user.displayName,
            provider: data.providerId,
          })
          .then((response) => {
            console.log(response.data);
            if (!response.data.auth) {
              swal('sorry', response.data.message, 'error');
              setUserLoginStatus(false);
            } else {
              setUserLoginStatus(true);
              localStorage.setItem('usertoken', response.data.token);
              dispatch(userData(response.data.result));
              navigate('/');
              swal('success', response.data.message, 'success');
            }
          })
          .catch((error) => toast.error('Network error ', error.message));
      } catch (error) {
        toast.error(error.message, 'Network error');
      }
      navigate('/');
    });
  };
  const { setUserLoginStatus } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    try {
      axios
        .post('/login', { password, email })
        .then((response) => {
          if (!response.data.auth) {
            swal('sorry', response.data.message, 'error');
            setUserLoginStatus(false);
          } else {
            setUserLoginStatus(true);
            localStorage.setItem('usertoken', response.data.token);
            dispatch(userData(response.data.result));
            navigate('/');
            swal('success', response.data.message, 'success');
          }
        })
        .catch((error) => toast.error('Network error '));
    } catch (error) {
      toast.error(error.message, 'Network error ');
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img
          alt="ecos-logo"
          width="200px"
          height="200px"
          className="logo"
          src="../../../Images/ecosLogo2.png"
        ></img>
        <h6>Sign In</h6>
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
            placeholder="Email"
            defaultValue="John"
            required
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
            placeholder="Password"
            required
            minLength={6}
          />
          <br />
          <br />
          <button className="loginButton">Login</button>
        </form>
        <span onClick={() => navigate('/signup')}>Signup</span>
      </div>
    </div>
  );
}

export default Login;
