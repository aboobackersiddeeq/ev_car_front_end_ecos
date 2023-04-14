import React from 'react';
import ChatMain from '../../components/chat-components/ChatMain';
import Sidebar from '../../components/chat-components/Sidebar';
import '../../style/community.css';
import { io } from 'socket.io-client';
import Profile from '../../components/user-components/Profile';
import { useState } from 'react';
import { baseUrl } from '../../constants/BaseURL';
const Community = () => {
  const socket = io(baseUrl);
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
