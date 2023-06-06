import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { GoogleButton } from 'react-google-button';
import { auth, provider } from '../../firebase/Firebase-config';
import { signInWithPopup } from 'firebase/auth';
import swal from 'sweetalert';
import '../../style/login.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userData } from '../../redux/User';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import ForgotPassword from './ForgotPassword';
import { hideLoading, showLoading } from '../../redux/Loading';
function Login() {
  const [forgotPassword,setForgotPassword]= useState(false)
  const [emailError,setEmailError]= useState('')
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const dispatch = useDispatch(userData);
  const handileForgotPassword =()=>{
    if (!email.trim()) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
    }else{
      setEmailError('')
      try {
        dispatch(showLoading());
        axios
          .post('/forgot-password', {
            email: email,   
          })
          .then((response) => {
            dispatch(hideLoading());
            if (response.data.status === 'success') {
              setForgotPassword(true)
            } else {
              swal('OOPS', response.data.message, 'error');
            }
          });
      } catch (error) {
        dispatch(hideLoading());
        toast(error.message);
      }
      
    }
  }
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
      setEmailError('')
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
      {!forgotPassword ?
      (<div className="loginParentDiv">
        <img
          alt="ecos-logo"
          width="200px"
          height="200px"
          className="logo"
          src="../../../Images/ecosLogo2.png"
        ></img>
        <p></p>
        {/* <h6>Sign In</h6> */}
        <div className="googleButton">
          <GoogleButton onClick={handleClick} id="signInDiv" />{' '}
        </div>

        <h6 className="or">
          <br /> Or <br />{' '}
        </h6>

        <form onSubmit={handleLogin}>
         
          <TextField
            id="standard-basic"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
            className="input"
            required
            type='email'
          />
           {emailError && (
              <span className="  msg_signup">{emailError}</span>
            )} 
          <br />
          <FormControl className="input" variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end" className="eye-button">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <span className='forgot-password' onClick={handileForgotPassword}>Forgot password?</span>
          <br />
          <button className="loginButton">LOGIN</button>
        </form>
        
        <p
          className='dont-have'
          onClick={() => navigate('/signup')}
        >
            Don't have an account? Sign Up
        </p>
      </div>)
      :<ForgotPassword email={email} setForgotPassword={setForgotPassword} />}
    </div>
  );
}

export default Login;
