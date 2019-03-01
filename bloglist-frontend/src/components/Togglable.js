import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVis = () => {
    setVisible(!visible)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <div style={hide}>
        <Button variant="primary" onClick={toggleVis}>{props.buttonLabel}</Button>
      </div>
      <div style={show}>
        {props.children}
        <Button variant="warning" onClick={toggleVis}>calcel</Button>
      </div>
    </div>
  )
}

export default Togglable