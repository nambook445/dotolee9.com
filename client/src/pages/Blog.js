import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPost } from '../sections/@dashboard/blog';

import axios from 'axios';

// ----------------------------------------------------------------------

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(false);
  useEffect(async () => {
    await axios
      .get('http://localhost:8080/api')
      .then((res) => setPosts(res.data))
      .then((res) => setStatus(true))
      .catch((err) => err.response);
  }, []);

  console.log(posts);
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
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
          {status &&
            posts.map((posts) => (
              <BlogPost
                key={posts.id}
                id={posts.id}
                title={posts.title}
                created={posts.created}
                image={posts.image}
                nickname={posts.nickname}
                profile={posts.profile}
              />
            ))}
        </Grid>
      </Container>
    </Page>
  );
}
