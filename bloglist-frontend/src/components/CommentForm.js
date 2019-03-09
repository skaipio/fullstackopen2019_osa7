import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'semantic-ui-react'

const CommentForm = ({ onSubmit }) => {
  const submit = event => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (comment.length === 0) return
    onSubmit(comment)
  }

  return (
    <Form onSubmit={submit}>
      <Form.Field>
        <input type="text" name="comment" />
      </Form.Field>
      <Button type="submit">comment</Button>
    </Form>
  )
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default CommentForm
