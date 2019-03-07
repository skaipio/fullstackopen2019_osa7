import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import {
  clearNotificationAction,
  setNotificationAction
} from './reducers/notification'
import {
  setUserLoggedInAction,
  clearUserLoggedInAction
} from './reducers/userLoggedIn'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'

const App = ({
  userLoggedIn,
  clearNotification,
  setNotification,
  clearUserLoggedIn,
  setUserLoggedIn
}) => {
  const loginFormRef = React.createRef()

  useEffect(() => {
    loginFormRef.current.setVisibility(!userLoggedIn)
  }, [])

  const showNotification = (content, type) => {
    setNotification({
      content,
      type
    })

    setTimeout(() => {
      clearNotification()
    }, 5000)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login(username, password)
      loginFormRef.current.setVisibility(false)
      setUserLoggedIn(user)
    } catch (error) {
      if (error.response && error.response.data) {
        showNotification(error.response.data.error, 'error')
      } else {
        showNotification(error.message, 'error')
      }
    }
  }

  const logout = () => {
    clearUserLoggedIn()
    loginFormRef.current.setVisibility(true)
  }

  const loginForm = () => (
    <Togglable ref={loginFormRef}>
      <Login onLogin={handleLogin} />
    </Togglable>
  )

  const loginDetails = () => (
    <>
      <p>{userLoggedIn.name} logged in</p>
      <button onClick={logout}>logout</button>
    </>
  )

  const userWrappedInRouter = withRouter(({ match }) => (
    <User id={match.params.id} />
  ))

  return (
    <Router>
      <div>
        {userLoggedIn !== null && <h2>blogs</h2>}
        <Notification />
        {loginForm()}
        {userLoggedIn && loginDetails()}
        {userLoggedIn && (
          <Route
            exact
            path="/"
            render={() => <Blogs showNotification={showNotification} />}
          />
        )}
        {userLoggedIn && <Route exact path="/users" render={() => <Users />} />}
        {userLoggedIn && (
          <Route exact path="/users/:id" render={userWrappedInRouter} />
        )}
      </div>
    </Router>
  )
}

const mapStateToProps = state => ({
  userLoggedIn: state.userLoggedIn
})

const mapDispatchToProps = {
  clearNotification: clearNotificationAction,
  setNotification: setNotificationAction,
  clearUserLoggedIn: clearUserLoggedInAction,
  setUserLoggedIn: setUserLoggedInAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
