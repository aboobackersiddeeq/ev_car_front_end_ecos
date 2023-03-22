import React, { useState } from "react";
import { GoogleButton } from "react-google-button";
import { auth, provider } from "../../../firebase/Firebase-config";
import { signInWithPopup } from "firebase/auth";
import swal from "sweetalert";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const handleClick = () => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/");
    });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        swal("User not found");
      });
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
          <GoogleButton onClick={handleClick} id="signInDiv" />{" "}
        </div>

        <h6 className="or">
          <br /> Or <br />{" "}
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
            name="password"
            placeholder="Password"
            required
            minLength={6}
          />
          <br />
          <br />
          <button className="loginButton">Login</button>
        </form>
        <button onClick={navigate("/signup")}>Signup</button>
      </div>
    </div>
  );
}

export default Login;
