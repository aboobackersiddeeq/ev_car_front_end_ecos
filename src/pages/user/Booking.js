import React, { useState } from 'react';
import Footer from '../../components/footer/home-footer/Footer';
import HeaderTwo from '../../components/header/HeaderTwo';
import BookingForm from '../../components/user-components/BookingForm';

const Booking = () => {
  const [image, setImage] = useState('');
  const handleChildData = (data) => {
    setImage(data);
  };
  return (
    <div className="main-div-booking">
      <div className="bg-light parent">
        <HeaderTwo />
        <div className="container-fluid  ">
          <div className="row">
            <div className="col-lg-7 bg-light nexonCarRound">
              <img className="nexonEv  " src={image} alt="" />
            </div>
            <div className=" col-lg-5">
              <div className="col-md-2"></div>
              <div className="">
                <BookingForm onData={handleChildData} />
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
