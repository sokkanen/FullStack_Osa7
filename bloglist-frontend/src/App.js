import React, { useEffect } from 'react'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import LogOutForm from './components/LogoutForm'
import Togglable from './components/Togglable'
import User from './components/User'
import { setUser, logout } from './reducers/userReducer'
import { getAll } from './reducers/blogReducer'
import { connect } from 'react-redux'
import { Badge, Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = (props) => {
  const user = props.user
  const users = props.users

  useEffect(() => {
    const logged = window.localStorage.getItem('logged')
    if (logged){
      const user = JSON.parse(logged)
      props.setUser(user)
    } else {
      props.setUser(null)
    }
  },[])

  const userById = (id) => {
    return (
      users.find(u => u.id === id)
    )
  }

  const MainView = () => {
    if (user === null){
      return (
        <div className="container">
          <Notification/>
          <Togglable buttonLabel='login'>
            <LoginForm/>
          </Togglable>
        </div>
      )
    }
    return (
      <div className="container">
        <Notification/>
        <NewBlogForm/>
        <BlogList/>
      </div>
    )
  }

  const UsersView = () => {
    if (user === null){
      return (
        <div className="container">
          <Notification/>
          <Togglable buttonLabel='login'>
            <LoginForm/>
          </Togglable>
        </div>
      )
    }
    return (
      <div>
        <UserList/>
      </div>
    )
  }


  const linkPadding = { padding: 5, color: 'white' }

  const BlogAppNavBar = () => {
    if (user === null){
      return (
        <Navbar bg="dark" variant="dark "expand="lg">
          <Navbar.Brand href="/">BlogApp</Navbar.Brand>
        </Navbar>
      )
    }
    return (
      <div>
        <Navbar bg="dark" variant="dark "expand="lg">
          <Navbar.Brand href="/">BlogApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="menu">
              <div>
                <Link style={linkPadding} to="/">Blogs</Link>
                <Link style={linkPadding} to="/users">Users</Link>
              </div>
            </Nav>
          </Navbar.Collapse>
          <Badge variant="info">{user.name} logged in </Badge>
          <LogOutForm/>
        </Navbar>
      </div>
    )
  }

  return (
    <Router>
      <div className="container">
        <BlogAppNavBar/>
        <Route exact path="/" render={() => <MainView/>} />
        <Route exact path="/users" render={() => <UsersView />} />
        <Route exact path="/users/:id" render={({ match }) =>
          <User user={userById(match.params.id)} />
        } />
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  setUser,
  logout,
  getAll
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp