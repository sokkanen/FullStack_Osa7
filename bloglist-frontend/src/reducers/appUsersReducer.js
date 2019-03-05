import usersService from '../services/usersService'

const appUsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return action.data
    default:
      return state 
  }
}

export default appUsersReducer

export const getAllUsers = () => {
  return async dispatch => {
    const users = await usersService.getAllUsers()
    dispatch({
      type: 'GET_ALL_USERS',
      data: users
    })
  }
}