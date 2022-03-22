import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import isLogined from './login';
import userData from './user';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['isLogined', 'userData']
};

export default function reducer() {
  const rootReducer = combineReducers({ isLogined, userData });
  return persistReducer(persistConfig, rootReducer);
}
