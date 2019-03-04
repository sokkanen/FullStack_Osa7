import blogService from '../services/blogService'

const blogReducer = (state=[], action) => {
    switch (action.type) {
        case 'GET_ALL':
            return action.data
        case 'NEW':
        console.log(action.data)
        const blog = {
          'title': action.data.content.title,
          'author': action.data.content.authon,
          'url': action.data.content.url,
          'likes': 0
        }
            return state.concat(blog)
        default:
            return null;
    }
}

export default blogReducer

export const getAll = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch ({
        type: 'GET_ALL',
        data: blogs
        })
    }
  }

export const newBlog = (content) => {
    return async dispatch => {
      await blogService.create(content)
      dispatch({
        type: 'NEW',
        data: content
      })
    }
  }