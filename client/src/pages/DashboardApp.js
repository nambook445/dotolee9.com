import React, { useEffect, useState } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline
} from '../sections/@dashboard/app';

import axios from 'axios';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { isLogin } = useSelector((state) => state.isLogined);
  const { user } = useSelector((state) => state.userData);
  const [topic, setTopic] = useState([]);
  const [topicLength, setTopicLength] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const callTopicState = async () => {
      await axios
        .get('http://localhost:8080/api/topic', {
          withCredentials: true,
          data: {
            id: user.id
          }
        })
        .then((res) => {
          setTopic(res.data.topic);
          setTopicLength(Number(res.data.length));
          setStatus(true);
        })
        .catch((err) => err.response);
    };
    callTopicState();
  }, [user.id]);

  // 내림차순으로 정렬 원본 배열을 훼손하지 말자
  let descTopic = [...topic].sort(function (a, b) {
    return b.id - a.id;
  });

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          {isLogin ? (
            <Typography variant="h4">{user.nickname}</Typography>
          ) : (
            <Typography variant="h4">비회원</Typography>
          )}
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales topicLength={topicLength} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate topic={[...descTopic]} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
