import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import isLogined from './login';
import userData from './user';

const persistConfig = {
  key: 'user',
  storage: storageSession,
  whitelist: ['isLogined', 'userData']
};

export default function reducer() {
  const rootReducer = combineReducers({ isLogined, userData });
  return persistReducer(persistConfig, rootReducer);
}
