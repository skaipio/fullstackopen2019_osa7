import React from 'react'
import PropTypes from 'prop-types'

const CommentForm = ({onSubmit}) => {
  const submit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (comment.length === 0) return
    onSubmit(comment)
  }

  return (
    <form onSubmit={submit}>
      <input type="text" name="comment" />
      <button type="submit">comment</button>
    </form>
  )
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default CommentForm
