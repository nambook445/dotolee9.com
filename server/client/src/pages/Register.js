import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Stack } from '@mui/material';
// components
import Page from '../components/Page';
import { RegisterForm } from '../sections/authentication/register';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    pb: 0
  }
}));

export default function Register() {
  return (
    <RootStyle title="Register | DOTOLEE">
      <Container maxWidth="sm">
        <Stack sx={{ my: 1 }}>
          <Typography variant="h4" gutterBottom>
            회원가입
          </Typography>
        </Stack>
        <RegisterForm />
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
