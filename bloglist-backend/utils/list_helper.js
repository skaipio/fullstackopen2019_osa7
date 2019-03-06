const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accLikes, blog) => accLikes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((favoriteBlog, blog) =>
    blog.likes > favoriteBlog.likes ? blog : favoriteBlog,
    blogs[0]
  )
}

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author')
  const authorsWithBlogCounts = _.map(counts, (blogs, author) => ({ author, blogs }))
  return _.maxBy(authorsWithBlogCounts, 'blogs')
}

const mostLikes = (blogs) => {
  const likeCounts = blogs.reduce((accAuthorLikes, blog) => {
    const author = accAuthorLikes[blog.author]
    if (!author) {
      accAuthorLikes[blog.author] = 0
    }

    accAuthorLikes[blog.author] += blog.likes
    return accAuthorLikes
  }, {})
  const authorsWithLikes = _.map(likeCounts, (likes, author) => ({ author, likes }))
  return _.maxBy(authorsWithLikes, 'likes')
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}