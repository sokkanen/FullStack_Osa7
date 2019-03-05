import React, { useEffect } from 'react'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LogOutForm from './components/LogoutForm'
import Togglable from './components/Togglable'
import { setUser, logout } from './reducers/userReducer'
import { getAll } from './reducers/blogReducer'
import { connect } from 'react-redux'
import { Badge } from 'react-bootstrap'

const App = (props) => {
  const user = props.user

  useEffect(() => {
    const logged = window.localStorage.getItem('logged')
    if (logged){
      const user = JSON.parse(logged)
      props.setUser(user)
    } else {
      props.setUser(null)
    }
  },[])

  if (user === null){
    return (
      <div class="container">
        <h2>Blogs</h2>
        <Notification/>
        <Togglable buttonLabel='login'>
        <LoginForm/>
        </Togglable>
      </div>
    )
  }

  return (
    <div class="container">
      <h2><Badge variant="secondary">Blogs</Badge></h2>
      <Notification/>
      <div>
        <h5><Badge variant="info">{user.name} logged in </Badge></h5>
        <LogOutForm/>
        <NewBlogForm/>
        <BlogList/>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser,
  logout,
  getAll
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp