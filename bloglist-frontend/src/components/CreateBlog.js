import React, { useState } from 'react'

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
      <form onSubmit={submit}>
        <div>
          <label>title</label>
          <input
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label>author</label>
          <input
            type="text"
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <label>url</label>
          <input
            type="text"
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog
