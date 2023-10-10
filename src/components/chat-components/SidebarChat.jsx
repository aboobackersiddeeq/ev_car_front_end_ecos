import { Avatar } from '@mui/material';
import axios from '../../axios/axios';
import React, { useEffect } from 'react';
import './sidebarChat.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import swal from 'sweetalert';
import { selectionGroup } from '../../redux/Community';
import { baseUrl } from '../../constants/BaseURL';
const SidebarChat = ({ joinBtnClick, setJoinBtnClick, newGroup }) => {
  const [groupData, setGroupData] = React.useState([]);
  const [groupUserData, setGroupUserData] = React.useState([]);
  const dispatch = useDispatch();
  const group =useSelector((state) => state.group.value)
  const user = useSelector((state) => state.user.value);
  const getgroup = () => {
    try {
      axios
        .post(
          '/group/get-group',
          { id: user._id },
          {
            headers: { 'x-access-token': localStorage.getItem('usertoken') },
          }
        )
        .then((response) => {
          if (response.data.status === 'success') {
            console.log(response.data.result);
            setGroupData(response.data.result);
          } else {
            swal('OOPS', response.data.message, 'error');
          }
        });
    } catch (error) {
      toast(error.message);
    }
  };
  const getUserGroup = () => {
    try {
      axios
        .post(
          '/group/get-user-group',
          { id: user._id },
          {
            headers: { 'x-access-token': localStorage.getItem('usertoken') },
          }
        )
        .then((response) => {
          if (response.data.status === 'success') {
            setGroupUserData(response.data.result);
          } else {
            swal('OOPS', response.data.message, 'error');
          }
        });
    } catch (error) {
      toast(error.message);
    }
  };
  useEffect(() => {
    getgroup();
    getUserGroup();
    // eslint-disable-next-line
  }, [newGroup,group]);
  const handleJoinGroupadding = (id, name) => {
    swal({
      title: 'Are you sure?',
      text: `Do you want join  ${name} community`,
      buttons: true,
    }).then((will) => {
      if (will) {
        try {
          axios
            .post(
              '/group/join-group',
              { userId: user._id, userName: user.username, groupId: id },
              {
                headers: {
                  'x-access-token': localStorage.getItem('usertoken'),
                },
              }
            )
            .then((response) => {
              if (response.data.status === 'success') {
                setGroupUserData(response.data.result);
              } else {
                swal('OOPS', response.data.message, 'error');
              }
            });
        } catch (error) {
          toast(error.message);
        }
        setJoinBtnClick(false);
      }
    });
  };
  const handleOpenGroup = (id, name, value) => {
    const members = value.members;
    const image =value.image
    dispatch(selectionGroup({ id, name, members,image, result: value }));
  };
  return (
    <div>
      {!joinBtnClick
        ? groupUserData &&
          groupUserData.map((value, index) => {
            return (
              <div
                key={value._id}
                className="sidebarChat"
                onClick={() =>
                  handleOpenGroup(
                    value._id,
                    value.groupName.charAt(0).toUpperCase() +
                      value?.groupName?.slice(1),
                    value
                  )
                }
              >
                <Avatar
                  alt={
                    (value.groupName.charAt(0).toUpperCase() +
                      value?.groupName?.slice(1))
                  }
                  src ={`${baseUrl}${value.image}`}
                />
                <div className="sidebarChat_info">
                  <h2>
                    {value.groupName.charAt(0).toUpperCase() +
                      value?.groupName?.slice(1)}
                  </h2>

                  <p>This is last message</p>
                </div>
              </div>
            );
          })
        : groupData &&
          groupData.map((value, index) => {
            return (
              <div
                key={value._id}
                className="sidebarChat"
                onClick={() =>
                  handleJoinGroupadding(
                    value._id,
                    value.groupName.charAt(0).toUpperCase() +
                      value?.groupName?.slice(1)
                  )
                }
              >
                <Avatar
                  alt={
                    (value.groupName.charAt(0).toUpperCase() +
                      value?.groupName?.slice(1))
                  }
                  src ={`${baseUrl}${value.image}`}
                />
                <div className="sidebarChat_info">
                  <h2>
                    {value.groupName.charAt(0).toUpperCase() +
                      value?.groupName?.slice(1)}
                  </h2>

                  <p>This is last message</p>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default SidebarChat;
