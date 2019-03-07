import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { addBlogAction, initializeBlogsAction } from '../reducers/blogs'
import CreateBlog from './CreateBlog'

const blogStyle = {
  padding: '0.5em',
  border: '1px solid grey'
}

const Blogs = ({
  blogs,
  initializeBlogs,
  addBlog,
  userLoggedIn,
  showNotification
}) => {
  useEffect(() => {
    initializeBlogs()
  }, [])

  const createBlog = async blog => {
    try {
      const savedBlog = await blogService.create(blog)
      savedBlog.user = { ...userLoggedIn }
      delete savedBlog.user.token
      addBlog(savedBlog)
      showNotification(
        `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
        'success'
      )
      return true
    } catch (error) {
      showNotification(error.message, 'error')
      return false
    }
  }

  return (
    <>
      <CreateBlog handleCreate={createBlog} />
      <div className="blog-list">
        {blogs.map(blog => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  addBlog: PropTypes.func.isRequired,
  initializeBlogs: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  blogs: state.blogs,
  userLoggedIn: state.userLoggedIn
})

const mapDispatchToProps = {
  addBlog: addBlogAction,
  initializeBlogs: initializeBlogsAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)
