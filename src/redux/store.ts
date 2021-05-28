import { taskReducer } from './tasksReducer';
import { countReducer } from './countReducer';
import { userReducer } from './userReducer';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'

const reducers = combineReducers({
    user: userReducer,
    count: countReducer,
    task: taskReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

(window as any).store = store
