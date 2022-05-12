import { createStore } from 'redux';
import reducer from './modules';

import { persistStore } from 'redux-persist';

const myReducer = reducer();
const store = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const persistor = persistStore(store);

export { persistor };

export default store;
