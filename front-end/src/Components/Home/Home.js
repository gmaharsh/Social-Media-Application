import React from 'react'
import './Home.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid, Transition } from 'semantic-ui-react';
import Card from './Card/PostCard';

function Home() {
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
    }`;
    const { loading, data: { getPosts: posts } } = useQuery(FETCH_POSTS_QUERY);
    return (
        <div>
            <Grid columns={3} divided >
                <Grid.Row className="page_title">
                    <h1>Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {loading && <h1>Loading posts..</h1>}
                    {!loading && (
                        <Transition.Group>
                            {posts &&
                                posts.map((post) => (
                                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                <Card post={post} />
                                </Grid.Column>
                            ))}
                        </Transition.Group>
                    )}
                </Grid.Row>
            </Grid>
        </div>
    )
}



export default Home
