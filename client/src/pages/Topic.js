import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
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

export default function TopicPage() {
  const [status, setStatus] = useState(false);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imageFileNameFromServer, setImageFileNameFromServer] = useState('');
  const [imageUpdate, setImageUpdate] = useState(false);
  const [imgBase64, setImgBase64] = useState(null); // image파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const params = useParams();
  // SweetAlert2
  const MySwal = withReactContent(Swal);

  useEffect(async () => {
    await axios
      .post('http://localhost:8080/api/topic', params, {
        withCredentials: true
      })
      .then((res) => {
        setId(res.data[0].id);
        setTitle(res.data[0].title);
        handleOnChange(res.data[0].description);
        setImageFileNameFromServer(res.data[0].image);
      })
      .catch((err) => err.response);
  }, []);
  console.log(title);
  const Input = styled('input')({
    display: 'none'
  });

  function handleOnChange(value) {
    setDesc(value);
  }

  const handleChangeFile = (e) => {
    e.preventDefault();
    setStatus(true);
    setImageUpdate(true);
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('post_image', imgFile);
    data.set('id', id);
    data.set('title', e.target[0].value);
    data.set('description', desc);
    data.set('imageFileNameFromServer', imageFileNameFromServer);

    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    await axios
      .put('http://localhost:8080/api/topic', data, {
        withCredentials: true
      })
      .then((res) => {
        console.log(res);
        // MySwal.fire({
        //   icon: 'success',
        //   title: '수정완료',
        //   showConfirmButton: false,
        //   timer: 1500
        // }).then((document.location = 'http://localhost:3000/blog'));
      })
      .catch(
        (err) => console.log(err.response)
        // MySwal.fire({
        //   icon: 'error',
        //   title: JSON.stringify(err.response)
        // })
      );
  };

  function CardImage(props) {
    if (imageFileNameFromServer !== null) {
      return (
        <CardMedia
          sx={{ width: '100%', height: 'auto' }}
          component="img"
          height="140"
          src={
            props.status && props.imageUpdate
              ? props.imgBase64
              : `http://localhost:8080/images/post/${imageFileNameFromServer}`
          }
        />
      );
    } else {
      return (
        <CardMedia
          sx={{ width: '100%', height: 'auto' }}
          component="img"
          height="140"
          src={imgBase64}
        />
      );
    }
  }

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
          <form key={id} onSubmit={handleSubmit} onKeyPress={handleOnKeyPress}>
            <CardImage
              imageUpdate={imageUpdate}
              imgBase64={imgBase64}
              status={status}
              imageFileNameFromServer={imageFileNameFromServer}
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
                color="grey"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
