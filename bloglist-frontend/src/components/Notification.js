import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ text, type }) => {
  const successStyle = {
    border: '2px solid green',
    backgroundColor: '#e0ffd5',
    padding: '1em'
  }

  const errorStyle = {
    border: '2px solid red',
    backgroundColor: '#f1cccc',
    padding: '1em'
  }

  return (
    <div style={type === 'error' ? errorStyle : successStyle} className={{ success: type === 'success', error: type === 'error' }}>
      {text}
    </div>
  )
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string
}

export default Notification
