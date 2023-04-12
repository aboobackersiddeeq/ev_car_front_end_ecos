import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { AppContext } from './context/AppContext';
import AdminRouters from './routers/AdminRouters';
import UserRouters from './routers/UserRouters';
import DealerRouters from './routers/DealerRouters';
import { Toaster } from 'react-hot-toast';
// import ErrorBoundary from './components/error/ErrorBoundary';

function App() {
  const [adminLoginStatus, setAdminLoginStatus] = useState(false);
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [dealerLoginStatus, setDealerLoginStatus] = useState(false);
  const [bookingData, setBookingData] = useState({});
  

  return (
    <>
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
