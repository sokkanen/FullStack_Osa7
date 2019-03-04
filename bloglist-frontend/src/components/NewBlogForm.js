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
  props.setNotification(`A new blog ${event.target.title.value} by ${event.target.author.value} added`, 5)
  props.newBlog(blog)
}

return (
  <div>
    <form onSubmit={createNew}>
    <Form.Group>
      <div>
        <Form.Label>Title:</Form.Label>
        <Form.Control type="text" name="title"/>
      </div>
      <div>
        <Form.Label>Author:</Form.Label>
        <Form.Control type="text" name="author"/>
      </div>
      <div>
        <Form.Label>URL:</Form.Label>
        <Form.Control type="text" name="url"/>
      </div>
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