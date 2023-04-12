import { Avatar, IconButton } from '@mui/material';
import {
  ArrowDownward,
  // AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  // SearchOutlined,
  Send,
} from '@mui/icons-material';
import axios from '../../axios/axios';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import './chatcomponent.css';
import { toast } from 'react-hot-toast';
import { booleanSwitch } from '../../redux/Boolean';
import Picker from '@emoji-mart/react';
import { baseUrl } from '../../constants/BaseURL';
const ChatMain = ({ socket, setProfileShow }) => {
  const group = useSelector((state) => state.group.value);
  const user = useSelector((state) => state.user.value);
  const boolean = useSelector((state) => state.boolean);
  const dispatch = useDispatch();
  const messageRef = useRef(null);
  const [message, setMessage] = useState('');
  const [fullMsg, setFullMsg] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const sortedMessages = fullMsg.sort((a, b) => a.createdAt - b.createdAt);
  const today = new Date().toDateString();
  const groupedMessages = [];
  sortedMessages.forEach((message) => {
    const messageDate = new Date(message.createdAt).toDateString();
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    if (lastGroup && lastGroup.date === messageDate) {
      lastGroup.messages.push(message);
    } else {
      groupedMessages.push({ date: messageDate, messages: [message] });
    }
  });

  const scrollToDiv = () => {
    setImmediate(() =>
      messageRef.current?.scrollIntoView({ behavior: 'smooth' })
    );
  };
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
  }, [boolean, group, fullMsg]);
  useEffect(() => {
    setImmediate(() =>
      messageRef.current?.scrollIntoView({ behavior: 'smooth' })
    );
  }, [boolean]);
  return (
    <div className="chat-parent">
      <div className="chat_header">
        <div
          onClick={() => setProfileShow(true)}
          onDoubleClick={() => setProfileShow(false)}
        >
          <Avatar alt={group.name} src={`${baseUrl}${group.image}`} />
        </div>
        <div className="chat_headerInfo">
          <h3>{group.name}</h3>
          {group.members &&
            group.members.map((value) => <span>{value.name} ,</span>)}{' '}
          ...
        </div>

        <div className="chat_headerRight">
          {/* <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton> */}
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {groupedMessages.map((element) => (
          <div key={element.date}>
            <p className="chat_date">
              <span className=" px-2 py-1">
                {element.date === today ? 'Today' : element.date}
              </span>
            </p>

            {element.messages.map((value, index) => {
              if (value.name.id === user._id) {
                return (
                  <p key={value._id} className="chat_message chat_reciever">
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
                  </p>
                );
              } else {
                return (
                  <p key={value._id} className="chat_message  ">
                    <span className="chat_name">
                      {' '}
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
                  </p>
                );
              }
            })}
          </div>
        ))}
        <IconButton onClick={scrollToDiv} className="chat_arrowdownward">
          <ArrowDownward className="bg-white rounded-circle p-1" />
        </IconButton>
        <p className="pt-3"></p>
        <div ref={messageRef} />
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
