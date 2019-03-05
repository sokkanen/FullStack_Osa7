import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const Blog = (props) => {

  const username = props.username
  const blog = props.blog
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
  }

  const [visible, setVisible] = useState(false)
  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVis = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 3
  }

  const likeHandler = () => {
    props.updateBlog(blog)
  }

  const removeHandler = () => {
    if (window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author} ?`)){
      props.removeBlog(blog.id)
    }
  }

  const removeButton = () => {
    if (username === blog.user.username){
      return (
        <div>
          <Button variant="danger" onClick={removeHandler}>remove</Button>
        </div>
      )
    }
    return (
      <div>
      </div>
    )
  }

  return (
    <div className="blog" style={blogStyle}>
      <div title="visible" className="visible" style={show} onClick={toggleVis}>
        <div>
          {blog.title} by {blog.author}
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <Button variant="success" onClick={likeHandler}>like</Button>
        </div>
        <div>
    added by {blog.user.name}
        </div>
        {removeButton()}
      </div>
      <div className="hidden" style={hide} onClick={toggleVis}>
        <div>
          {blog.title} by {blog.author}
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  removeBlog,
  updateBlog
}

const ConnectedBlog = connect(null, mapDispatchToProps)(Blog)

export default ConnectedBlog