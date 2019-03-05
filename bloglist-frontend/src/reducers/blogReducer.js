import blogService from '../services/blogService'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    default:
      return null
  }
}

export default blogReducer

export const getAll = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_ALL',
      data: blogs
    })
  }
}

export const newBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}