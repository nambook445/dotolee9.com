import { createStore } from 'redux';

const initState = {
  mode: 'wellcom',
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
  return state;
}

export default createStore(reducer);
