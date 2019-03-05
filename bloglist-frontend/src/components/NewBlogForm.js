import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { setNotification } from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const NewBlogForm = (props) => {

const createNew = (event) => {
  event.preventDefault()
  const blog = {
    'title': event.target.title.value,
    'author': event.target.author.value,
    'url': event.target.url.value,
    'likes': 0
  }
  event.target.title.value = ''
  event.target.author.value = ''
  event.target.url.value = ''
  if (blog.title === '' || blog.author === '' || blog.url === ''){
    props.setNotification('Please enter title, author and an url.', 3)
  } else {
    try {
      props.newBlog(blog)
      props.setNotification(`A new blog ${blog.title} by ${blog.author} added`, 5)
    } catch (error) {
      props.setNotification(`Virhe uuden blogin luomisessa: ${error.message}`, 5)
    }
  }
}

return (
  <div>
    <form onSubmit={createNew}>
    <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control type="text" name="title"/>
        <Form.Label>Author:</Form.Label>
        <Form.Control type="text" name="author"/>
        <Form.Label>URL:</Form.Label>
        <Form.Control type="text" name="url"/>
      <Button variant="primary" type="submit">Create</Button>
    </Form.Group>
    </form>
  </div>
)}

const mapDispatchToProps = {
  newBlog,
  setNotification
}

const ConnectedNewBlogForm = connect(null, mapDispatchToProps)(NewBlogForm)

export default ConnectedNewBlogForm