import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Icon, Label } from 'semantic-ui-react';
import MyPopup from '../../../utils/MyPopup';

function LikeButton({user, post: { id, likeCount, likes }  }) {

    const [like, setLike] = useState(false)

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLike(true);
        } else setLike(false);

    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    });

    
    const likeButton = user ? (
        like ? (
            <Button color="teal">
                <Icon name="heart" />
            </Button>
        ) : (
                <Button color="teal" basic>
                    <Icon name="heart" />
                </Button>
            )
        ) : (
            <Button as={Link} to="/login" color="teal" basic>
                <Icon name="heart" />
            </Button>
        );

    return (
        <div className="LikeButton">
            <MyPopup content={like ?  'Unlike' : 'Like'} >
                <Button as="div" labelPosition="right" onClick={likePost}>
                    {likeButton}
                    <Label basic color="teal" pointing="left">
                    {likeCount}
                    </Label>
                </Button> 
            </MyPopup>
            
        </div>
    )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
