import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
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
    <div style={navbarItemStyle}>
      <em>{userLoggedIn.name} logged in</em>
    </div>
  )

  const logoutLink = () => (
    <Link to="/" type="text" onClick={logout}>
      logout
    </Link>
  )

  return (
    <Menu style={navbarStyle}>
      <Menu.Item><h3>Blog App</h3></Menu.Item>
      <Menu.Item link>
        <Link to="/" style={navbarItemStyle}>
          blogs
        </Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/users" style={navbarItemStyle}>
          users
        </Link>
      </Menu.Item>
      <Menu.Item link className="right">
        {userName()}
        {logoutLink()}
      </Menu.Item>
    </Menu>
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
