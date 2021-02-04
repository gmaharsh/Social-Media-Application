import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../../../utils/graphql';

function DeleteButton({postId, callback}) {

    const [confirmOpen, setConfirmOpen] = useState(false);
 

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            setConfirmOpen(false)
            //Todo: remove post from cache
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            data.getPosts = data.getPosts.filter(post => post.id !== postId)
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
            if (callback) {
                callback();
            }
        },
        variables: {
            postId
        }
    })

    return (

        <div>
            <Button as="div" color="red" float="right" onClick={() => setConfirmOpen(true)}>
                <Icon name="trash" style={{margin: 0}} />
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
            />
        </div>
    )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;


export default DeleteButton
