import React from 'react'
import Notification from '../components/Notification'
import { Form, Button } from 'react-bootstrap'

const NewBlogForm = ({ message, newBlogHandler, blogname, blogauthor, blogurl }) => (
  <div>
    <Notification message ={message}/>
    <form onSubmit={newBlogHandler}>
    <Form.Group>
      <div>
        <Form.Label>Title:</Form.Label>
        <Form.Control {...blogname} type="text" name="blogname"/>
      </div>
      <div>
        <Form.Label>Author:</Form.Label>
        <Form.Control { ...blogauthor } type="text" name="blogauthor"/>
      </div>
      <div>
        <Form.Label>URL:</Form.Label>
        <Form.Control { ...blogurl } type="text" name="blogurl"/>
      </div>
      <Button variant="primary" type="submit">Create</Button>
    </Form.Group>
    </form>
  </div>
)

export default NewBlogForm