import React from 'react'
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY } from '../../../utils/graphql'
import { useForm } from '../../../utils/customHooks';
import { useMutation } from '@apollo/react-hooks';

function PostForm() {

    const { values, changeValues, submitForm } = useForm(createPostcallback, {
        body:''
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            console.log(result)
            data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
            values.body = '';
        }
    });

    function createPostcallback() {
        createPost();
    }

    return (
        <Form onSubmit={submitForm}>
            <h2>Create a post:</h2>
            <Form.Field>
            <Form.Input
                placeholder="Hi World!"
                name="body"
                onChange={changeValues}
                value={values.body}
                // error={error ? true : false}
            />
            <Button type="submit" color="teal">
                Submit
            </Button>
            </Form.Field>
      </Form>
    )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm
