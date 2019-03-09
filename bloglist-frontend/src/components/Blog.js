import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, List, Divider, Icon } from 'semantic-ui-react'
import {
  removeBlogByIdAction,
  likeBlogAction,
  initializeBlogsAction,
  addCommentToBlogAction
} from '../reducers/blogs'
import CommentForm from './CommentForm'

const Blog = ({
  blog,
  initializeBlogs,
  removeBlog,
  likeBlog,
  addCommentToBlog,
  userLoggedIn
}) => {
  const nonHoverLikeIconClasses = 'thumbs up outline icon'
  const onHoverLikeIconClasses = 'thumbs up outline blue icon'
  const [likeIconClasses, setLikeIconClasses] = useState(
    nonHoverLikeIconClasses
  )

  const mouseEnter = () => {
    setLikeIconClasses(onHoverLikeIconClasses)
  }

  const mouseLeave = () => {
    setLikeIconClasses(nonHoverLikeIconClasses)
  }

  useEffect(() => {
    if (!blog) {
      initializeBlogs()
    }
  }, [])

  if (!blog) return null

  const blogTitleWithAuthor = () => (
    <h2>
      {blog.title} by {blog.author}
    </h2>
  )

  const removeButton = () => (
    <Button negative onClick={() => removeBlog(blog.id)}>
      remove
    </Button>
  )

  const renderComments = () => (
    <List divided>
      {blog.comments.map(comment => (
        <List.Item key={comment}>{comment}</List.Item>
      ))}
    </List>
  )

  const onSubmitComment = comment => {
    addCommentToBlog(blog.id, comment)
  }

  return (
    <div>
      {blogTitleWithAuthor()}
      <List>
        <List.Item>{blog.url}</List.Item>
        <List.Item>
          <div>{blog.likes} likes </div>
          <h4>
            <Icon
              className={likeIconClasses}
              onClick={() => likeBlog(blog)}
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
            />
            like
          </h4>
        </List.Item>
        <Divider />
        {blog.user && <List.Item>added by {blog.user.name}</List.Item>}
        {blog.user &&
          blog.user.username === userLoggedIn.username &&
          removeButton()}
      </List>

      <h3>comments</h3>
      <CommentForm onSubmit={onSubmitComment} />
      {blog.comments && renderComments()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  removeBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  addCommentToBlog: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  blog: state.blogs.find(blog => blog.id === ownProps.blogId),
  userLoggedIn: state.userLoggedIn
})

const mapDispatchToProps = {
  initializeBlogs: initializeBlogsAction,
  removeBlog: removeBlogByIdAction,
  likeBlog: likeBlogAction,
  addCommentToBlog: addCommentToBlogAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
