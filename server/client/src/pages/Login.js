import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Stack, Link, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

export default function Login() {
  return (
    <RootStyle title="Login | DOTOLEE">
      <Container maxWidth="sm">
        <Stack sx={{ my: 1 }}>
          <Typography variant="h4" gutterBottom>
            LOGIN
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>ID: dotolee / Password: 111111</Typography>
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
