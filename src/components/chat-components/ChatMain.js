import { Avatar, IconButton } from '@material-ui/core';
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
  Send,
} from '@material-ui/icons';
import axios from '../../axios/axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import './chatcomponent.css';
import { toast } from 'react-hot-toast';
import { booleanSwitch } from '../../redux/Boolean';
import Picker from '@emoji-mart/react';
const ChatMain = ({ socket }) => {
  const group = useSelector((state) => state.group.value);
  const user = useSelector((state) => state.user.value);
  const boolean = useSelector((state) => state.boolean);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [fullMsg, setFullMsg] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emoji) => {
    setMessage((prevInput) => prevInput + emoji.native);
    setShowPicker(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    dispatch(booleanSwitch());
    if (message.trim() && user) {
      socket.emit('messages', {
        text: message,
        name: { name: user.username, id: user._id },
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        groupId: group.id,
      });
      dispatch(booleanSwitch());
      setMessage('');
    } else {
      toast.error('Network error');
    }
  };
  useEffect(() => {
    try {
      if (group.id) {
        axios
          .post(
            '/group/get-messages',
            { groupId: group.id },
            {
              headers: { 'x-access-token': localStorage.getItem('usertoken') },
            }
          )
          .then((response) => {
            setFullMsg(response.data.result);
          })
          .catch((error) => {
            toast.error(error.massage, 'Network error');
          });
      }
    } catch (error) {
      swal(error.message);
    }
  }, [boolean, group.id, fullMsg]);
  return (
    <div className="chat-parent">
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3>{group.name}</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {fullMsg &&
          fullMsg.map((value, index) => {
            if (value.name.id === user._id) {
              return (
                <h6 className="chat_message chat_reciever">
                  <span className="chat_name">
                    {value.name.name.slice(0, 5)}
                  </span>
                  <span className="chat_text"> {value.text}</span>
                  <span className="chat_timestamp">
                    {new Date(Date.parse(value.createdAt))
                      .toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })
                      .split(' ')}
                  </span>
                </h6>
              );
            } else {
              return (
                <p className="chat_message  ">
                  <span className="chat_name">{value.name.name}</span>
                  <span className="chat_text"> {value.text}</span>
                  <span className="chat_timestamp">
                    {new Date(Date.parse(value.createdAt))
                      .toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })
                      .split(' ')}
                  </span>
                </p>
              );
            }
          })}
      </div>
      <div className="chat_footer">
        <div style={{ position: 'relative', top: '-191px' }}>
          {showPicker && (
            <Picker
              pickerStyle={{ width: '100%' }}
              onEmojiSelect={onEmojiClick}
            />
          )}
        </div>
        <InsertEmoticon
          style={{ fontSize: '46px' }}
          onClick={() => setShowPicker((val) => !val)}
        />

        <form>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          {message.trim() ? (
            <button type="submit" onClick={handleSendMessage}>
              <Send />
            </button>
          ) : (
            <Mic style={{ fontSize: '36px', paddingTop: '6px' }} />
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatMain;
