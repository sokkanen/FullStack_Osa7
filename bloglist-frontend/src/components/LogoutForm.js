import React from 'react'
import { Button } from 'react-bootstrap'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const LogOutForm = (props) => {

    const logOutHandler = () => {
        props.setNotification(`${props.user.username} logged out`, 5)
        props.logout()
    }

    return(
    <form onSubmit={logOutHandler}>
      <div>
        <Button variant="danger" type="submit">logout</Button>
      </div>
    </form>
    )
}

const mapDispatchToProps = {
    logout, 
    setNotification
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const ConnectedLogoutForm = connect(mapStateToProps, mapDispatchToProps)(LogOutForm)

export default ConnectedLogoutForm