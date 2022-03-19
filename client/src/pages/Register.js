import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Stack } from '@mui/material';
// components
import Page from '../components/Page';
import { RegisterForm } from '../sections/authentication/register';

// import AuthSocial from '../sections/authentication/AuthSocial'; <AuthSocial /> Oauth용

// ----------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    pb: 0
  }
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="Register | Minimal-UI">
      <Container maxWidth="sm">
        <Stack sx={{ my: 1 }}>
          <Typography variant="h4" gutterBottom>
            회원가입
          </Typography>
        </Stack>

        <RegisterForm />

        <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 0 }}>
          By registering, I agree to Minimal&nbsp;
          <Link underline="always" color="textPrimary">
            가입약관
          </Link>
          &nbsp;and&nbsp;
          <Link underline="always" color="textPrimary">
            개인정보 관리 정책
          </Link>
          .
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            mt: 1,
            textAlign: 'center',
            display: { sm: 'none' }
          }}
        >
          Already have an account?&nbsp;
          <Link underline="hover" to="/login" component={RouterLink}>
            Login
          </Link>
        </Typography>
      </Container>
    </RootStyle>
  );
}
