import React, { useEffect, useState } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppCurrentVisits
} from '../sections/@dashboard/app';
// utils
import axios from 'axios';
import { SERVER } from '../utils/domain';
import { differenceInDays, parseISO } from 'date-fns';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { isLogin } = useSelector((state) => state.isLogined);
  const { user } = useSelector((state) => state.userData);
  const [topic, setTopic] = useState([]);
  const [topicLength, setTopicLength] = useState(0);
  const [succession, setSuccession] = useState(0);

  useEffect(() => {
    const callTopicState = async () => {
      await axios
        .get(`${SERVER}/api/topic`, {
          params: { id: user.id },
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => {
          let myData = res.data.topic.map((key) => key.created);
          setTopic(res.data.topic);
          setTopicLength(Number(res.data.length));
          setSuccession(() => {
            let j = 0;
            for (let i = 0; i < myData.length - 1; i++) {
              if (differenceInDays(parseISO(myData[i + 1]), parseISO(myData[i])) === 1) {
                j++;
              }
            }
            return j;
          });
        })
        .catch((err) => err.response);
    };
    callTopicState();
  }, [user, isLogin]); // eslint-disable-line

  let descTopic = [...topic].sort(function (a, b) {
    return b.id - a.id;
  });

  return (
    <Page title="Dashboard | DOTOLEE">
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
            <AppNewUsers succession={succession} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AppItemOrders topicLength={topicLength} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate topic={[...descTopic]} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits succession={succession} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
