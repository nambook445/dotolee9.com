// import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// Axios
import axios from 'axios';
// SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// component
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------
import { useDispatch } from 'react-redux';
import { SERVER } from '../../../utils/domain';

export default function LoginForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // SweetAlert2
  const MySwal = withReactContent(Swal);
  // formik remember 사용법은 아직...
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true
    },
    onSubmit: async (value) => {
      let data = {
        username: value.username,
        password: value.password
      };
      await axios
        .post(`${SERVER}/user/login`, data, {
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
        })
        .then(
          MySwal.fire({
            icon: 'success',
            title: '로그인 성공',
            showConfirmButton: false,
            timer: 1500
          }).then(navigate('/app', { replace: true }))
        )
        .catch((err) =>
          MySwal.fire({
            icon: 'error',
            title: JSON.stringify(err.response.data.message)
          })
        );
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="ID"
            autoFocus={true}
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="/404" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
