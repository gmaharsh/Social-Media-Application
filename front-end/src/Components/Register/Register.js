import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './Register.css';
import { useForm } from '../../utils/customHooks';

function Register(props) {
    const [errors, setErrors] = useState({});

    const { changeValues, submitForm, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables:values
    })

    function registerUser() {
        addUser();
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
                    error={errors.username ? true : false}
                    //   error={errors.username ? true : false}
                    onChange={changeValues}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    //   error={errors.email ? true : false}
                    onChange={changeValues}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    //   error={errors.password ? true : false}
                    onChange={changeValues}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.password ? true : false}
                    //   error={errors.confirmPassword ? true : false}
                    onChange={changeValues}
                />
                <Button type="submit" primary>
                Register
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
