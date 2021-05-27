import { userReducer } from './userReducer';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'

const reducers = combineReducers({
    user: userReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ThunkAppDispatch = (data: any) => (dispatch: AppDispatch) => void

(window as any).store = store
