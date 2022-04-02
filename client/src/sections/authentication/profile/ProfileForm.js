import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// axios
import axios from 'axios';
// SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// component
import Iconify from '../../../components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
//----------------------------------------------------------------------
// import { connect } from 'react-redux';
//

export default function ProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userData);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // SweetAlert2
  const MySwal = withReactContent(Swal);

  //

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, 'ID는 6자리 이상이어야 합니다.')
      .max(20, '외우기 힘들텐데요!')
      .required('ID를 입력하세요.'),
    password: Yup.string()
      .min(6, '비밀번호는 6자리 이상이어야 합니다.')
      .max(20, '외우기 힘들텐데요!')
      .required('비밀번호를 입력하세요.'),
    newPassword: Yup.string()
      .min(6, '비밀번호는 6자리 이상이어야 합니다.')
      .max(20, '외우기 힘들텐데요!')
      .required('비밀번호를 입력하세요.'),
    nickname: Yup.string()
      .min(2, '2글자 이상이 필요합니다.')
      .max(15, '15글자 이하로 입력하세요.')
      .required('닉네임을 입력하세요.')
  });

  const formik = useFormik({
    initialValues: {
      username: user.username,
      password: '',
      newPassword: '',
      nickname: user.nickname
    },
    validationSchema: RegisterSchema,
    onSubmit: async (value) => {
      const data = {
        username: value.username,
        password: value.password,
        newPassword: value.newPassword,
        nickname: value.nickname
      };
      console.log(data);
      setIsSubmitting(true);
      await axios
        .put('http://localhost:8080/profile', data, {
          withCredentials: true
        })
        .then((res) => {
          dispatch({
            type: 'USER',
            user: {
              id: res.data.id,
              username: res.data.username,
              nickname: res.data.nickname,
              image: res.data.image
            }
          });
          dispatch({
            type: 'LOGIN',
            isLogin: true
          });
          MySwal.fire({
            icon: 'success',
            title: `수정됐습니다.`,
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/app', { replace: true });
        })
        .catch((err) => {
          setIsSubmitting(false);
          MySwal.fire({
            icon: 'error',
            title: JSON.stringify(err.response.data)
          });
        });
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField fullWidth type="text" label="ID" {...getFieldProps('username')} disabled />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Current-Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="New-Password"
            {...getFieldProps('newPassword')}
            error={Boolean(touched.passwordCheck && errors.passwordCheck)}
            helperText={touched.passwordCheck && errors.passwordCheck}
          />

          <TextField
            fullWidth
            autoComplete="nickname"
            type="text"
            label="NickName"
            {...getFieldProps('nickname')}
            error={Boolean(touched.nickname && errors.nickname)}
            helperText={touched.nickname && errors.nickname}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            정보 수정하기
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
