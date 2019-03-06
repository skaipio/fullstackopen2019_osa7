import React from 'react'

const style = {
  border: '1px solid green',
  padding: '1em'
}

const Notification = ({content}) => {
  return (
    <p style={style}>
      {content}
    </p>
  )
}

export default Notification
