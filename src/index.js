import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/style/index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/Store';
import { BrowserRouter } from 'react-router-dom';
import { auth, provider, app, db } from './firebase/Firebase-config';
import { PersistGate } from 'redux-persist/integration/react';
import { createContext } from 'react';
const firebaseContext = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <firebaseContext.Provider value={{ auth, db, app, provider }}>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </firebaseContext.Provider>
  </React.StrictMode>
);
