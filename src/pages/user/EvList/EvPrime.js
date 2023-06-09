import React from 'react';
import HeaderTwo from '../../../components/header/HeaderTwo';
import '../../../style/home.css';
import Footer from '../../../components/footer/home-footer/Footer';

const EvPrime = () => {
  return (
    <>
      <HeaderTwo />
      <div className="home-parent">
        <img className="nexonEv" src="../../../Images/nexonEv.jpg" alt="" />

 
        <img
          className="nexonEv"
          src="../../../Images/PeerformanceMax.png"
          alt=""
        />
      </div>
      <Footer/>
    </>
  );
};

export default EvPrime;
