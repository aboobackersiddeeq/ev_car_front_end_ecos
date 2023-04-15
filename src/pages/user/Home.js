import React, { useState } from 'react';
import HeaderTwo from '../../components/header/HeaderTwo';
import '../../style/home.css';
import VideoPopupModal from '../../components/user-components/VideoPopupModal';

const Home = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <HeaderTwo />
      <div className="home-parent">
        <img className="nexonEv" src="../../../Images/nexonEv.jpg" alt="" />

        <img
          onClick={() => setOpen(true)}
          className="nexonEv"
          src="../../../Images/nexon-ev-max-video.jpg"
          alt=""
        />

        <VideoPopupModal setOpen={setOpen} isOpen={isOpen} />
        <img
          className="nexonEv"
          src="../../../Images/PeerformanceMax.png"
          alt=""
        />
      </div>
    </>
  );
};

export default Home;
