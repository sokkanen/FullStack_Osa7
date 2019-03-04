const notificationReducer = (state=null, action) => {
    switch (action.type) {
        case 'NEW_MESSAGE':
            return action.data
        case 'ZERO':
            return null
        default:
            return null;
    }
}

export default notificationReducer

export const setNotification = (message, time) => {
    return async dispatch => {
      await dispatch({ type: 'NEW_MESSAGE', data: message })
      setTimeout(() => {
        dispatch({
          type: 'ZERO'
        })
      }, time * 1000);
    }
  }