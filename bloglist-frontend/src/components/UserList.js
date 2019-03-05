import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllUsers } from '../reducers/appUsersReducer'
import { Table } from 'react-bootstrap'

const UserList = (props) => {

    useEffect(()=> {
        props.getAllUsers()
      }, [])

    const ultraPadding = {
        padding: 75
    }

    return (
        <div>
        <h3>Users</h3>
        <div style={ultraPadding}>
            <Table hover>
                <tbody>
                <th>Name</th>
                <th>Blogs</th>
                {props.users.map(user => <tr key={user.id}> 
                <td>
                {user.name}
                </td>
                <td>
                {user.blogs.length}
                </td>
                </tr>
                )}
                </tbody>
            </Table>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      users: state.users
    }
  }

const mapDispatchToProps = {
    getAllUsers
}

const ConnectedUserList = connect(mapStateToProps, mapDispatchToProps)(UserList)

export default ConnectedUserList