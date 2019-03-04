const notificationReducer = (state='', action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return action.data
        case 'ZERO':
            return ''
        default:
            return null;
    }
}

export default notificationReducer

export const setNotification = (message, time) => {
    return async dispatch => {
      await dispatch({ type: 'NEW_BLOG', data: message })
      setTimeout(() => {
        dispatch({
          type: 'ZERO'
        })
      }, time * 1000);
    }
  }