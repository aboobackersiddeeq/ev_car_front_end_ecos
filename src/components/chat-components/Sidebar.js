import {
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from '@mui/material';
import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
  ArrowBack,
} from '@mui/icons-material';
import axios from '../../axios/axios';
import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import swal from 'sweetalert';
import './sidebar.css';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const user = useSelector((state) => state.user.value);
  const [joinBtnClick, setJoinBtnClick] = React.useState(false);
  const [newGroup, setNewGroup] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleNewGroupSubmit = () => {
    if (!newGroup || /^\s*$/.test(newGroup)) {
      toast.error('Please enter a valid name');
    } else if (!user) {
      toast.error('Somthing went worong ');
    } else {
      try {
        console.log(newGroup);

        axios
          .post(
            'group/new-group',
            { roomName: newGroup, adminName: user.username },
            {
              headers: { 'x-access-token': localStorage.getItem('usertoken') },
            }
          )
          .then((response) => {
            if (response.data.status === 'success') {
              swal('succsses');
              handleClose();
              setNewGroup('');
            } else {
              swal('OOPS', response.data.message, 'error');
            }
          })
          .catch((error) => {
            swal('OOPS', error.message, 'error');
          });
      } catch (error) {
        swal('error', error.message);
      }
    }
  };
  const handleJoin = () => {
    setJoinBtnClick(true);
  };
  const handleBack = () => {
    setJoinBtnClick(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        {joinBtnClick ? (
          <span onClick={handleBack} className="pt-2">
            <ArrowBack />
          </span>
        ) : (
          <div className="sidebar_headerLeft">
            <span onClick={() => navigate(-1)} className="pt-2">
              <ArrowBack />
            </span>
            <img   className='ecos-name pb-2 m-2 ' src="/ecos-name.png" alt="logo"/>
            {/* <Avatar src="" /> */}
          </div>
        )}

        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>

          <DropdownButton
            className="sidebar-dropdown-button"
            drop="down-centered"
            variant=""
            style={null}
            title={<MoreVert />}
          >
            <Dropdown.Item eventKey="1" onClick={handleJoin}>
              Join
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={handleClickOpen}>
              Create a group
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat
          joinBtnClick={joinBtnClick}
          setJoinBtnClick={setJoinBtnClick}
          newGroup={newGroup}
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            marginTop: '-2px',
            marginBottom: '-5px',
            fontWeight: '-moz-initial',
          }}
        >
          New group
        </DialogTitle>
        <DialogContent>
          <TextField
            style={{ marginTop: '-3px', marginBottom: '-2px' }}
            autoFocus
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            margin="dense"
            id="name"
            label="Group name"
            type="text"
            fullWidth
            required
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button style={{}} onClick={handleClose}>
            Cancel
          </Button>
          <Button style={{ color: 'blue' }} onClick={handleNewGroupSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;
