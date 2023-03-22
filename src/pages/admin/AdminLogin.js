import React, { useContext, useState} from "react";

import { GoogleButton } from "react-google-button";
import { auth, provider } from "../../firebase/Firebase-config";
import { signInWithPopup } from "firebase/auth";
import "../user/Login/Login.css"; 
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "../../axios/axios";
import { useDispatch } from "react-redux";
import { adminlogin } from "../../redux/Admin";
import { AppContext } from "../../context/AppContext";
function AdminLogin() {
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data);
    });
  };
  const dispatch = useDispatch(adminlogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAdminLoginStatus } = useContext(AppContext);
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/admin", { email, password })
      .then((response) => {
        if (!response.data.auth) {
          swal(response.data.message);
        } else {
          console.log(response.data);
          dispatch(adminlogin(response.data));
          localStorage.setItem("admintoken", response.data.token);
          swal("success", response.data.message, "success");

          setAdminLoginStatus(true);
          navigate("/admin");
        }
      })
      .catch((err) => {
        swal("sorry", err.message, "error");
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img alt="ecos-logo"
          width="200px"
          height="200px"
          className="logo"
          src="../../../Images/ecosLogo2.png"
        ></img>
        <h6> Admin Sign In</h6>
        {/* <br/> */}
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

export default AdminLogin;
