import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPost } from '../sections/@dashboard/blog';
// axios
import axios from 'axios';
// utils
import { SERVER } from '../utils/domain';
// ----------------------------------------------------------------------

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${SERVER}/api/blog`, {
        header: { 'Content-Type': 'application/json' }
      })
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => err.response);
  }, []);
  console.log(posts);

  return (
    <Page title="Blog | DOTOLEE">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/paper"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between"></Stack>
        <Grid container spacing={3}>
          {!loading &&
            posts.map((posts) => {
              return (
                <BlogPost
                  key={posts.id}
                  id={posts.id}
                  title={posts.title}
                  created={posts.created}
                  image={posts.image}
                  nickname={posts.nickname}
                  profile={posts.profile}
                />
              );
            })}
        </Grid>
      </Container>
    </Page>
  );
}
