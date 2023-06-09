import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/header/AdminHeader';
import '../../style/adminDashboard.css';
import Footer from '../../components/footer/Footer';
import Chart from '../../components/admin -components/Chart';
import axios from '../../axios/axios';
import { toast } from 'react-hot-toast';
const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  useEffect(() => {
    try {
      axios
        .get('/admin/get-dashboard', {
          headers: {
            'x-access-admintoken': localStorage.getItem('admintoken'),
          },
        })
        .then((response) => {
          if (response.data.status === 'success') {
            setDashboardData(response.data);
          } else {
            toast.error(response.data.message);
          }
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);
  return (
    <div>
      <div className="">
        <AdminHeader />
        <div className=" adminbody contantBody row">
          <div
            className="side-content-div col-lg-3"
            style={{ position: 'fixed' }}
          >
            <img className="admincar-img" src="/blurred.jpg" alt="blurred" />
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: '40%',
                transform: 'translate(-50%, -50%)',
                color: '#fff',
                fontSize: '2.9rem',
                fontFamily: 'monospace',
                textAlign: 'center',
              }}
              className="drive-what-is"
            >
              <br />
              <br />
              <br />
              <img
                style={{
                  width: '175px',
                  height: '135px',
                  marginBottom: '30px',
                  marginLeft: '-20px',
                }}
                src="/ecos-side.png"
                alt="logo"
              />
              <br />
              Drive What Drove Electric
            </div>
          </div>

          <div className="col-lg-9  bars-wraper  ">
            <div className="chart mt-4 ">
              <div className="  badgeButton ">
                <div className="notification-content">
                  <h1>+{dashboardData.todayBookingCount}</h1>
                  <smal>Today Bookings</smal>
                </div>
              </div>
              <div className="  badgeButton">
                <div className="notification-content">
                  <h1>+{dashboardData.todayTestDriveCount}</h1>
                  <smal>Today Test Drive Bookings</smal>
                </div>
              </div>
              <div className="  badgeButton">
                <div className="notification-content">
                  <h1>$ {dashboardData.revenue}</h1>
                  <smal>Total Revenue</smal>
                </div>
              </div>
              <div className="  badgeButton">
                <div className="notification-content">
                  <h1>+{dashboardData.totalBooking}</h1>
                  <smal>Total Bookings</smal>
                </div>
              </div>
            </div>

            {/* <Chart /> */}
            <div className="chart mt-4   ">
              {' '}
              <Chart change={true} />
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
