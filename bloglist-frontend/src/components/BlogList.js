import React, { useEffect } from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { getAll } from '../reducers/blogReducer'

const BlogList = (props) => {
    const blogs = props.blogs
    const user = props.user


    useEffect(()=> {
      props.getAll()
    }, [])

    if (blogs === null){
        return (
            <div>
                <h2>No blogs</h2>
            </div>
        )
    }

    return (
    <>
    <div className="bloglist">
    <Table hover>
    <tbody>
        {blogs.map(blog => <tr key={blog.id}> 
          <td>
            <Blog key={blog.id} blog={blog} username={user.username}/>
          </td>
        </tr>
        )}
    </tbody>
    </Table>
    </div>
    </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    getAll
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)

export default ConnectedBlogList









