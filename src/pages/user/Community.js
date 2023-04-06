import React from 'react';
import ChatMain from '../../components/chatcomponents/ChatMain';
import Sidebar from '../../components/chatcomponents/Sidebar';
import '../../style/community.css';
import { io } from 'socket.io-client';
const Community = () => {
  const socket = io('http://localhost:3001');
  return (
    <div>
      <div className="app_community">
        <div className="app_body_community">
          <Sidebar />
          <ChatMain socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default Community;
