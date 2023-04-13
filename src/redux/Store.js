import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // change to a storage engine of your choice

import adminReducer from './Admin';
import dealerReducer from './Dealer';
import productReducer from './Product';
import userReducer from './User';
import groupReducer from './Community';
import booleanReducer from './Boolean';
import loadingReducer from './Loading';

const rootReducer = combineReducers({
  admin: adminReducer,
  dealer: dealerReducer,
  product: productReducer,
  user: userReducer,
  group: groupReducer,
  boolean: booleanReducer,
  loading: loadingReducer,
});
const persistConfig = {
  key: 'root', // this is the key used to store the persisted state in storage
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);
export { store, persistor };
