import React from 'react'
import { Form , Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin, username, password }) => {

  /*const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = loginService.login(username.value, password.value)
      window.localStorage.setItem(
        'logged', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setErrorMessage(`Käyttäjä ${username.value} kirjautunut`)
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    } catch (exception){
      console.log(exception)
      username.reset()
      password.reset()
      setErrorMessage('Virheellinen käyttäjätunnus tai salasana')
      setTimeout(() => {
        setErrorMessage('')
      }, 4000)
    }
  }*/

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