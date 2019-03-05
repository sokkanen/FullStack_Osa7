import blogService from '../services/blogService'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
      const rid = action.data
      const blogs = state.filter(b => b.id !== rid)
      return blogs
    case 'UPDATE_BLOG':
      const id = action.data
      const blog = state.find(b => b.id === id)
      const updatedblogs = state.map(b => b.id !== id ? b : blog).sort((a,b) => b.likes - a.likes)
      return updatedblogs
    default:
      return state 
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

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    blog.likes = blog.likes + 1
    await blogService.update(blog.id, blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog.id
    })
  }
}