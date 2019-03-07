import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const User = ({user}) => {
  if (!user) return null

  const renderBlogTitles = () => user.blogs.map(blog => 
    <li key={blog.id}>
      {blog.title}
    </li>)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {renderBlogTitles()}
      </ul>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.any
}

const mapStateToProps = (state, ownProps) => ({
  user: state.users.find(user => user.id === ownProps.id)
})

export default connect(mapStateToProps)(User)
