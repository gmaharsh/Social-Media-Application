import React from 'react';
import { Button, Card, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard({ post: { body, createdAt, id, username, likeCount, likes, commentCount } }) {
    
    const likePost = () => {
        console.log('Liked post')
    }

    const commentonPost = () => {
        console.log("Commented")
    }

    return (
        <div className="postCard">
            <Card fluid>
                <Card.Content>
                    {/* <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    /> */}
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta as ={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                    <Card.Description>{body}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button as='div' labelPosition='right' onClick={likePost}>
                        <Button color='teal'>
                            <Icon name='heart' />
                            Like
                        </Button>
                        <Label as='a' basic color='teal' pointing='left'>
                            {likeCount}
                        </Label>
                    </Button>
                    <Button as='div' labelPosition='right' onClick={commentonPost}>
                        <Button color='blue'>
                            <Icon name='comments' />
                            Comment
                        </Button>
                        <Label as='a' basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </Card.Content>
            </Card>
        </div>
    )
}

export default PostCard
