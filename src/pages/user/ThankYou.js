import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderTwo from "../../components/header/HeaderTwo";
import "../../style/thank.css";

const ThankYou = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-light parent">
      <HeaderTwo />
      <div className="container-fluid th  ">
        <div className="row">
          <div className=" col-md-6 mt-5 pt-5  parent_thank">
            <div className="  mt-5 pt-5  parent_thank">
              <h2 className="pt-5 thank">Thank You </h2>
              <h5 className="congr">
                Congratulations! You've just signed up for an electrifying
                journey!
              </h5>
              <button className="btn_take" onClick={() => navigate("/")}>
                TAKE ME TO HOME PAGE
              </button>
            </div>
          </div>
          <div className="col-md-6 bg-light">
            <img
              className="nexonEv thank_ev"
              src="../../../Images/book-drive-banner1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
