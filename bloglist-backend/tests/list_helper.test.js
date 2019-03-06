const listHelper = require('../utils/list_helper')
const blogMocks = require('./list_mocks')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  it('of empty likes is zero', () => {
    const totalLikes = listHelper.totalLikes(blogMocks.emptyBlogsList)
    expect(totalLikes).toBe(0)
  })

  it('equals the likes of the single blog when there is only one', () => {
    const totalLikes = listHelper.totalLikes(blogMocks.listWithOneBlog)
    expect(totalLikes).toBe(999)
  })

  it('equals the sum of likes of all the blogs in the list', () => {
    const totalLikes = listHelper.totalLikes(blogMocks.listWithMultipleBlogs)
    expect(totalLikes).toBe(999 + 12350360 + 5)
  })
})

describe('favorite blog', () => {
  it('in empty blog list is null', () => {
    const favoriteBlog = listHelper.favoriteBlog(blogMocks.emptyBlogsList)
    expect(favoriteBlog).toBe(null)
  })

  it('equals the single blog when there is only one', () => {
    const favoriteBlog = listHelper.favoriteBlog(blogMocks.listWithOneBlog)
    expect(favoriteBlog).toEqual({
      _id: '5c62d6dba96a499808a1f148',
      title: 'Mixins are considered harmful',
      author: 'Dan Abramov',
      url: 'https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html',
      likes: 999
    })
  })

  it('to be the blog with most likes when there are multiple blogs', () => {
    const favoriteBlog = listHelper.favoriteBlog(blogMocks.listWithMultipleBlogs)
    expect(favoriteBlog).toEqual({
      _id: '5c62d9f9c2ee409c86f956e1',
      title: 'r/2meirl4meirl is sad but funny',
      author: 'Redditors',
      url: 'https://www.reddit.com/r/2meirl4meirl/',
      likes: 12350360
    })
  })
})

describe('most blogs', () => {
  it('returns author with the greatest count of authored blogs', () => {
    const author = listHelper.mostBlogs(blogMocks.blogs)
    expect(author).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

  it('returns any of the authors that have most blogs with an equal count', () => {
    const author = listHelper.mostBlogs(blogMocks.blogListWithDuplicateDijkstra)
    const expectedAuthors = [
      {
        author: 'Robert C. Martin',
        blogs: 3
      },
      {
        author: 'Edsger W. Dijkstra',
        blogs: 3
      }
    ]
    expect(expectedAuthors).toContainEqual(author)
  })
})

describe('most likes', () => {
  it('returns author with the most total likes', () => {
    const author = listHelper.mostLikes(blogMocks.blogs)
    expect(author).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})

