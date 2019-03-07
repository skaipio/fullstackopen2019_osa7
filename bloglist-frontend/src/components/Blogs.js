import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import {
  addBlogAction,
  updateBlogAction,
  setBlogsAction,
  removeBlogByIdAction
} from '../reducers/blogs'
import CreateBlog from './CreateBlog'
import Blog from './Blog'

const Blogs = ({
  blogs,
  addBlog,
  updateBlog,
  removeBlogById,
  setBlogs,
  userLoggedIn,
  showNotification
}) => {
  useEffect(() => {
    blogService.getAll().then(setBlogs)
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

  const likeBlog = async blog => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      const updatedBlog = await blogService.update(likedBlog, blog.id)
      updatedBlog.user = blog.user
      updateBlog(updatedBlog)
    } catch (error) {
      showNotification(error.message, 'error')
    }
  }

  const removeBlog = async blog => {
    if (!window.confirm(`remove blog ${blog.title}`)) return

    try {
      await blogService.remove(blog.id)
      removeBlogById(blog.id)
    } catch (error) {
      showNotification(error.message, 'error')
    }
  }

  return (
    <>
      <CreateBlog handleCreate={createBlog} />
      <div className="blog-list">
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            onLike={likeBlog}
            onRemove={removeBlog}
          />
        ))}
      </div>
    </>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  blogs: state.blogs,
  userLoggedIn: state.userLoggedIn
})

const mapDispatchToProps = {
  addBlog: addBlogAction,
  updateBlog: updateBlogAction,
  removeBlogById: removeBlogByIdAction,
  setBlogs: setBlogsAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)
