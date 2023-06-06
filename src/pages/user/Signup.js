import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import '../../style/login.css';
import axios from '../../axios/axios';
import { AppContext } from '../../context/AppContext';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userData } from '../../redux/User';
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { hideLoading, showLoading } from '../../redux/Loading';
function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { setUserLoginStatus } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setotp] = useState('');
  const [secutypage, setSecurityPage] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [otpError, setOtpError] = useState('');
  const navigate = useNavigate();
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
          })
          .then((response) => {
            if (response.data.status === 'success') {
              setOtpError('');
              swal('SUCCESS', response.data.message, 'success');
              try {
                axios
                  .post('/signup', {
                    username: name,
                    email: email,
                    password: password,
                    phone,
                  })
                  .then((response) => {
                    dispatch(hideLoading());
                    if (response.data.status === 'success') {
                      swal('SUCCESS', response.data.message, 'success');
                      localStorage.setItem('usertoken', response.data.token);
                      setUserLoginStatus(true);
                      dispatch(userData(response.data.result));
                      navigate('/');
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
            } else {
              setOtpError(
                `You've entered doesn't match your code. Please try again`
              );
              dispatch(hideLoading());
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setFormErrors(errors);
      if (password === '' || phone === '' || email === '' || name === '') {
        swal('sorry!', 'All fields are required!', 'error');
      } else {
        
        try {
          dispatch(showLoading());
          axios
            .post('/otp', {
              email: email,   
            })
            .then((response) => {
              dispatch(hideLoading());
              if (response.data.status === 'success') {
                setSecurityPage(true);
              } else {
                swal('OOPS', response.data.message, 'error');
              }
            });
        } catch (error) {
          dispatch(hideLoading());
          toast(error.message);
        }
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validate = () => {
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const passwordRegex = /^.{6,}$/;
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    } else if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (!nameRegex.test(name)) {
      errors.name = 'Please enter a valid name';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (!phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!phoneRegex.test(phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      errors.password = 'Please enter at least six characters';
    }
    return errors;
  };
  return (
    <div>
      {!secutypage ? (
        <div className="loginParentDiv">
          <img
            alt="ecos logo"
            width="200px"
            height="200px"
            className="logo"
            src="../../../Images/ecosLogo2.png"
          ></img>
          <h4>Create your account</h4>

          <hr />
          <form onSubmit={handleSubmit}>
            <TextField
              id="standard-basic"
              label="Username"
              className="input"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {formErrors.name && (
              <span className=" msg_signup">{formErrors.name}</span>
            )}
            <br />
            <TextField
              id="standard-basic"
              label="Phone"
              className="input"
              variant="standard"
              value={phone}
              // required={true}
              minLength={10}
              onChange={(e) => setPhone(e.target.value)}
            />

            {formErrors.phone && (
              <span className="  msg_signup">{formErrors.phone}</span>
            )}
            <br />
            <TextField
              id="standard-basic"
              label="Email"
              className="input"
              variant="standard"
              // type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {formErrors.email && (
              <span className="  msg_signup">{formErrors.email}</span>
            )}
            <br />
            <FormControl variant="standard" className="input">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
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

            {formErrors.password && (
              <span className="  msg_signup">{formErrors.password}</span>
            )}
            <br />
            <br />
            <button className="loginButton">Next</button>
          </form>

          <p
             className='dont-have'
            onClick={() => navigate('/login')}
          >
            Already have an account? Sign in
          </p>
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
          <br />
          <br />
          <h4 className="or">Enter security code</h4>
          <p className="or input ">
          Let us know that this email address belongs to you. Enter the code from the email sent to <strong>{email}</strong>
         </p>

          <TextField
            id="standard-basic"
            label="Enter code"
            className="input"
            variant="standard"
            type="text"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
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
      )}
    </div>
  );
}

export default Signup;
