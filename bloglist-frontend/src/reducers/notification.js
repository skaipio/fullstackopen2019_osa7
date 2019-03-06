export const setNotificationAction = (payload) => {
  return {
    payload,
    type: 'SET_NOTIFICATION',
  }
}

export const clearNotificationAction = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

const initialState = {
  content: null,
  notificationType: 'success'
}

function notificationReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return {
        type: 'success',
        ...action.payload,
      }
    case 'CLEAR_NOTIFICATION':
      return {
        content: null,
        type: null
      }
    default:
      return state
  }
}

export default notificationReducer