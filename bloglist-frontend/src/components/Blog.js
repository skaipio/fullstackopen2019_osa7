import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  removeBlogByIdAction,
  likeBlogAction,
  initializeBlogsAction
} from '../reducers/blogs'

const Blog = ({
  blog,
  initializeBlogs,
  removeBlog,
  likeBlog,
  userLoggedIn
}) => {
  useEffect(() => {
    if (!blog) {
      initializeBlogs()
    }
  }, [])

  if (!blog) return null

  const blogTitleWithAuthor = () => (
    <h2>
      {blog.title} {blog.author}
    </h2>
  )

  const removeButton = () => (
    <button onClick={() => removeBlog(blog.id)}>remove</button>
  )

  const renderComments = () => (
    <ul>
      {blog.comments.map(comment => (
        <li key={comment}>{comment}</li>
      ))}
    </ul>
  )

  return (
    <div>
      {blogTitleWithAuthor()}
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes <button onClick={() => likeBlog(blog)}>like</button>
      </div>
      {blog.user && <div>added by {blog.user.name}</div>}
      {blog.user &&
        blog.user.username === userLoggedIn.username &&
        removeButton()}
      <h3>comments</h3>
      {blog.comments && renderComments()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  removeBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  blog: state.blogs.find(blog => blog.id === ownProps.blogId),
  userLoggedIn: state.userLoggedIn
})

const mapDispatchToProps = {
  initializeBlogs: initializeBlogsAction,
  removeBlog: removeBlogByIdAction,
  likeBlog: likeBlogAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
