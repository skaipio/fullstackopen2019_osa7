import { createStore, combineReducers } from 'redux'
import blogsReducer from './reducers/blogs'
import notificationReducer from './reducers/notification'

const store = createStore(
  combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store