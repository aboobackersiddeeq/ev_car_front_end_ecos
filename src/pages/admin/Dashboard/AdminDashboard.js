import React from 'react';
import AdminHeader from '../../../components/header/AdminHeader';
import '../../../style/adminDashboard.css';
import Footer from '../../../components/footer/Footer';
import Chart from '../../../components/admin -components/Chart';
const AdminDashboard = () => {
  return (
    <div>
      <div className="">
        <AdminHeader />
        <div className=" adminbody contantBody row">
          <div
            className="side-content-div col-lg-3"
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
              className="drive-what-is"
            >
              Drive What Drove Electric
            </div>
          </div>

          <div className="col-lg-9  bars-wraper  ">
            <div className="chart mt-4 ">
              <div className="  badgeButton ">
                <div className="notification-content">
                  <h1>$00</h1>
                  <smal>Today Bookings</smal>
                </div>
              </div>
              <div className="  badgeButton">
                <div className="notification-content">
                  <h1>$00</h1>
                  <smal>Today Test Drive Bookings</smal>
                </div>
              </div>
              <div className="  badgeButton">
                <div className="notification-content">
                  <h1>$00</h1>
                  <smal>Total Revenue</smal>
                </div>
              </div>
              <div className="  badgeButton">
                <div className="notification-content">
                  <h1>$00</h1>
                  <smal>Total Bookings</smal>
                </div>
              </div>
            </div>

            {/* <Chart /> */}
            <div className="chart mt-4   ">
              {' '}
              <Chart />
            </div>
            <div className="chart mt-4   ">
              {' '}
              <Chart />
            </div>
          </div>
        </div>
      </div>
          <Footer />
    </div>
  );
};

export default AdminDashboard;
