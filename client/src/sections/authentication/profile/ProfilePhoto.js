import React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// mui
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Card, Stack, IconButton, Avatar, styled } from '@mui/material';
import axios from 'axios';
// utils
import { SERVER } from '../../../utils/domain';
const Input = styled('input')({
  display: 'none'
});

export default function ProfilePhoto() {
  const { user } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const profileImage = `${SERVER}/images/profile/${user.image}`;
  async function handleUpload(e) {
    const formData = new FormData();
    formData.append('profile_image', e.target.files[0]);
    await axios
      .post(`${SERVER}/user/profile`, formData, { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch({
          type: 'USER',
          user: {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            image: res.data.fileName
          }
        });
      })
      .catch((err) => console.log(err.response));
  }
  return (
    <Card sx={{ height: '100%' }}>
      <Stack sx={{ height: '100%' }} justifyContent="space-between">
        <Avatar src={profileImage} sx={{ width: '100%', height: '80%' }}></Avatar>

        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            name="profile_img"
            type="file"
            onChange={handleUpload}
          />
          <Stack>
            <IconButton color="primary" aria-label="upload picture" component="span" size="large">
              <PhotoCamera />
            </IconButton>
          </Stack>
        </label>
      </Stack>
    </Card>
  );
}
