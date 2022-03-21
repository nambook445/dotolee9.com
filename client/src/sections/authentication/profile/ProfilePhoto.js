import React from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, Stack, IconButton, Typography, Avatar, styled } from '@mui/material';
import axios from 'axios';

const Input = styled('input')({
  display: 'none'
});

//mysql에 프로필사진 경로 등록하고 스테이트로 관리하기

export default function ProfilePhoto({ image }) {
  const profileImage = `http://localhost:8080/images/profile/${image}`;
  async function handleUpload(e) {
    const formData = new FormData();
    formData.append('profile_image', e.target.files[0]);
    await axios
      .post('http://localhost:8080/profile', formData, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  }
  return (
    <Stack>
      <Typography sx={{ color: 'text.secondary' }}>프로필사진</Typography>
      <Avatar src={profileImage} sx={{ width: 56, height: 56 }}></Avatar>
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
