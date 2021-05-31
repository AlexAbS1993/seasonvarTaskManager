import { getTasksThunk } from './../tasksReducer';
import { statuses } from './../../Types/apiTypes/apiCountType';
import { getTasksCountThunk, shouldCheckTaskDidUpdateThunk } from './../countReducer';
import { ThunkAppDispatch } from './../../Types/reduxTypes/reduxStoreTypes';
import openSocket from 'socket.io-client'

export const socket = openSocket("http://localhost:5000")

export const subscribe = async(dispatch: ThunkAppDispatch, location: string) => {
       socket.on('newTask', (newStatus: statuses, oldStatus: statuses) => {   
        dispatch(getTasksCountThunk()) 
            const updateMyPage = () => {
                if (newStatus === oldStatus && location.slice(1) === newStatus){
                    dispatch(getTasksThunk(newStatus, false))
                    return
                }
                if (location.slice(1) === newStatus){
                    dispatch(getTasksThunk(newStatus, false))
                    return
                }
                if (location.slice(1) === oldStatus){
                    dispatch(getTasksThunk(oldStatus, false))
                    return
                }
            }
            updateMyPage()   
    })
}

export const notificateServer = (newStatus: statuses, prevStatus: statuses) => {
    setTimeout(() => {
        socket.emit('newTask', newStatus, prevStatus)
    }, 500)
}

