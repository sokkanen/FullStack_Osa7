import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import useField from './hooks/useField'
import useResource from './hooks/useResource'
import { Table, Button, Badge } from 'react-bootstrap'

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const username = useField('text')
  const password = useField('password')
  const blogurl = useField('text')
  const blogauthor = useField('text')
  const blogname = useField('text')
  const [blogs, blogService] = useResource('/api/blogs')

  useEffect(() => {
    setTheBlogs()
  }, [])

  useEffect(() => {
    const logged = window.localStorage.getItem('logged')
    if (logged){
      const user = JSON.parse(logged)
      setUser(user)
      blogService.setToken(user.token)
    } else {
      setUser(null)
    }
  }, [])

  const setTheBlogs = (async () => {
    await blogService.getAll()
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username.value, password.value)
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
      username.reset()
      password.reset()
      setErrorMessage('Virheellinen käyttäjätunnus tai salasana')
      setTimeout(() => {
        setErrorMessage('')
      }, 4000)
    }
  }

  const logOutHandler = () => {
    window.localStorage.removeItem('logged')
    blogService.removeToken()
    setErrorMessage('Käyttäjä uloskirjautunut')
    setTimeout(() => {
      setErrorMessage('')
    }, 2000)
  }

  const logOutForm = () => (
    <form onSubmit={logOutHandler}>
      <div>
        <Button variant="danger" type="submit">logout</Button>
      </div>
    </form>
  )

  const newBlogHandler = async (event) => {
    event.preventDefault()
    const blog = {
      'title': blogname.value,
      'author': blogauthor.value,
      'url': blogurl.value,
      'likes': 0
    }
    try {
      await blogService.create(blog)
      setMessage(`A new blog ${blog.title} by ${blog.author} added`)
      setTheBlogs()
      setTimeout(() => {
        setMessage('')
      }, 4000)
    } catch (error) {
      setMessage(`Virhe uuden blogin luomisessa: ${error.message}`)
      setTimeout(() => {
        setMessage('')
      }, 4000)
    }
  }

  if (user === null){
    let { reset, ...name } = username
    let { reset: res, ...pass } = password
    return (
      <div class="container">
        <h2>blogs</h2>
        <Notification message = {errorMessage}/>
        <Togglable buttonLabel='login'>
          <LoginForm
            handleLogin = {handleLogin}
            username = {name}
            password = {pass}/>
        </Togglable>
      </div>
    )
  }
  let { reset: a, ...name } = blogname
  let { reset: b, ...author } = blogauthor
  let { reset: c, ...url } = blogurl

  return (
    <div class="container">
      <h2><Badge variant="secondary">Blogs</Badge></h2>
      <Notification message = {errorMessage}/>
      <div>
        <h5><Badge variant="info">{user.name} logged in </Badge></h5>
        {logOutForm()}
        <NewBlogForm
          message = {message}
          newBlogHandler = {newBlogHandler}
          blogname = {name}
          blogauthor = {author}
          blogurl = {url}
        />
      </div>
      <Table hover>
        <tbody>
          <div className="bloglist">
            {blogs.map(blog => <tr key={blog.id}> 
              <td>
                <Blog key={blog.id} blog={blog} username={user.username}/>
              </td>
            </tr>
            )}
          </div>
        </tbody>
      </Table>
    </div>
  )
}

export default App