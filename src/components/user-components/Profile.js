import { Avatar, TextField } from '@material-ui/core';
import { Close, Edit, EditOutlined } from '@material-ui/icons';
import axios from '../../axios/axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../style/profile.css';
import { toast } from 'react-hot-toast';
import { selectionGroup } from '../../redux/Community';
import { baseUrl } from '../../constants/BaseURL';
import { useEffect } from 'react';
const Profile = ({ setProfileShow }) => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.group.value);
  const [image, setImage] = useState('');
  const [editName, setEditName] = useState(group.name);
  const [nameOpen, setNameOpen] = useState(false);
  useEffect(() => {
    setEditName(group.name);
  }, [group]);
  const editHandle = () => {
    try {
      if (!editName.trim()) {
        toast.error('Please Enter Valid Name');
      } else {
        axios
          .post(
            '/group/update-group',
            { img: image, id: group.id, groupName: editName },
            {
              headers: {
                'x-access-token': localStorage.getItem('usertoken'),
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          .then((response) => {
            if (response.data.status === 'success') {
              console.log(response.data);
              dispatch(
                selectionGroup({
                  id: response.data.result._id,
                  name: response.data.result.groupName,
                  members: response.data.result.members,
                  image: response.data.result.image,
                  admin: response.data.result.admin,
                })
              );
              // dispatch(selectionGroup(response.data.result));
              setImage('');
              setNameOpen(false);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // validate file
    if (!allowedExtensions.exec(selectedFile.name)) {
      toast.error('Please upload a PNG, JPG, or JPEG image.');
      setImage('');
      return;
    } else if (selectedFile.size > 1 * 1024 * 1024) {
      toast.error('Please upload a file smaller than 1MB.');
      setImage('');
      return;
    } else {
      setImage(selectedFile);
    }
  };

  return (
    <div className="bg-white profile_body_group">
      <p
        className="profile_close_icon"
        onClick={() => {
          setProfileShow(false);
        }}
      >
        <Close />
      </p>
      <label htmlFor="fileInput">
        <div className="profile_content">
          <Avatar
            alt={group.name}
            src={
              image
                ? URL.createObjectURL(image)
                : `${baseUrl}${group.image}
            `
            }
          />
          <EditOutlined className="icon" />
        </div>
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      {!nameOpen && (
        <h3
          onClick={() => {
            setNameOpen(true);
          }}
        >
          {group.name}
          <Edit />
        </h3>
      )}
      {nameOpen && (
        <TextField
          id="standard-basic"
          onChange={(e) => setEditName(e.target.value)}
          label="Name"
          variant="standard"
          value={editName}
        />
      )}
      <p> </p>
      {/*
      <p className="dealer_state">
         hh,members
      </p> */}

      {nameOpen || image ? (
        <button onClick={editHandle} className="btn btn-success ">
          Save
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Profile;
