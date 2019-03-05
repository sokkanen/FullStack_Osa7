import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  if (props.user === undefined){
    return null
  }

  const Padding = { padding: 20 }

  return (
    <div className="user">
      <h2 style={Padding}>{props.user.name}</h2>
      <h3 style={Padding}>Added blogs: </h3>
      <ul>
        {props.user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}


const ConnectedUser = connect(null, null)(User)

export default ConnectedUser