import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import '../../style/login.css';
import axios from '../../axios/axios';
import { AppContext } from '../../context/AppContext';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userData } from '../../redux/User';

function Signup() {
  const dispatch = useDispatch(userData);
  const [email, setEmail] = useState('');
  const { setUserLoginStatus } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setFormErrors(errors);
      if (password === '' || phone === '' || email === '' || name === '') {
        swal('sorry!', 'All fields are required!', 'error');
      } else {
        try {
          axios
            .post('/signup', {
              username: name,
              email: email,
              password: password,
              phone,
            })
            .then((response) => {
              if (response.data.status === 'success') {
                swal('SUCCESS', response.data.message, 'success');
                localStorage.setItem('usertoken', response.data.token);
                setUserLoginStatus(true);
                dispatch(userData(response.data.result));
                navigate('/');
              } else {
                swal('OOPS', response.data.message, 'error');
              }
            });
        } catch (error) {
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
    const passwordRegex = /^\d{6}$/;
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
      <div className="loginParentDiv">
        <img
          alt="ecos logo"
          width="200px"
          height="200px"
          className="logo"
          src="../../../Images/ecosLogo2.png"
        ></img>
        <h6>Sign Up</h6>

        <hr />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            placeholder="Username"
          />
          {formErrors.name && (
            <span className=" msg_signup">{formErrors.name}</span>
          )}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            value={phone}
            // required={true}
            minLength={10}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            placeholder="Ph:8137020393"
          />
          {formErrors.phone && (
            <span className="  msg_signup">{formErrors.phone}</span>
          )}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          {formErrors.email && (
            <span className="  msg_signup">{formErrors.email}</span>
          )}
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
            minLength={6}
          />
          {formErrors.password && (
            <span className="  msg_signup">{formErrors.password}</span>
          )}
          <br />
          <br />
          <button className="loginButton">Login</button>
        </form>

        <span
          style={{ fontSize: 'medium', marginTop: '40px' }}
          onClick={() => navigate('/login')}
        >
          Sign in instead
        </span>
      </div>
    </div>
  );
}

export default Signup;
