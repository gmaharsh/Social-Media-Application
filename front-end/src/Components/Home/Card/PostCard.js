import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Popup } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';
import LikeButton from '../LikeButton/LikeButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import MyPopup from '../../../utils/MyPopup';

function PostCard({ post: { body, createdAt, id, username, likeCount, likes, commentCount } }) {
    const { user } =useContext(AuthContext) 

    // const likePost = () => {
    //     console.log('Liked post')
    // }

    // const commentonPost = () => {
    //     console.log("Commented")
    // }

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
                <Card.Content extra style={{ display: 'flex'}}>
                    <Popup content="Like Post" trigger={
                        <LikeButton user={user} post={{ id, likes, likeCount }} />
                    } />
                    <MyPopup content="Comment on Post">
                        <Button as='div' labelPosition='right'>
                            <Button color="blue" basic>
                                <Icon name='comments' />
                                Comment
                            </Button>
                            <Label basic color="blue" pointing="left">
                                {commentCount}
                            </Label>
                        </Button>
                    </MyPopup>
                    {user && user.username === username && <DeleteButton postId={id} />}
                </Card.Content>
            </Card>
        </div>
    )
}

export default PostCard
