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

const LOGIN = 'LOGIN';
const USER = 'USER';
const TOPIC = 'TOPIC';

function login() {
  return {
    type: LOGIN
  };
}
function user() {
  return {
    type: USER
  };
}
function topic() {
  return {
    type: TOPIC
  };
}

function reducer(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action
      };
    case USER:
      return {
        ...state,
        ...action
      };
    case TOPIC:
      return {
        ...state,
        topic: state.topic
      };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log(store.getState()); // 현재 store 안에 들어있는 상태를 조회합니다.

// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
  const state = store.getState();
  console.log(state);
};

const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶을 때는 unsubscribe() 를 호출하면 됩니다.

// 액션들을 디스패치 해봅시다.
store.dispatch(login());
store.dispatch(user());
store.dispatch(topic());
export default store;
