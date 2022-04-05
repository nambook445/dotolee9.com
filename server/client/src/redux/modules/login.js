const LOGIN = 'LOGIN';
export const login = () => ({ type: LOGIN });

const initialState = {
  isLogin: false
};

/* 리듀서*/
export default function isLogined(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action
      };
    default:
      return state;
  }
}
