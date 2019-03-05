import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import '../index.css'

const Notification = (props) => {
  if (props.notification === ''){
    return null
  }
  return (
    <div>
      <Alert variant="info">
        <h3>{props.notification}</h3>
      </Alert>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification