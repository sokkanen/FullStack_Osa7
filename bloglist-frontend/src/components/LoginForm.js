import React from 'react'
import { Form , Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin, username, password }) => {

  return (
    <form onSubmit={handleLogin}>
      <Form.Group>
        <div>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Control { ...username } type="text" name="username"/>
        </div>
        <div>
          <Form.Label>Password:</Form.Label>
          <Form.Control { ...password } type="password" name="password"/>
        </div>
        <Button variant="primary" type="submit">kirjaudu</Button>
      </Form.Group>
    </form>
  )
}

export default LoginForm

//