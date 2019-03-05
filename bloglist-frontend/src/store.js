import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import appUsersReducer from './reducers/appUsersReducer';

const reducer = combineReducers({
    notification: notificationReducer, 
    blogs: blogReducer,
    user: userReducer,
    users: appUsersReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
