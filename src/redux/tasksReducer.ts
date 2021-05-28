import { AppDispatch, ThunkAppDispatch } from './../Types/reduxTypes/reduxStoreTypes';
import { taskAPI } from "./api/tasksAPI"
import { createTaskThunkDataType, TaskActionTypes, TaskInitialStateType, tasksThunkDataTypes } from "../Types/reduxTypes/reduxTasksReducerTypes"

export const taskInitialState = {
    new: [],
    ready: [],
    working: [],
    reworking: [],
    check: [],
    initialize: false,
    error: "",
    notification: "",
    loading: false
}

export const taskActions = {
    setInitialize: (value: boolean) => {
        return {type: "TASK_SET_INIT", value} as const
    },
    setError: (error: string) => {
        return {type: "TASK_SET_ERROR", error} as const
    },
    setNot: (not: string) => {
        return {type: "TASK_SET_NOT", not} as const
    },
    setLoading: (value: boolean) => {
        return {type: "TASK_SET_LOADING", value} as const
    },
    setTasks: (data:any[], status: string) => {
        return {type: "TASK_SET_TASKS", values: {data, status}} as const
    }
}

export const taskReducer = (state:TaskInitialStateType = taskInitialState, action:TaskActionTypes) => {
    switch(action.type){
        case "TASK_SET_INIT": {
            return {
                ...state, 
                initialize: action.value
            }
        }
        case "TASK_SET_ERROR": {
            return {
                ...state, 
                error: action.error
            }
        }
        case "TASK_SET_NOT": {
            return {
                ...state, 
                notification: action.not
            }
        }
        case "TASK_SET_TASKS": {
            return {
                ...state, 
                [action.values.status]: [...action.values.data] 
            }
        }
        case "TASK_SET_LOADING": {
            return {
                ...state, 
                loading: action.value
            }
        }
        default: return state
    }
}

const errorAndNotificationShowDown = (type: "error" | "not", dispatch:AppDispatch) => {
    if (type === "error"){
        setTimeout(() => {dispatch(taskActions.setError(""))}, 3000)
    }
    else {
        setTimeout(() => {dispatch(taskActions.setNot(""))}, 3000)
    }
}

export const getTasksThunk = (value:tasksThunkDataTypes, first: boolean) => async(dispatch:AppDispatch) => {
    try{
        if (first){
            dispatch(taskActions.setInitialize(false))
        }
        const response = await taskAPI.getTasks(value)
        dispatch(taskActions.setTasks(response.data.tasks, response.data.status))
    }
    catch(e){
        if (!e.response){
            dispatch(taskActions.setError("Сервер не отвечает"))
        }
        else{
            dispatch(taskActions.setError(e.response.data.message))
        }
    }
    finally{
        errorAndNotificationShowDown("error", dispatch)
        errorAndNotificationShowDown('not', dispatch)
        dispatch(taskActions.setInitialize(true))
    }
}

export const createTaskThunk = (data:createTaskThunkDataType) => async(dispatch: AppDispatch) => {
    try{
        dispatch(taskActions.setLoading(true))
        dispatch(taskActions.setError(""))
        dispatch(taskActions.setNot(""))
        const response = await taskAPI.createTask(data)
        dispatch(taskActions.setNot(response.data.message))
    }
    catch(e){
        if (!e.response){
            dispatch(taskActions.setError("Сервер не отвечает"))
        }
        else{
            dispatch(taskActions.setError(e.response.data.message))
        }
    }
    finally{
        dispatch(taskActions.setLoading(false))
        errorAndNotificationShowDown("error", dispatch)
        errorAndNotificationShowDown('not', dispatch)
    }
}

export const deleteTaskThunk = (id: string, status:tasksThunkDataTypes) => async(dispatch: AppDispatch | ThunkAppDispatch) => {
    try{
        dispatch(taskActions.setLoading(true))
        const response = await taskAPI.deleteTask(id)
        dispatch(taskActions.setNot(response.data.message))
    }
    catch(e){
        if (!e.response){
            dispatch(taskActions.setError("Сервер не отвечает"))
        }
        else{
            dispatch(taskActions.setError(e.response.data.message))
        }
    }
    finally{
        dispatch(getTasksThunk(status, false))
        dispatch(taskActions.setLoading(false))
    }
}

export const changeTaskStatus = (_id: string, status: tasksThunkDataTypes, prevStatus: tasksThunkDataTypes) => async(dispatch: AppDispatch | ThunkAppDispatch) => {
    try{
        dispatch(taskActions.setLoading(true))
        const response  = await taskAPI.changeStatus(status, _id)
        dispatch(taskActions.setNot(response.data.message))
    }
    catch(e){
        if (!e.response){
            dispatch(taskActions.setError("Сервер не отвечает"))
        }
        else{
            dispatch(taskActions.setError(e.response.data.message))
        }
    }
    finally{
        dispatch(getTasksThunk(prevStatus, false))
        dispatch(taskActions.setLoading(false))
    }
}

export const checkTasksThunk = (data: string[]) => async(dispatch: AppDispatch) => {
    try{
        for (let i = 0; i < data.length; i++){
            setTimeout(() => {
                taskAPI.checkNewTasks(data[i])
            }, 100 * i)
        }
    }
    catch(e){
        if (!e.response){
            dispatch(taskActions.setError("Сервер не отвечает"))
        }
        else{
            dispatch(taskActions.setError(e.response.data.message))
        }
    }
    finally{

    }
}