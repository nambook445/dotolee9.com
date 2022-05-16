import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
// material
import {
  Typography,
  Button,
  Stack,
  TextField,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Switch
} from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// quill editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// axios
import axios from 'axios';
// utils
import { SERVER } from '../utils/domain';
// css
import './Paper.css';

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
// SweetAlert2
const MySwal = withReactContent(Swal);
// CSS
const Input = styled('input')({
  display: 'none'
});

export default function TopicPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [status, setStatus] = useState(false);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imageFileNameFromServer, setImageFileNameFromServer] = useState('');
  const [userId, setUserId] = useState('');
  const [checked, setChecked] = useState(true);
  const [imageUpdate, setImageUpdate] = useState(false);
  const [imgBase64, setImgBase64] = useState(null); // image파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const { user } = useSelector((state) => state.userData);

  useEffect(() => {
    async function fetchData() {
      await axios
        .post(`${SERVER}/api/topic`, params, {
          withCredentials: true
        })
        .then((res) => {
          setId(res.data[0].id);
          setTitle(res.data[0].title);
          handleOnChange(res.data[0].description);
          setUserId(res.data[0].user_id);
          setImageFileNameFromServer(res.data[0].image);
        })
        .catch((err) => err.response);
    }
    fetchData();
  }, [params, userId, checked]);

  const handleOnChange = (value) => {
    setDesc(value);
  };

  const handleChangeFile = (e) => {
    e.preventDefault();
    function handleImage() {
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
    }
    handleImage();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function fetchData() {
      let data = new FormData();
      data.append('post_image', imgFile);
      data.set('id', id);
      data.set('title', e.target[0].value);
      data.set('description', desc);
      data.set('imageFileNameFromServer', imageFileNameFromServer);
      await axios
        .put(`${SERVER}/api/topic`, data, {
          withCredentials: true
        })
        .then((res) => {
          console.log(res);
          MySwal.fire({
            icon: 'success',
            title: '수정완료',
            showConfirmButton: false,
            timer: 1500
          }).then(navigate('/blog'));
        })
        .catch((err) =>
          MySwal.fire({
            icon: 'error',
            title: JSON.stringify(err.response)
          })
        );
    }
    fetchData();
  };

  function CardImage(props) {
    if (imageFileNameFromServer != null) {
      return (
        <CardMedia
          sx={{ width: '100%', height: 'auto' }}
          component="img"
          height="140"
          src={
            props.status && props.imageUpdate
              ? props.imgBase64
              : `${SERVER}/images/post/${imageFileNameFromServer}`
          }
        />
      );
    } else {
      return (
        <CardMedia
          sx={{ width: '100%', height: 'auto' }}
          component="img"
          height="140"
          src={`${SERVER}/images/post/null.jpg`}
        />
      );
    }
  }
  const handleDelete = (e) => {
    e.preventDefault();
    MySwal.fire({
      icon: 'warning',
      title: '정말 삭제하시겠습니까?',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33'
    })
      .then((result) => {
        console.log(result);
        if (result.isConfirmed) {
          const topicDelete = async () => {
            await axios
              .delete(`${SERVER}/api/topic`, {
                withCredentials: true,
                data: {
                  id: id
                }
              })
              .then((res) => {
                MySwal.fire({
                  icon: 'success',
                  title: '삭제완료',
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/blog', { replace: true });
              })
              .catch((err) => console.log(err.response));
          };
          return topicDelete();
        }
      })
      .catch((err) => err.response);
  };
  // Enter키로 submit되는 상황방지
  const handleOnKeyPress = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <Page title="Topic | DOTOLEE">
      <Container userId={userId}>
        {user.id === Number(userId) ? (
          <Switch checked={checked} onChange={() => setChecked(!checked)} />
        ) : (
          <Switch disabled />
        )}
        {user.id === Number(userId) && checked ? (
          <IconButton aria-label="delete" size="large">
            <DeleteIcon onClick={handleDelete} />
          </IconButton>
        ) : null}

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
            {user.id === Number(userId) && checked ? (
              <Button
                variant="contained"
                component="span"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Image
              </Button>
            ) : null}
          </label>
        </Stack>
        <Stack sx={{ alignItems: 'center' }}>
          <Card
            sx={{ width: '60vw', height: 'auto', justifyContent: 'center' }}
            checked={checked}
            userId={userId}
          >
            {user.id === Number(userId) && checked ? (
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
            ) : (
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
                    value={title}
                    disabled
                  />

                  <ReactQuill
                    style={{ height: 'auto' }}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={desc}
                    readOnly={true}
                  />
                </CardContent>

                <CardActions sx={{ p: 0, my: 1, justifyContent: 'center' }}></CardActions>
              </form>
            )}
          </Card>
        </Stack>
      </Container>
    </Page>
  );
}
