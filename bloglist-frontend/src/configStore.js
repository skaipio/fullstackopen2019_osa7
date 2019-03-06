import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notification'

const store = createStore(
  combineReducers({
    notification: notificationReducer
  })
)

export default store