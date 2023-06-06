import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/Loading';
import { toast } from 'react-hot-toast';
import swal from 'sweetalert';
import axios from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { userData } from '../../redux/User';
import { AppContext } from '../../context/AppContext';
const ForgotPassword = ({ email,setForgotPassword }) => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { setUserLoginStatus } = useContext(AppContext);
  const [newPasswordPage, setNewPasswordPage] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^.{6,}$/;
    if (!password) {
      setPasswordError('Password is required');
    } else if (!password.trim()) {
      setPasswordError('Password is required');
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Please enter at least six characters');
    } else {
      setPasswordError('');
      try {
        dispatch(showLoading());
        axios
          .post('/new-password', {
            password: password,
            email,
          })
          .then((response) => {
            dispatch(hideLoading());
            if (response.data.status === 'success') {
              setUserLoginStatus(true);
            localStorage.setItem('usertoken', response.data.token);
            dispatch(userData(response.data.result));
            navigate('/');
              swal('SUCCESS', response.data.message, 'success');
               setNewPasswordPage(false)
               setForgotPassword(false)
             } else {
              swal('OOPS', response.data.message, 'error');
            }
          })
          .catch((error) => {
            dispatch(hideLoading());
            toast.error(error.message);
          });
      } catch (error) {
        dispatch(hideLoading());
        toast(error.message);
      }
    }
  };
  const handleSubmitContinue = () => {
    if (!otp.trim()) {
      setOtpError('Please enter a code.');
    } else {
      setOtpError('');
      try {
        dispatch(showLoading());
        axios
          .post('/verify', {
            otp,
            email,
          })
          .then((response) => {
            dispatch(hideLoading());
            if (response.data.status === 'success') {
              setOtpError('');
              swal('SUCCESS', response.data.message, 'success');
              setNewPasswordPage(true)
            } else {
              setOtpError(
                `You've entered doesn't match your code. Please try again`
              );
              // swal('OOPS', response.data.message, 'error');
            }
          })
          .catch((error) => {
            dispatch(hideLoading());
            toast.error(error.message);
          });
      } catch (error) {
        dispatch(hideLoading());
        toast(error.message);
      }
    }
  };
  return (
    <div>
      {!newPasswordPage ? (
        <div className="loginParentDiv">
          <img
            alt="ecos-logo"
            width="200px"
            height="200px"
            className="logo"
            src="../../../Images/ecosLogo2.png"
          ></img>
          <br />
          <br />
          <h4 className="or">Enter security code</h4>
          <p className="or input ">
            Let us know that this email address belongs to you. Enter the code
            from the email sent to <strong>{email}</strong>
          </p>

          <TextField
            id="standard-basic"
            label="Enter code"
            className="input"
            variant="standard"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {otpError && <span className=" msg_signup">{otpError}</span>}
          <br />
          <br />
          <button className="loginButton input" onClick={handleSubmitContinue}>
            Continue
          </button>
          <br />

          {/* <span
          style={{ fontSize: 'medium', marginTop: '40px' }}
          onClick={() => navigate('/signup')}
        >
          Signup
        </span> */}
        </div>
      ) : (
        <div className="loginParentDiv">
          <img
            alt="ecos-logo"
            width="200px"
            height="200px"
            className="logo"
            src="../../../Images/ecosLogo2.png"
          ></img>
          <p></p>
          <h4 className="or"> Choose a new password</h4>
          <p className="or input ">
            Create a new password that is at least 6 characters long. A strong
            password has a combination of letters, digits and punctuation marks.
          </p>

          <form onSubmit={handleSubmit}>
            <br />
            <FormControl className="input" variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                New password
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
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {passwordError && (
              <span className="  msg_signup">{passwordError}</span>
            )}
            <br />
            <br />
            <button className="loginButton">Continue</button>
          </form>
          {/* <p
        className='dont-have'
        onClick={() => navigate('/signup')}
      >
          Don't have an account? Sign Up
      </p> */}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
