import React, { useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import axios from 'axios';

const Input = styled('input')({
  display: 'none'
});
async function handleUpload(e) {
  const formData = new FormData();
  formData.append('profile_image', e.target.files[0]);
  await axios
    .post('http://localhost:8080/profile', formData, { withCredentials: true })
    .then((res) => console.log(res))
    .catch((err) => console.log(err.response));
}
const state = '';
//mysql에 프로필사진 경로 등록하고 스테이트로 관리하기
const profileName = `http://localhost:8080/images/profile/${state}`;

export default function ProfilePhoto() {
  return (
    <Stack>
      <Avatar src={profileName} sx={{ width: 56, height: 56 }}></Avatar>
      <Box>
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            name="profile_img"
            type="file"
            onChange={handleUpload}
          />
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </Box>
    </Stack>
  );
}
