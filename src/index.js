import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/style/index.css';
import App from './App';
import { Provider } from 'react-redux';
import adminReducer from './redux/Admin';
import dealerReducer from './redux/Dealer';
import productReducer from './redux/Product';
import userReducer from './redux/User';
import { BrowserRouter } from 'react-router-dom';
import { firebaseContext } from './context/FirebaseContext';
import { auth, provider, app, db } from './firebase/Firebase-config';
import Context from './context/FirebaseContext';
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: {
    admin: adminReducer,
    dealer: dealerReducer,
    product: productReducer,
    user:userReducer
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <firebaseContext.Provider value={{ auth, db, app, provider }}>
      <BrowserRouter>
        <Context>
          <Provider store={store}>
            <App />
          </Provider>
        </Context>
      </BrowserRouter>
    </firebaseContext.Provider>
  </React.StrictMode>
);
