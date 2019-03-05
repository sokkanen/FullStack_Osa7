import loginService from '../services/login'
import blogService from '../services/blogService'

const userReducer = (state=null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export default userReducer

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem(
        'logged', JSON.stringify(user)
      )
      await blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })} catch (error){
      console.log(error)
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('logged')
    blogService.removeToken()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const setUser = (user) => {
  if (user !== null){
    blogService.setToken(user.token)
  }
  return {
    type: 'SET_USER',
    data: user
  }
}
