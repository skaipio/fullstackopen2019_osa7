import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Message} from 'semantic-ui-react'

const Notification = ({ content, type }) => {
  if (!content || content.length === 0) return null
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
    <Message
      success={type === 'success'}
      warning={type === 'error'}
    >
      {content}
    </Message>
  )
}

Notification.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string
}

const mapStateToProps = (state) => ({
  content: state.notification.content,
  type: state.notification.type
})

export default connect(mapStateToProps)(Notification)
