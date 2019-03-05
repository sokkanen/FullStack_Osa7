import React from 'react'
import { Button } from 'react-bootstrap'
import { logout } from '../reducers/userReducer'
import { connect } from 'react-redux'

const LogOutForm = (props) => {

    const logOutHandler = () => {
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
    logout
}

const ConnectedLogoutForm = connect(null, mapDispatchToProps)(LogOutForm)

export default ConnectedLogoutForm