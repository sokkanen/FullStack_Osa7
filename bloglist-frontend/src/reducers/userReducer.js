import loginService from '../services/login'
import blogService from '../services/blogService'

const userReducer = (state=null, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.data)
            return action.data
        case 'LOGOUT':
            return null
        default:
            return null;
    }
}

export default userReducer

export const login = (username, password) => {
    return async dispatch => {
        try {
        const user = await loginService.login(username, password)
        console.log(user)
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
