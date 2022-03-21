import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileForm from '../ProfileForm';
import ProfilePhoto from '../ProfilePhoto';
import axios from 'axios';

function ProfileContainer() {
  const { id, username, nickname, image } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const userData = (diff) => dispatch({type: 'USER', diff});
  useEffect(() => {
    async function server() {
      await axios
        .get('http://localhost:8080/api/profile')
        .then((res) =>
          dispatch({
            type: 'USER',
            user: {
              id: res.data[0].id,
              username: res.data[0].username,
              nickname: res.data[0].nickname,
              image: res.data[0].image
            }
          })
        )
        .catch((err) => console.log(err.response));
    }
    server();
  }, []);
  return (
    <div>
      <ProfilePhoto image={image} />
      <ProfileForm id={id} username={username} nickname={nickname} />
    </div>
  );
}
// id={id} username={username} nickname={nickname} userData={userData}
export default ProfileContainer;
