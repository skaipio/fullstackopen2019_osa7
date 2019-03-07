import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogs'
import notificationReducer from './reducers/notification'
import userLoggedInReducer from './reducers/userLoggedIn'
import usersReducer from './reducers/users'

const store = createStore(
  combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer,
    userLoggedIn: userLoggedInReducer,
    users: usersReducer
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
