// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProfileForm, ProfilePhoto } from '../sections/authentication/profile';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));
export default function Profile() {
  return (
    <RootStyle title="Register | Minimal-UI">
      <Container>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            회원 정보
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <ProfilePhoto />
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <ProfileForm />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
