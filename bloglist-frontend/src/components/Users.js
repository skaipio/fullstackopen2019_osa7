import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import userService from '../services/users'
import { setUsersAction } from '../reducers/users'

const Users = ({ users, setUsers }) => {
  useEffect(() => {
    userService.getAll().then(fetchedUsers => {
      setUsers(fetchedUsers)
    })
  }, [])

  const renderRowsForUserTable = () =>
    users.map(user => {
      return (
        <Table.Row key={user.username}>
          <Table.Cell>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </Table.Cell>
          <Table.Cell>{user.blogs.length}</Table.Cell>
        </Table.Row>
      )
    })

  return (
    <div>
      <h2 className="ui center aligned header">Users</h2>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderRowsForUserTable()}</Table.Body>
      </Table>
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = {
  setUsers: setUsersAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
