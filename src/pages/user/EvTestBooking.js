import React from "react";
import HeaderTwo from "../../component/header/HeaderTwo";
import "../user/EvList/evTestBooking.css";
const EvTestBooking = () => {
  return (
    <>
      <HeaderTwo />
      <div className="row bg-light">
        <div className="col-md-7 bg-light">
          <img
            className="nexonEv"
            src="../../../Images/book-drive-banner1.png"
            alt=""
          />
        </div>
        <div className=" col-md -5">
          <div className="   banner-side"></div>
        </div>
      </div>
    </>
  );
};

export default EvTestBooking;
