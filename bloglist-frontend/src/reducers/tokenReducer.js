import blogService from '../services/blogService'

const tokenReducer = (state='', action) => {
    switch (action.type) {
        case 'SET':
            state.push(action.newToken)
            return state.token
        case 'ZERO':
            return ''
        default:
            return null;
    }
}

export default tokenReducer

export const setToken = (newToken) => {
    return async dispatch => {
      await blogService.setToken(newToken)
      dispatch({
        type: 'SET',
        newToken
      })
    }
}

export const zeroToken = () => {
    return async dispatch => {
      await blogService.removeToken()
      dispatch({
        type: 'ZERO'
      })
    }
}