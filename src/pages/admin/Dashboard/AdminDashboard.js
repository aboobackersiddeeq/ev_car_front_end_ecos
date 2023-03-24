import React from 'react';
import AdminHeader from '../../../components/header/AdminHeader';
import '../../../style/adminDashboard.css';
import Button from 'react-bootstrap/Button';
import Footer from '../../../components/footer/Footer';
import Chart from '../../../components/admin -components/Chart';
const AdminDashboard = () => {
  return (
    <div>
      <div className="">
        <AdminHeader />
        <div className=" adminbody contantBody row">
          <div
            className="side-content-div col-md-3"
            style={{ position: 'fixed' }}
          >
            <img
              className="admincar-img"
              src="../../../Images/admincar.jpg"
              alt=""
            />
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff',
                fontSize: '2.2rem',
              }}
            >
              Drive  What Drove Electric
            </div>
          </div>

          <div className="col-md-9 mr-left">
            <div className="chart mt-4">
              <div className="  badgeButton">
                <div className="notification-content">
                  <h1>$00</h1>
                  <smal>Today Bookings</smal>
                </div>
              </div>
              <div className="  badgeButton">
                <div className="notification-content">
                  <h1>$00</h1>
                  <smal>Today Bookings</smal>
                </div>
              </div>
              <div className="  badgeButton">
                <div className="notification-content">
                  <h1>$00</h1>
                  <smal>Today Bookings</smal>
                </div>
              </div>
              <div className="  badgeButton">
                <div className="notification-content">
                  <h1>$00</h1>
                  <smal>Today Bookings</smal>
                </div>
              </div>
            </div>

            <Chart />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
