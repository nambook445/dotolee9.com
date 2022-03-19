import React, { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Typography,
  Button,
  Stack,
  TextField,
  Card,
  CardActions,
  CardContent,
  CardMedia
} from '@mui/material';
// SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { styled } from '@mui/material/styles';
// axios
import axios from 'axios';
// css
import './Paper.css';

// ----------------------------------------------------------------------
// //

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link'],
    [{ align: [] }, { color: [] }, { background: [] }]
  ]
};

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background'
];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function PaperPage() {
  const [desc, setdesc] = useState('');
  const [imgBase64, setImgBase64] = useState(null); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const Input = styled('input')({
    display: 'none'
  });
  // SweetAlert2
  const MySwal = withReactContent(Swal);
  function handleOnChange(value) {
    setdesc(value);
  }

  const handleChangeFile = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(e.target.files[0]); // 파일 상태 업데이트
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append('post_image', imgFile);
    data.set('title', e.target[0].value);
    data.set('description', desc);
    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    await axios
      .post('http://localhost:8080/api/paper', data, {
        withCredentials: true
      })
      .then((res) => {
        MySwal.fire({
          icon: 'success',
          title: '작성완료',
          showConfirmButton: false,
          timer: 1500
        }).then((document.location = 'http://localhost:3000/blog'));
      })
      .catch(
        (err) => console.log(err.response)
        // MySwal.fire({
        //   icon: 'error',
        //   title: JSON.stringify(err.response)
        // })
      );
  };
  // Enter키로 submit되는 상황방지
  const handleOnKeyPress = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <Page title="Dashboard: Paper | Minimal-UI">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" gutterBottom>
          Paper
        </Typography>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={handleChangeFile}
          />
          <Button variant="contained" component="span" startIcon={<Iconify icon="eva:plus-fill" />}>
            Image
          </Button>
        </label>
      </Stack>
      <Stack sx={{ alignItems: 'center' }}>
        <Card sx={{ width: '60vw', height: 'auto', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit} onKeyPress={handleOnKeyPress}>
            <CardMedia
              sx={{ width: '100%', height: 'auto' }}
              component="img"
              height="140"
              src={imgBase64}
            />
            <CardContent sx={{ py: 0 }}>
              <TextField
                id="standard-basic"
                label="Title"
                variant="standard"
                size="small"
                margin="normal"
                fullWidth
                autoComplete="off"
                autoFocus={true}
                color="grey"
                required
              />

              <ReactQuill
                style={{ height: 'auto' }}
                theme="snow"
                modules={modules}
                formats={formats}
                value={desc}
                required
                onChange={handleOnChange}
              />
            </CardContent>

            <CardActions sx={{ p: 0, my: 1, justifyContent: 'center' }}>
              <Button
                fullWidth
                size="small"
                type="submit"
                variant="contained"
                sx={{ width: '30%' }}
              >
                확인
              </Button>
            </CardActions>
          </form>
        </Card>
      </Stack>
    </Page>
  );
}
