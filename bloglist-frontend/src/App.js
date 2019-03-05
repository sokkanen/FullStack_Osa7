import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import useField from './hooks/useField'
import { connect } from 'react-redux'
import { Table, Button, Badge } from 'react-bootstrap'

const App = (props) => {
  const [errorMessage, setErrorMessage] = useState('')
  const user = props.user
  const username = useField('text')
  const password = useField('password')
  const blogurl = useField('text')
  const blogauthor = useField('text')
  const blogname = useField('text')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
    .getAll()
    .then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  /*useEffect(() => {
    const logged = window.localStorage.getItem('logged')
    if (logged){
      const user = JSON.parse(logged)
      setUser(user)
      blogService.setToken(user.token)
    } else {
      setUser(null)
    }
  }, [])*/

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

  if (user === null){
    let { reset, ...name } = username
    let { reset: res, ...pass } = password
    return (
      <div class="container">
        <h2>blogs</h2>
        <Notification/>
        <Togglable buttonLabel='login'>
        <LoginForm/>
        </Togglable>
      </div>
    )
  }
  let { reset: a, ...name } = blogname
  let { reset: b, ...author } = blogauthor
  let { reset: c, ...url } = blogurl
  console.log('JYYYYYYYYYYYYYYYYSEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRR', user)

  return (
    <div class="container">
      <h2><Badge variant="secondary">Blogs</Badge></h2>
      <Notification/>
      <div>
        <h5><Badge variant="info">{user.name} logged in </Badge></h5>
        {logOutForm()}
        <NewBlogForm/>
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const ConnectedApp = connect(mapStateToProps)(App)

export default ConnectedApp