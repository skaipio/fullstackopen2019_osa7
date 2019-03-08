import blogService from '../services/blogs'

const setBlogsAction = blogs => {
  return {
    payload: { blogs },
    type: 'SET_BLOGS'
  }
}

export const initializeBlogsAction = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogsAction(blogs))
  }
}

export const addBlogAction = payload => {
  return {
    payload,
    type: 'ADD_BLOG'
  }
}

export const updateBlogAction = payload => {
  return {
    payload,
    type: 'UPDATE_BLOG'
  }
}

const blogRemovedAction = id => {
  return {
    payload: { id },
    type: 'BLOG_REMOVED'
  }
}

export const likeBlogAction = payload => {
  return async dispatch => {
    const user = payload.user
    const updatedBlog = await blogService.update(
      {
        ...payload,
        likes: payload.likes + 1
      },
      payload.id
    )
    updatedBlog.user = user
    dispatch(updateBlogAction(updatedBlog))
  }
}

export const removeBlogByIdAction = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(blogRemovedAction(id))
  }
}

const initialState = []

const sortBlogsByLikes = blogs => {
  blogs.sort((blogLeft, blogRight) => blogRight.likes - blogLeft.likes)
  return blogs
}

function blogsReducer(state = initialState, action) {
  let blogs = state
  switch (action.type) {
    case 'ADD_BLOG':
      blogs = state.concat(action.payload)
      break
    case 'UPDATE_BLOG':
      blogs = state.filter(blog => blog.id !== action.payload.id)
      blogs.push({ ...action.payload })
      break
    case 'BLOG_REMOVED':
      blogs = state.filter(blog => blog.id !== action.payload.id)
      break
    case 'SET_BLOGS':
      blogs = [...action.payload.blogs]
      break
    default:
      break
  }
  return sortBlogsByLikes(blogs)
}

export default blogsReducer
