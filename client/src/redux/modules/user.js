const USER = 'user/USER';
/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const user = () => ({ type: USER });
/* 초기 상태 선언 */
const initialState = {
  user: {
    id: '',
    username: '',
    nickname: '',
    image: ''
  }
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function user(state = initialState, action) {
  switch (action.type) {
    case USER:
      return {
        ...state,
        user: state.user
      };
    default:
      return state;
  }
}
