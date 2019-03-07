import loginService from '../services/login'

const localStorageUserKey = 'bloglistUser'

const getUserFromLocalStorage = () => {
  const strUser = window.localStorage.getItem(localStorageUserKey)
  if (!strUser) return null

  const user = JSON.parse(strUser)
  loginService.setUser(user) // have to do this because blogsService depends on it
  return user
}

export const setUserLoggedInAction = (payload) => {
  window.localStorage.setItem(localStorageUserKey, JSON.stringify(payload))
  loginService.setUser(payload) // have to do this because blogsService depends on it
  return {
    payload,
    type: 'SET_USER_LOGGED_IN',
  }
}

export const clearUserLoggedInAction = () => {
  window.localStorage.removeItem(localStorageUserKey)
  loginService.setUser(null)
  return {
    type: 'CLEAR_USER_LOGGED_IN',
  }
}

const initialState = getUserFromLocalStorage()

function userLoggedInReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_USER_LOGGED_IN':
      return {
        ...action.payload,
      }
    case 'CLEAR_USER_LOGGED_IN':
      return null
    default:
      return state
  }
}

export default userLoggedInReducer