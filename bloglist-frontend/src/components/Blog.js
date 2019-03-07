import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const blogStyle = {
  padding: '0.5em',
  border: '1px solid grey',
  cursor: 'pointer'
}

const Blog = ({ blog, onLike, onRemove, userLoggedIn }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  const blogTitleWithAuthor = () => (
    <div>
      {blog.title} {blog.author}
    </div>
  )

  const compactBlog = () => (
    <div onClick={toggleExpanded} style={blogStyle} className="compact-blog">
      {blogTitleWithAuthor()}
    </div>
  )

  const removeButton = () => (
    <button onClick={() => onRemove(blog)}>remove</button>
  )

  const expandedBlog = () => (
    <div onClick={toggleExpanded} style={blogStyle} className="expanded-blog">
      {blogTitleWithAuthor()}
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes <button onClick={() => onLike(blog)}>like</button>
      </div>
      {blog.user ? <div>added by {blog.user.name}</div> : null}
      {blog.user &&
        blog.user.username === userLoggedIn.username &&
        removeButton()}
    </div>
  )

  return expanded ? expandedBlog() : compactBlog()
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userLoggedIn: state.userLoggedIn
})

export default connect(mapStateToProps)(Blog)
