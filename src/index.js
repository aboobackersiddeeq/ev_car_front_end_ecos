import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import adminReducer from "./redux/admin";
import dealerReducer from "./redux/Dealer";
import productReducer from "./redux/product";
import { BrowserRouter } from "react-router-dom";
import { firebaseContext } from "./context/firebaseContext";
import { auth, provider, app, db } from "./firebase/Firebase-config";
import Context from "./context/firebaseContext";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    admin: adminReducer,
    dealer: dealerReducer,
    product: productReducer,
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
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
