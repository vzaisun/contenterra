import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Card, CardContent, Typography, Link} from '@mui/material';


const RedditCard = styled(Card)({
  width: 300,
  backgroundColor: '#fff',
  margin: 20,
  padding: 15,
  borderRadius: 8,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const Title = styled(Typography)({
  color: '#333',
});

const Text = styled(Typography)({
  color: '#555',
});

const LinkStyled = styled(Link)({
  color: '#007bff',
  textDecoration: 'none',
});

const Score = styled(Typography)({
  color: '#28a745',
  fontWeight: 'bold',
});

const RedditPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from Reddit API
    fetch('https://www.reddit.com/r/reactjs.json')
      .then(response => response.json())
      .then(data => {
        // Extract relevant information from the API response
        const postsData = data.data.children.map(post => post.data);
        setPosts(postsData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
    <Typography variant="h4" align="center" gutterBottom>
        Contenterra
    </Typography>
    <hr/>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {posts.map(post => (
        <RedditCard key={post.id}>
          <CardContent>
            <Title variant="h6">{post.title}</Title>
            <Text variant="body2" dangerouslySetInnerHTML={{ __html: post.selftext_html }} />
            <Text variant="body2">
              <LinkStyled href={post.url} target="_blank" rel="noopener noreferrer">
                {post.url}
              </LinkStyled>
            </Text>
            <Score variant="body2">Score: {post.score}</Score>
          </CardContent>
        </RedditCard>
      ))}
    </div>
    </div>
  );
};

export default RedditPosts;
