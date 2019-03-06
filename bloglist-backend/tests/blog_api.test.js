const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blogMocks = require('./blog_mocks')

jest.setTimeout(10000)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = blogMocks.blogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('GET /api/blogs', () => {
  test('returns all blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body.length).toBe(blogMocks.blogs.length)
  })
  
  test('returns blogs with id fields', async () => {
    const response = await api
      .get('/api/blogs')
  
    const blog = response.body[0]
  
    expect(blog.id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('saves a new note', async () => {
    await api
      .post('/api/blogs')
      .send(blogMocks.singleBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api
      .get('/api/blogs')
  
    const blogsWithoutIds = response.body.map(blog => {
      const blogWithoutId = {...blog}
      delete blogWithoutId.id
      return blogWithoutId
    })
  
    expect(response.body.length).toBe(blogMocks.blogs.length + 1)
    expect(blogsWithoutIds).toContainEqual(blogMocks.singleBlog)
  })

  test('returns 400 Bad Request if title or url is not set', async () => {
    const blogWithoutTitle = {...blogMocks.singleBlog}
    delete blogWithoutTitle.title
  
    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
  
    const blogWithoutUrl = {...blogMocks.singleBlog}
    delete blogWithoutUrl.url
  
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
  })

  test("sets blog likes field to 0 if it isn't defined", async () => {
    const blogWithoutLikes = {...blogMocks.singleBlog}
    delete blogWithoutLikes.likes
  
    const newBlogResponse = await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
  
    const { body } = await api
      .get('/api/blogs')
  
    for (const blog of body) {
      expect(blog.likes).toBeDefined()
      if (blog.id === newBlogResponse.id) {
        expect(blog.likes).toBe(0)
      }
    }
  })
})

describe('PUT /api/blogs/:id', () => {
  test('updates an existing blog', async () => {
    let response = await api
      .get('/api/blogs')

    const oldBlog = response.body[0]
  
    const blog = {
      ...oldBlog,
      likes: oldBlog.likes + 1
    }

    await api
      .put(`/api/blogs/${oldBlog.id}`)
      .send(blog)
      .expect(200)

    response = await api
      .get('/api/blogs')

    const updatedBlog = response.body.find(blog => blog.id === oldBlog.id)
  
    expect(updatedBlog.likes).toBe(blog.likes)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('removes blog post', async () => {
    let response = await api
      .get('/api/blogs')

    const blogId = response.body[0].id

    await api
      .delete(`/api/blogs/${blogId}`)
      .expect(204)

    response = await api
      .get('/api/blogs')
  
    expect(response.body.length).toBe(blogMocks.blogs.length - 1)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})