import React from 'react';
import HeaderTwo from '../../components/header/HeaderTwo';
import TestDriveForm from '../../components/user-components/TestDriveForm';
import '../../style/evTestBooking.css';
const EvTestBooking = () => {
  return (
    <div className="bg-light parent">
      <HeaderTwo />
      <div className="container-fluid  ">
        <div className="row">
          <div className="col-md-7 bg-light">
            <img
              className="nexonEv"
              src="../../../Images/book-drive-banner1.png"
              alt=""
            />
          </div>
          <div className=" col-md-5">
            <div className="col-md-2"></div>
            <div className="">
              <TestDriveForm />
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvTestBooking;
