import React, { useContext, useState } from 'react';
import { firebaseContext } from '../../../context/FirebaseContext';
import swal from 'sweetalert';
import '../../../style/login.css';
import { collection, addDoc } from 'firebase/firestore/lite';
import axios from '../../../axios/axios'
import { AppContext } from '../../../context/AppContext';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Signup() {
  const [email, setEmail] = useState('');
  const { setUserLoginStatus, userLoginStatus } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { db } = useContext(firebaseContext);
  const Collection = collection(db, 'user');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      password === "" ||
      phone === "" ||
      email === "" ||
      name === ""
    ) {
      swal("sorry!", "All fields are required!", "error");
    }  else {
      try{
      axios
        .post("/signup", {
          username: name,
          email: email,
          password: password,
          phone,
        })
        .then((response) => {
         
          if (response.data.status === "success") {
            swal("SUCCESS", response.data.message, "success");
            localStorage.setItem('usertoken', response.data.token);
            setUserLoginStatus(true);
            navigate("/");
          } else {
            swal("OOPS", response.data.message, "error");
          }
        });
      }catch(error){
         toast(error.message)
      }
    }





    // let id;
    // const auth = getAuth();
    // console.log(auth);
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then(async (userCredential) => {
    //     await updateProfile(auth.currentUser, { displayName: name }).catch(
    //       (err) => swal(err)
    //     );
    //     id = userCredential.user;
    //   })
    //   .then(() => {
    //     addDoc(Collection, {
    //       userid: id.uid,
    //       name: name,
    //       phone: phone,
    //     });
    //   })
    //   .then(() => {
    //     navigate('/');
    //   })

    //   .catch((error) => {
    //     swal(error.message);
    //   });
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
