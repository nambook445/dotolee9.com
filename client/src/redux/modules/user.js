const USER = 'USER';
export const user = () => ({ type: USER });

const initialState = {
  user: {
    id: '',
    username: '',
    nickname: '',
    image: ''
  }
};

/* 리듀서 */
export default function userData(state = initialState, action) {
  switch (action.type) {
    case USER:
      return {
        ...state,
        ...action
      };
    default:
      return state;
  }
}
