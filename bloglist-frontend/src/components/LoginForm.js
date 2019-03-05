import React from 'react'
import { Form , Button } from 'react-bootstrap'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'
import { connect } from 'react-redux'

const LoginForm = (props) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    const password = event.target.password.value
    const username = event.target.username.value
    event.target.username.value = ''
    event.target.password.value = ''
    await props.login(username, password)
    if (window.localStorage.getItem('logged') === null){
      props.setNotification('wrong username or password', 5)
    } else {
      props.setNotification(`${username} logged in`, 5)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Form.Group>
        <div>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Control type="text" name="username"/>
        </div>
        <div>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password"/>
        </div>
        <Button variant="primary" type="submit">kirjaudu</Button>
      </Form.Group>
    </form>
  )
}

const mapDispatchToProps = {
  setNotification,
  login
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm