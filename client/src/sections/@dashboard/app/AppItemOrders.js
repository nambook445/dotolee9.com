// material
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

export default function AppItemOrders({ topicLength }) {
  const text = () => {
    if (0 === topicLength) {
      return <Typography variant="h3">환영합니다!</Typography>;
    } else if (0 < topicLength < 4) {
      return <Typography variant="h3">작심삼일은 아니겠죠?</Typography>;
    } else if (3 < topicLength < 7) {
      return <Typography variant="h3">일주일을 넘겨보자</Typography>;
    } else if (6 < topicLength < 14) {
      return <Typography variant="h3">금연도 2주는 함</Typography>;
    } else if (13 < topicLength < 21) {
      return <Typography variant="h3">습관이 만들어지는 기간 21일!</Typography>;
    } else if (20 < topicLength < 28) {
      return <Typography variant="h3">곰도 100동안 마늘만 먹었습니다</Typography>;
    } else if (27 < topicLength < 40) {
      return <Typography variant="h3">보통사람이 아님</Typography>;
    } else if (39 < topicLength < 60) {
      return <Typography variant="h3">호랑이도 60일은 버텼습니다</Typography>;
    } else if (59 < topicLength < 70) {
      return <Typography variant="h3">이제 그만하시죠</Typography>;
    } else if (69 < topicLength < 80) {
      return <Typography variant="h3">이러다가 챌린지 성공할 듯?</Typography>;
    } else if (69 < topicLength < 80) {
      return <Typography variant="h3">이러다가 챌린지 성공할 듯?</Typography>;
    } else if (79 < topicLength < 90) {
      return <Typography variant="h3">대단히 어려운 일을 했음</Typography>;
    } else if (89 < topicLength < 100) {
      return <Typography variant="h3">고지가 눈 앞</Typography>;
    } else if (100 < topicLength) {
      return <Typography variant="h3">경지에 오른 자</Typography>;
    }
  };
  return (
    <RootStyle>
      {text()}
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        나의 등급
      </Typography>
    </RootStyle>
  );
}
