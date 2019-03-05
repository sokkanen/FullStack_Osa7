const notificationReducer = (state='', action) => {
  switch (action.type) {
  case 'NEW_MESSAGE':
    return action.data
  default:
    return state
  }
}

export default notificationReducer

export const setNotification = (message, time) => {
  return async dispatch => {
    await dispatch(
      {
        type: 'NEW_MESSAGE',
        data: message
      })
    setTimeout(() => {
      dispatch({
        type: 'NEW_MESSAGE',
        data: ''
      })
    }, time * 1000)
  }
}