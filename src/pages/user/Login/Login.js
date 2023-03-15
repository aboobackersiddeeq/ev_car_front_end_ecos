import React, { useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { GoogleButton } from 'react-google-button';
import { auth,provider } from '../../../firebase/Firebase-config';
import { signInWithPopup } from 'firebase/auth';

// import { firebaseContext } from '../../store/context';
// import Logo from '../../public/images/';
import "./Login.css";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const handleClick=()=>{
    signInWithPopup(auth,provider).then((data)=>{
      console.log(data);
    })
   }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate()
  // const {db} =useContext(firebaseContext)
  const handleLogin=(e)=>{      
    e.preventDefault()
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate('/')
      })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error.message)
     
  });
}
 
  return (
    <div>
      <div className="loginParentDiv">
        <img
          width="200px"
          height="200px"
          className="logo"
          src="../../../Images/ecosLogo2.png"
        ></img>
        <h6>Sign In</h6>
        <div className="googleButton"  ><GoogleButton onClick={handleClick} id="signInDiv"/> </div>
     
        <h6 className="or"><br/> Or <br/> </h6>

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

        {/* <a onClick={navigate('/signup')}>Signup</a> */}
      </div>
    </div>
  );
}

export default Login;
