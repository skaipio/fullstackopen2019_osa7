import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import { setUsersAction } from '../reducers/users';

const Users = ({ users, setUsers }) => {
  useEffect(() => {
    userService.getAll().then(fetchedUsers => {
      setUsers(fetchedUsers)
    })
  }, [])

  const renderRowsForUserTable = () =>
    users.map(user => {
      return (
        <tr key={user.username}>
          <td>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </td>
          <td>{user.blogs.length}</td>
        </tr>
      )
    })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>{renderRowsForUserTable()}</tbody>
      </table>
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  users: state.users,
})

const mapDispatchToProps = {
  setUsers: setUsersAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
