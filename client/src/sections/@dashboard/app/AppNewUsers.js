// material
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

// ----------------------------------------------------------------------

export default function AppNewUsers({ succession }) {
  return (
    <RootStyle>
      <Typography variant="h3">{succession}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        매일 글쓰기 기록
      </Typography>
    </RootStyle>
  );
}
