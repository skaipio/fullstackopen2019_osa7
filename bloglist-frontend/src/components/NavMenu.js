import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAction } from '../reducers/userLoggedIn'

const navbarStyle = {
  display: 'flex',
  backgroundColor: '#d2fffa',
  padding: '0.5em'
}

const navbarItemStyle = {
  marginRight: '1em'
}

const NavMenu = ({ logout, userLoggedIn }) => {
  if (!userLoggedIn) return null

  const userName = () => (
    <div style={navbarItemStyle}>{userLoggedIn.name} logged in</div>
  )

  const logoutButton = () => <button onClick={logout}>logout</button>

  return (
    <div style={navbarStyle}>
      <Link to="/" style={navbarItemStyle}>
        blogs
      </Link>
      <Link to="/users" style={navbarItemStyle}>
        users
      </Link>
      {userName()}
      {logoutButton()}
    </div>
  )
}

NavMenu.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userLoggedIn: state.userLoggedIn
})

const mapDispatchToProps = {
  logout: logoutAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenu)
