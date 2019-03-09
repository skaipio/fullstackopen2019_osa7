import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'

const CreateBlog = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submit = async event => {
    event.preventDefault()
    const blogCreated = await handleCreate({
      title,
      author,
      url
    })
    if (blogCreated) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={submit}>
        <Form.Field>
          <label>title</label>
          <input
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>author</label>
          <input
            type="text"
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>url</label>
          <input
            type="text"
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </Form.Field>
        <div>
          <Button type="submit">create</Button>
        </div>
      </Form>
    </div>
  )
}

export default CreateBlog
