import { Avatar, Button, TextField } from '@mui/material';
import { Close, Edit, EditOutlined, Send } from '@mui/icons-material';
import axios from '../../axios/axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../style/profile.css';
import { toast } from 'react-hot-toast';
import { dealerLogin } from '../../redux/Dealer';
import { baseUrl } from '../../constants/BaseURL';
const Profile = ({ setProfileShow }) => {
  const dispatch = useDispatch();
  const dealer = useSelector((state) => state.dealer.value);
  const [image, setImage] = useState('');
  const [editName, setEditName] = useState(dealer.result.dealerName);
  const [formError, setError] = useState('');

  const [otp, setOtp] = useState();
  const [nameOpen, setNameOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [Cpassword, setCPassword] = useState('');
  const [otpVerify, setOtpVerify] = useState(false);
  const editHandle = () => {
    try {
      if (!editName) {
        toast.error('Name is required');
      } else if (!editName.trim()) {
        toast.error('Please Enter Valid Name');
      } else {
        axios
          .post(
            '/dealer/update-dealer',
            { img: image, id: dealer.result._id, dealerName: editName },
            {
              headers: {
                'x-access-dealertoken': localStorage.getItem('dealertoken'),
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          .then((response) => {
            if (response.data.status === 'success') {
              dispatch(dealerLogin(response.data));
              setImage('');
              setNameOpen(false);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            toast.error(error.message, 'Network error');
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim() === '' && !Cpassword.trim() === '') {
      setError('Feild is requried');
    } else if (password !== Cpassword) {
      setError('Passwords do not match');
    } else if (password.length < 6) {
      setError('min length of password is 6');
    } else {
      setError('');

      try {
        if (!dealer.result.email) {
          toast.error('Authentication failed');
        } else {
          axios
            .post(
              '/dealer/password-update',
              { id: dealer.result._id, email: dealer.result.email, password },
              {
                headers: {
                  'x-access-dealertoken': localStorage.getItem('dealertoken'),
                },
              }
            )
            .then((response) => {
              if (response.data.status === 'success') {
                toast.success(response.data.message);
                setOtpVerify(false);
              } else {
                toast.error(response.data.message);
              }
            })
            .catch((error) => {
              toast.error(error.message, 'Network error');
            });
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const otpSend = () => {
    try {
      if (!dealer.result.email) {
        toast.error('Authentication failed');
      } else {
        axios
          .post(
            '/dealer/otp',
            { id: dealer.result._id, email: dealer.result.email },
            {
              headers: {
                'x-access-dealertoken': localStorage.getItem('dealertoken'),
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          .then((response) => {
            if (response.data.status === 'success') {
              toast.success(response.data.message);
              setResetOpen(false);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            toast.error(error.message, 'Network error');
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const verifyOtp = () => {
    try {
      if (!dealer.result.email) {
        toast.error('Authentication failed');
      } else {
        axios
          .post(
            '/dealer/verify-otp',
            { id: dealer.result._id, email: dealer.result.email, otp },
            {
              headers: {
                'x-access-dealertoken': localStorage.getItem('dealertoken'),
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          .then((response) => {
            if (response.data.status === 'success') {
              toast.success(response.data.message);
              setResetOpen(false);
              setOtpOpen(false);
              setOtpVerify(true);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            toast.error(error.message, 'Network error');
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const oldPasswordChecking = () => {
    try {
      if (!oldPassword) {
        toast.error('Password is required');
      }
      if (!dealer.result.email) {
        toast.error('Authetication failed');
      } else if (!oldPassword.trim()) {
        toast.error('Password is required');
      } else {
        axios
          .post(
            '/dealer/old-password',
            { email: dealer.result.email, password: oldPassword },
            {
              headers: {
                'x-access-dealertoken': localStorage.getItem('dealertoken'),
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          .then((response) => {
            if (response.data.status === 'success') {
              toast.success(response.data.message);
              setOldPassword('');
              setPassOpen(false);
              setOtpVerify(true);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            toast.error(error.message, 'Network error');
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
    <div className="bg-white profile_body">
      <p className="profile_close_icon" onClick={() => setProfileShow(false)}>
        <Close />
      </p>

      <h4> Delear</h4>
      <label htmlFor="fileInput">
        <div className="profile_content">
          <Avatar
            alt="Remy Sharp"
            src={
              image
                ? URL.createObjectURL(image)
                : `${baseUrl}${dealer.result.image}
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
          {dealer.result.dealerName}
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
      <p>{dealer.result.email}</p>
      <p className="dealer_state">
        {dealer.result.city},{dealer.result.state}
      </p>
      {nameOpen || image ? (
        <button onClick={editHandle} className="btn btn-success">
          Save
        </button>
      ) : (
        ''
      )}
      {!nameOpen && (
        <p
          onClick={() => {
            setResetOpen(true);
          }}
        >
          Reset password <Edit />
        </p>
      )}
      {resetOpen && !nameOpen && (
        <>
          <Button
            variant="text"
            onClick={() => {
              setOtpOpen(true);
              otpSend();
              setPassOpen(false);
            }}
            onDoubleClick={() => {
              setOtpOpen(false);
            }}
          >
            Get verification code
          </Button>
          <Button
            variant="text"
            onClick={() => {
              setPassOpen(true);
              setOtpOpen(false);
            }}
            onDoubleClick={() => {
              setPassOpen(false);
            }}
          >
            Enter your Password
          </Button>
        </>
      )}
      {otpOpen && !nameOpen && !passOpen && (
        <>
          <TextField
            id="standard-basic"
            onChange={(e) => setOtp(e.target.value)}
            label="Otp"
            variant="standard"
            value={otp}
          />
          <Button
            onClick={verifyOtp}
            variant="contained"
            className="mt-3"
            endIcon={<Send />}
          >
            Send
          </Button>
        </>
      )}
      {passOpen && !nameOpen && !otpOpen && (
        <>
          <TextField
            id="standard-basic"
            onChange={(e) => setOldPassword(e.target.value)}
            label="Password"
            variant="standard"
            value={oldPassword}
            required
          />
          <Button
            onClick={oldPasswordChecking}
            variant="contained"
            className="mt-3"
            endIcon={<Send />}
          >
            Send
          </Button>
        </>
      )}
      {otpVerify && !nameOpen && (
        <>
          <form onSubmit={handleSubmit}>
            <TextField
              id="standard-basic"
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="text"
              variant="standard"
              value={password}
            />
            <TextField
              id="standard-basic"
              onChange={(e) => setCPassword(e.target.value)}
              variant="standard"
              label="Confirm Password"
              type="text"
              value={Cpassword}
            />
            {formError && <div style={{ color: 'red' }}>{formError}</div>}
            <Button
              type="submit"
              className="mt-3"
              variant="contained"
              endIcon={<Send />}
            >
              Send
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;
