import React from 'react'
import { useField } from '../hooks/useField'
import { Form, Button } from 'semantic-ui-react'

const Login = ({ onLogin }) => {
  const username = useField('text')
  const password = useField('password')

  const submit = event => {
    event.preventDefault()
    onLogin(username.value, password.value)
    username.reset()
    password.reset()
  }

  return (
    <>
      <h2>Log in to application</h2>
      <Form onSubmit={submit} className="login-form">
        <Form.Field>
          <label>käyttäjätunnus</label>
          <input {...username.asInputProps()} />
        </Form.Field>
        <Form.Field>
          <label>salasana</label>
          <input {...password.asInputProps()} />
        </Form.Field>
        <Button type="submit">kirjaudu</Button>
      </Form>
    </>
  )
}

export default Login
