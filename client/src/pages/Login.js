import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';
// import AuthSocial from '../sections/authentication/AuthSocial'; <AuthSocial /> Oauth를사용한다면
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login | Minimal-UI">
      <Container maxWidth="sm">
        <Stack sx={{ my: 1 }}>
          <Typography variant="h4" gutterBottom>
            LOGIN
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>ID: admin / Password: 111111</Typography>
        </Stack>

        <LoginForm />

        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 3,
            display: { sm: 'none' }
          }}
        >
          Don’t have an account?&nbsp;
          <Link variant="subtitle2" component={RouterLink} to="register" underline="hover">
            Get started
          </Link>
        </Typography>
      </Container>
    </RootStyle>
  );
}
