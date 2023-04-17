import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { AppContext } from './context/AppContext';
import AdminRouters from './routers/AdminRouters';
import UserRouters from './routers/UserRouters';
import DealerRouters from './routers/DealerRouters';
import { Toaster } from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
// import ErrorBoundary from './components/error/ErrorBoundary';

function App() {
  const [progress] = useState(0);
  const [adminLoginStatus, setAdminLoginStatus] = useState(false);
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [dealerLoginStatus, setDealerLoginStatus] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const loading = useSelector((state) => state.loading.loading);
  return (
    <>
      {loading && (
        <div className="spinner-parent">
          <CircularProgress variant="indeterminate" value={progress} />
        </div>
      )}
      <AppContext.Provider
        value={{
          adminLoginStatus: adminLoginStatus,
          setAdminLoginStatus,
          dealerLoginStatus,
          setDealerLoginStatus,
          bookingData,
          setBookingData,
          userLoginStatus,
          setUserLoginStatus,
        }}
      >
        {/* <ErrorBoundary> */}
        <Toaster position="top-center" reverseOrder={false} />

        <AdminRouters />
        <UserRouters />
        <DealerRouters />
        {/* </ErrorBoundary> */}
      </AppContext.Provider>
    </>
  );
}

export default App;
