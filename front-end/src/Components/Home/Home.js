import React from 'react'
import './Home.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';
import Card from './Card/PostCard';

function Home() {
    const {loading, data: { getPosts: posts }} = useQuery(FETCH_POSTS_QUERY);

    console.log("Posts", posts);
    return (
        <div className="home">
            <Grid columns={3} divided>
                <Grid.Row>
                    <h1>Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {loading ? (
                        <h1>Loading Posts</h1>
                    ) : (
                            posts && posts.map(post => (
                            <Grid.Column key = {post.id} style = {{marginBottom:'20px'}}>
                                <Card post={post} />
                            </Grid.Column>
                        )) 
                    )}
                </Grid.Row>
            </Grid>
        </div>
    )
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home
