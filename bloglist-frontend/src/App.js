import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { addBlogAction, removeBlogByIdAction, setBlogsAction, updateBlogAction } from './reducers/blogs'
import {
  clearNotificationAction,
  setNotificationAction
} from './reducers/notification'

const localStorageUserKey = 'bloglistUser'

const App = ({
  blogs,
  addBlog,
  updateBlog,
  removeBlogById,
  setBlogs,
  clearNotification,
  setNotification
}) => {
  const [user, setUser] = useState(null)

  const loginFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(setBlogs)
  }, [])

  useEffect(() => {
    const strUser = window.localStorage.getItem(localStorageUserKey)
    loginFormRef.current.setVisibility(!strUser)
    if (!strUser) return

    const parsedUser = JSON.parse(strUser)

    loginService.setUser(parsedUser)
    setUser(parsedUser)
  }, [])

  const showNotification = (content, type) => {
    setNotification({
      content,
      type
    })

    setTimeout(() => {
      clearNotification()
    }, 5000)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login(username, password)
      loginFormRef.current.setVisibility(false)
      window.localStorage.setItem(localStorageUserKey, JSON.stringify(user))
      loginService.setUser(user)
      setUser(user)
    } catch (error) {
      if (error.response && error.response.data) {
        showNotification(error.response.data.error, 'error')
      } else {
        showNotification(error.message, 'error')
      }
    }
  }

  const logout = () => {
    window.localStorage.removeItem(localStorageUserKey)
    setUser(null)
    loginFormRef.current.setVisibility(true)
  }

  const createBlog = async blog => {
    try {
      const savedBlog = await blogService.create(blog)
      savedBlog.user = {...loginService.getUser()}
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

  const loginForm = () => (
    <Togglable ref={loginFormRef}>
      <Login handleLogin={handleLogin} />
    </Togglable>
  )

  const loginDetails = () => (
    <>
      <p>{user.name} logged in</p>
      <button onClick={logout}>logout</button>
    </>
  )

  const blogPage = () => (
    <>
      {loginDetails()}
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

  return (
    <div>
      {user !== null && <h2>blogs</h2>}
      <Notification />
      {loginForm()}
      {user !== null && blogPage()}
    </div>
  )
}

const mapStateToProps = state => ({
  blogs: state.blogs
})

const mapDispatchToProps = {
  addBlog: addBlogAction,
  updateBlog: updateBlogAction,
  removeBlogById: removeBlogByIdAction,
  setBlogs: setBlogsAction,
  clearNotification: clearNotificationAction,
  setNotification: setNotificationAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
