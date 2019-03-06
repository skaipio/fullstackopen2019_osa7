import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const setVisibility = (isVisible) => {
    setVisible(isVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      setVisibility
    }
  })

  return (
    <div style={showWhenVisible}>
      {props.children}
    </div>
  )
})

export default Togglable