import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/FirebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AppContext } from './context/AppContext';
import axios from './axios/axios';
import { adminlogin } from './redux/admin';
import { useDispatch } from 'react-redux';
import AdminRouters from './routers/AdminRouters';
import UserRouters from './routers/UserRouters';
import DealerRouters from './routers/DealerRouters';
import { Toaster } from 'react-hot-toast';

function App() {
  const [adminLoginStatus, setAdminLoginStatus] = useState(false);
  const [dealerLoginStatus, setDealerLoginStatus] = useState(false);
  const { setUser } = useContext(AuthContext);
  const dispatch = useDispatch(adminlogin);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (users) => {
      setUser(users);
    });
  });
  useEffect(() => {
    try {
      axios
        .get('/admin/isAdminAuth', {
          headers: {
            'x-access-admintoken': localStorage.getItem('admintoken'),
          },
        })
        .then((response) => {
          if (!response.data.auth) {
            setAdminLoginStatus(false);
          } else {
            setAdminLoginStatus(true);
            dispatch(adminlogin(response.data));
          }
        });
    } catch {}
  }, [adminLoginStatus, dispatch, setAdminLoginStatus]);

  return (
    <div>
      <AppContext.Provider
        value={{
          adminLoginStatus: adminLoginStatus,
          setAdminLoginStatus,
          dealerLoginStatus,
          setDealerLoginStatus,
        }}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <AdminRouters />
        <UserRouters />
        <DealerRouters />
      </AppContext.Provider>
    </div>
  );
}

export default App;
