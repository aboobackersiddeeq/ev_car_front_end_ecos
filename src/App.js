


import "bootstrap/dist/css/bootstrap.min.css";
 
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/firebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
 
import { AppContext } from "./context/AppContext";
 
import axios from "./axios/axios";
import { adminlogin } from "./redux/admin";
import { useDispatch } from 'react-redux'; 
import AdminRouters from "./routers/AdminRouters";
import UserRouters from "./routers/UserRouters";
import DealerRouters from "./routers/DealerRouters";

function App() {
  const [adminLoginStatus, setAdminLoginStatus]=useState(false)
  const [dealerLoginStatus, setDealerLoginStatus]=useState(false)
  const {user,setUser}= useContext(AuthContext)
  const dispatch = useDispatch(adminlogin)
  useEffect(()=>{
    const auth=getAuth();
    onAuthStateChanged(auth,(users)=>{
      setUser(users)
      console.log(users);
    })
  })
  useEffect(()=>{
    axios.get('/admin/isAdminAuth',{
      headers:{'x-access-admintoken': localStorage.getItem('admintoken')}
    }).then((response)=>{
      console.log(response.data)
      if(!response.data.auth){
        
        setAdminLoginStatus(false)

        // navigate('/admin')

      } else{
        setAdminLoginStatus(true)
        dispatch(adminlogin(response.data))
      }
    })
  },[adminLoginStatus])

    return (
    <div>
      <AppContext.Provider value={{ adminLoginStatus:adminLoginStatus, setAdminLoginStatus
       ,dealerLoginStatus, setDealerLoginStatus}}>
        
        <AdminRouters />
        <UserRouters/>
        <DealerRouters/>
        
       
      </AppContext.Provider>
    </div>
      
  );
}

export default App;
