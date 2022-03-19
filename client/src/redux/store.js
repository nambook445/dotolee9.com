import { createStore } from 'redux';

const initState = {
  isLogin: false,
  user: {
    id: '',
    username: '',
    nickname: '',
    image: ''
  },
  topic: {
    id: '',
    titile: '',
    description: '',
    created: '',
    image: '',
    userId: ''
  },
  selectedId: 1
};

function reducer(state = initState, action) {
  if (action.type === 'LOGIN') {
    return { ...state, isLogin: action.isLogin };
  }
  return state;
}

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
