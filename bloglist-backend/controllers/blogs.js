const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken) {
      return response.status(401).json({
        error: 'invalid token'
      })
    }

    const user = await User.findById(decodedToken.id)
    blog.user = user._id
    const newBlog = await blog.save()

    user.blogs.push(newBlog._id)
    await user.save()
    return response.status(201).json(newBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const blog = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken) {
      return response.status(401).json({
        error: 'invalid token'
      })
    }

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== decodedToken.id) {
      return response.status(400).json({
        error: "Cannot delete another user's blog"
      })
    }

    await blog.delete()
    return response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/:id/comments', async (request, response, next) => {
  const blogId = request.params.id
  const {comment} = request.body

  try {
    const blog = await Blog.findById(blogId)

    if (!blog) {
      return response.status(404).json({
        error: `Blog ${blogId} does not exist`
      })
    }

    blog.comments = blog.comments || []
    blog.comments.push(comment)

    const savedBlog = await blog.save()
    
    return response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter