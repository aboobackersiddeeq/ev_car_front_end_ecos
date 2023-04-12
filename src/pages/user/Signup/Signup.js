import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import '../../../style/login.css';
import axios from '../../../axios/axios';
import { AppContext } from '../../../context/AppContext';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userData } from '../../../redux/User';

function Signup() {
  const dispatch = useDispatch(userData);
  const [email, setEmail] = useState('');
  const { setUserLoginStatus } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');  

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
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
            name="name"
            required={true}
            placeholder="Username"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            required={true}
            minLength={10}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            placeholder="Ph:8137020393"
            defaultValue="Phone"
          />
          <br />
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
            required={true}
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
            required={true}
            placeholder="Password"
            minLength={6}
          />
          <br />
          <br />
          <button className="loginButton">Login</button>
        </form>

        <span onClick={() => navigate('/login')}>Login</span>
      </div>
    </div>
  );
}

export default Signup;
