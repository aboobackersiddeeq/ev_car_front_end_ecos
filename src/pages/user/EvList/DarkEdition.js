import React from 'react';
import HeaderTwo from '../../../components/header/HeaderTwo';
import Footer from '../../../components/footer/home-footer/Footer';

const DarkEdition = () => {
  return (
    <>
      <HeaderTwo />
      <div className="home-parent">
        <img className="nexonEv" src="../../../Images/daskbanner.jpg" alt="" />
        <img
          className="nexonEv"
          src="../../../Images/PeerformanceMax.png"
          alt=""
        />
        {/* <div className="row">
          <div className="col-md-6">
            <h2>Drive what drove India electric!</h2>
          </div>
          <div className="col-md-6"></div>
        </div> */}
      </div>
      <Footer/>
    </>
  );
};

export default DarkEdition;
