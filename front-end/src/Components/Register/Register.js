import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './Register.css';

function Register() {

    const [values, setValue] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const changeValues = (event) => {
        setValue({...values, [event.target.name]: event.target.value})
    }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result)
        },
        variables:values
    })

    const submitForm = (event) => {
        event.preventDefault()
        addUser()
    }

    

    return (
        <div className="register">
            <Form onSubmit={submitForm} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    //   error={errors.username ? true : false}
                    onChange={changeValues}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="email"
                    value={values.email}
                    //   error={errors.email ? true : false}
                    onChange={changeValues}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    //   error={errors.password ? true : false}
                    onChange={changeValues}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    //   error={errors.confirmPassword ? true : false}
                    onChange={changeValues}
                />
                <Button type="submit" primary>
                Register
                </Button>
            </Form>
        </div>
    )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register
