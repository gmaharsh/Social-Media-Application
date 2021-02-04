import React, { useContext } from 'react'
import './Home.css';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';
import Card from './Card/PostCard';
import { AuthContext } from '../../context/auth';
import PostForm from './PostForm/PostForm';
import { FETCH_POSTS_QUERY } from '../../utils/graphql'

function Home() {
    const { loading, data} = useQuery(FETCH_POSTS_QUERY);
    const { user } =useContext(AuthContext) 
    // console.log(data)
    return (
        <div>
            <Grid columns={3} divided >
                <Grid.Row className="page_title">
                    <h1>Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                    )}
                    {loading ? (
                    <h1>Loading posts..</h1>
                    ) : (
                    <Transition.Group>
                        {data &&
                        data.getPosts.map((post) => (
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
