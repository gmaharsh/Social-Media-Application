import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

function Register() {

    const [values, setValue] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const changeValues = (event) => {
        setValue({...values, [event.target.name]: event.target.value})
    }

    const submitForm = (event) => {
        event.preventDefault()
    }

    return (
        <div className="register">
            <Form onSubmit={submitForm}>
                <Form.Field>
                    <Form.Input 
                        label="Username"
                        placeholder="Username..."
                        name="username"
                        type="text"
                        values={values.username}
                        onChange={changeValues}
                    />
                    <Form.Input 
                        label="Email"
                        placeholder="Email..."
                        name="email"
                        type="email"
                        values={values.email}
                        onChange={changeValues}
                    />
                    <Form.Input 
                        label="Password"
                        placeholder="Password..."
                        name="password"
                        type="password"
                        values={values.password}
                        onChange={changeValues}
                    />
                    <Form.Input 
                        label="Confirm Password"
                        placeholder="Confirm Password..."
                        name="confirm password"
                        type="password"
                        values={values.confirmPassword}
                        onChange={changeValues}
                    />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default Register
