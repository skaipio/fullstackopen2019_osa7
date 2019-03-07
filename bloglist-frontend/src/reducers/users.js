export const setUsersAction = payload => {
  return {
    payload,
    type: 'SET_USERS'
  }
}

const initialState = []

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERS':
      return [...action.payload]
    default:
      return state
  }
}

export default usersReducer
