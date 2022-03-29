import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
//
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';

// date-fns
import { formatDistanceToNow, parseISO } from 'date-fns';

// ----------------------------------------------------------------------

// const NEWS = [...Array(5)].map((_, index) => {
//   const setIndex = index + 1;
//   return {
//     title: faker.name.title(),
//     description: faker.lorem.paragraphs(),
//     image: mockImgCover(setIndex),
//     postedAt: faker.date.soon()
//   };
// });

// ----------------------------------------------------------------------

// NewsItem.propTypes = {
//   news: PropTypes.object.isRequired
// };

function NewsItem(topic) {
  console.log(topic.created);
  return (
    <Stack>
      <Box sx={{ minWidth: 240 }}>
        <Link to={`/topic/${topic.id}`} color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {topic.title}
          </Typography>
        </Link>
      </Box>
      <Box>
        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
          {formatDistanceToNow(parseISO(topic.created), { addSuffix: true })}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function AppNewsUpdate(props) {
  const [topic, setTopic] = useState([]);
  const [topicLength, setTopicLength] = useState(5);

  useEffect(() => {
    setTopic(props.topic);
  }, [props.topic]);
  console.log(topic.length);

  function handleViewAll(e) {
    e.preventDefault();
    setTopicLength(topic.length);
  }

  return (
    <Card>
      <CardHeader title="New Update" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {topic.slice(0, topicLength).map((item) => (
            <NewsItem
              key={item.id}
              id={item.id}
              title={item.title}
              created={item.created}
              image={item.image}
            />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          onClick={handleViewAll}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
