export const setBlogsAction = (payload) => {
  return {
    payload,
    type: 'SET_BLOGS',
  }
}

export const addBlogAction = (payload) => {
  return {
    payload,
    type: 'ADD_BLOG',
  }
}

export const updateBlogAction = (payload) => {
  return {
    payload,
    type: 'UPDATE_BLOG',
  }
}

export const removeBlogByIdAction = (payload) => {
  return {
    payload,
    type: 'REMOVE_BLOG_BY_ID',
  }
}


const initialState = []

const sortBlogsByLikes = (blogs) => {
  blogs.sort((blogLeft, blogRight) => blogRight.likes - blogLeft.likes)
  return blogs
}

function blogsReducer(state = initialState, action) {
  let blogs = state
  switch(action.type) {
    case 'ADD_BLOG':
      blogs = state.concat(action.payload)
      break;
    case 'UPDATE_BLOG':
      blogs = state.filter(blog => blog.id !== action.payload.id)
      blogs.push({...action.payload})
      break;
    case 'REMOVE_BLOG_BY_ID':
      blogs = state.filter(blog => blog.id !== action.payload)
      break;
    case 'SET_BLOGS':
      blogs = [...action.payload]
      break;
  }
  return sortBlogsByLikes(blogs)
}

export default blogsReducer