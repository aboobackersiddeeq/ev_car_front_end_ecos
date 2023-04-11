import React from 'react';
import ChatMain from '../../components/chat-components/ChatMain';
import Sidebar from '../../components/chat-components/Sidebar';
import '../../style/community.css';
import { io } from 'socket.io-client';
import Profile from '../../components/user-components/Profile';
import { useState } from 'react';
const Community = () => {
  const socket = io('http://localhost:3001');
  const [profileShow, setProfileShow] = useState(false);
  return (
    <div className="app_community">
      <div className="app_body_community">
        <Sidebar />
        {profileShow && <Profile setProfileShow={setProfileShow} />}
        <ChatMain socket={socket} setProfileShow={setProfileShow} />
      </div>
    </div>
  );
};

export default Community;
