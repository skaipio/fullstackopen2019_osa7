import { createStore, combineReducers } from 'redux'
import blogsReducer from './reducers/blogs'
import notificationReducer from './reducers/notification'
import userLoggedInReducer from './reducers/userLoggedIn'

const store = createStore(
  combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer,
    userLoggedIn: userLoggedInReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
