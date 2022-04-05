const TOPIC = 'TOPIC';
export const topic = () => ({ type: TOPIC });

const initialState = {
  topic: {
    title: '',
    description: '',
    created: '',
    nickname: '',
    userId: '',
    topicLength: ''
  }
};

/* 리듀서*/
export default function callTopic(state = initialState, action) {
  switch (action.type) {
    case TOPIC:
      return {
        ...state,
        ...action
      };
    default:
      return state;
  }
}
