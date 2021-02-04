import React, { useContext, useState } from 'react';
import './Login.css';
import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../../utils/customHooks';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'

import { AuthContext } from '../../context/auth';

function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({});

    const { changeValues, submitForm, values } = useForm(logincallback, {
        username: "",
        password: "",
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, {data:{login:userData}}) {
            context.login(userData)
            props.history.push('/')
        }, onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        }, variables:values
    })

    function logincallback() {
        loginUser()
    }

    return (
        <div className="login">
            <Form onSubmit={submitForm} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                label="Username"
                placeholder="Username.."
                name="username"
                type="text"
                value={values.username}
                error={errors.username ? true : false}
                onChange={changeValues}
                />
                <Form.Input
                label="Password"
                placeholder="Password.."
                name="password"
                type="password"
                value={values.password}
                error={errors.password ? true : false}
                onChange={changeValues}
                />
                <Button type="submit" primary>
                Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    )
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login
