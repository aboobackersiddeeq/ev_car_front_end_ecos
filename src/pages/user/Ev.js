import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
 
import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { setUserDetails } from "../../features/userSlice";

function Profile() {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const [user,setUser]=useState('')
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
       
      },
      withCredentials: true,
    };

    try {
      const formData = new FormData();
      formData.append("img", image);
      const res = await axios.post(
        "http://localhost:3001/admin/add-post",
        formData,
        config
      );
      if (res.data.status) {
        // dispatch(
        //   setUserDetails({
        //     name: res.data.user.name,
        //     id: res.data.user._id,
        //     image: res.data.user.image,
        //   })
        // );
        // toast.success(res.data.message, {
        //   position: "top-center",
        // });
      } else {
        // toast.error(res.data.message, {
        //   position: "top-center",
        // });
      }
    } catch (err) {
      // toast.error("Something went wrong", {
      //   position: "top-center",
      // });
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     if (!cookie.jwt) {
  //       navigate("/");
  //     } else {
  //       const { data } = await axios.post(
  //         "http://localhost:4000",
  //         {},
  //         { withCredentials: true }
  //       );
  //       if (!data.status) {
  //         removeCookie("jwt");
  //         navigate("/");
  //       }
  //     }
  //   };
  //   verifyUser();
  // }, [cookie, navigate, removeCookie]);

  return (
    <div className="pCard_card">
      <div className="pCard_up">
        <img
          style={{ objectFit: "cover" }}
          width={"100%"}
          height={"100%"}
          src={
            image
              ? URL.createObjectURL(image) ?? ""
              : `http://localhost:4000/${user.image ? user.image.path : ""}`
          }
          alt=""
        />
        <div className="pCard_text">
          {/* <h2>{user.name}</h2> */}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="pCard_down btn-card d-flex justify-content-around flex-column ">
          <div class="mb-3">
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              name="image"
              class="form-control form-control-sm"
              id="formFileSm"
              type="file"
              multiple
            />
          </div>
          <div className="card-btn w-100 mt-2">
            <button
              onClick={() => {
                navigate("/home");
              }}
              class="file btn btn-lg btn-dark upload-btn "
            >
              Back
            </button>
            <button class="file btn-primary-shadow btn btn-lg btn-primary upload-btn ">
              Submit
            </button>
          </div>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Profile;