import React from 'react';
import AdminHeader from '../../../components/header/AdminHeader';
import '../../../style/adminDashboard.css';
import Button from 'react-bootstrap/Button';
import Footer from '../../../components/footer/Footer';
const AdminDashboard = () => {
  return (
    <div>
      <div className="">
        <AdminHeader />
        <div className=" adminbody contantBody row">
          <div
            className="side-content-div col-md-2"
            style={{ position: 'fixed' }}
          >
            <img
              className="admincar-img"
              src="../../../Images/admincar.webp"
              alt=""
            />
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff',
                fontSize: '2rem',
              }}
            >
              Drive What Drove Electric
            </div>
          </div>

          <div className="col-md-9 mr-left">
            <Button className="badgeButton" variant="primary">
              Today Bookings{' '}
              {/* <Badge className="badge" bg="dark">
              94
            </Badge> */}
              <span className="visually-hidden">unread messages</span>
            </Button>
            <Button className="badgeButton" variant="info">
              Test Drive Bookings{' '}
              {/* <Badge className="badge" bg="dark">
              90
            </Badge> */}
              <span className="visually-hidden">unread messages</span>
            </Button>
            <Button className="badgeButton" variant="success">
              Total Bookings{' '}
              {/* <Badge className="badge" bg="dark">
              130000
            </Badge> */}
              <span className="visually-hidden">unread messages</span>
            </Button>
            <Button className="badgeButton" variant="success">
              Total Bookings{' '}
              {/* <Badge className="badge" bg="dark">
              9000
            </Badge> */}
              <span className="visually-hidden">unread messages</span>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
