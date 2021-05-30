import { statuses } from './../Types/apiTypes/apiCountType';
import { commentaryAPI } from './api/commentaryAPI';
import { AppDispatch, ThunkAppDispatch } from './../Types/reduxTypes/reduxStoreTypes';
import { taskAPI } from "./api/tasksAPI"
import { createTaskThunkDataType, TaskActionTypes, TaskInitialStateType, tasksThunkDataTypes } from "../Types/reduxTypes/reduxTasksReducerTypes"
import { NewCommentDataType } from '../Types/TasksTypes/newTaskTypes';
import { getCommentaryCountsThunk } from './countReducer';

export const taskInitialState = {
    new: [],
    ready: [],
    working: [],
    reworking: [],
    check: [],
    initialize: false,
    error: "",
    notification: "",
    loading: false,
    commentaries: {

    } as any
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
    },
    cleanTasks: () => {
        return {type: "TASK_CLEAN_TASK"} as const
    },
    setCommentaries: (data: {[key:string]:any}) => {
        return {type: "TASK_SET_COM", data} as const
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
                [action.values.status]: action.values.data
            }
        }
        case "TASK_SET_LOADING": {
            return {
                ...state, 
                loading: action.value
            }
        }
        case "TASK_CLEAN_TASK":{
            return {
                ...taskInitialState
            }
        }
        case "TASK_SET_COM": {
            return {
                ...state,
                commentaries: {
                    ...state.commentaries,
                    ...action.data
                }
            }
        }
        default: return state
    }
}

const errorAndNotificationShowDown = (type: "error" | "not", dispatch:AppDispatch|ThunkAppDispatch) => {
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
        // dispatch(taskActions.setLoading(true))
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
        // dispatch(taskActions.setLoading(false))
    }
}

export const changeTaskStatus = (_id: string, status: tasksThunkDataTypes, prevStatus: tasksThunkDataTypes, commentary?: string) => async(dispatch: AppDispatch | ThunkAppDispatch) => {
    try{
        dispatch(taskActions.setLoading(true))
        let response
        if (commentary){
            response  = await taskAPI.changeStatus(status, _id, commentary)
        }
        else{
            response  = await taskAPI.changeStatus(status, _id)
        }
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

export const checkCommentariesThunk = (countOfNew: number, commentary: any[], status: statuses) => async(dispatch: AppDispatch | ThunkAppDispatch) => {
    try{
        let response = async() => {
            for (let i = 0; i < countOfNew; i++){
                setTimeout(async () => {
                    await commentaryAPI.checkCommentary(commentary[i])
                    if (i === countOfNew - 1){
                        dispatch(getCommentaryCountsThunk(status))
                        // dispatch(getTasksThunk(status, false))
                    }
                }, 200 * i)
            }
        }
       await response()
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
    }
}


export const getCommentsThunk = (_id: string) => async(dispatch: AppDispatch) => {
    try{
        const response = await commentaryAPI.getCommentary(_id)
        let data:any = {}
        data[_id] = response.data.comments
        dispatch(taskActions.setCommentaries(data))
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
        // dispatch(taskActions.setLoading(false))
        errorAndNotificationShowDown("error", dispatch)
        errorAndNotificationShowDown('not', dispatch)
    }
}

export const createCommentThunk = (data: NewCommentDataType, status: statuses) => async(dispatch: AppDispatch | ThunkAppDispatch) => {
    try{
        // dispatch(taskActions.setLoading(true))
        const response = await commentaryAPI.createCommentarty(data._id, data.commentary)
        dispatch(getCommentsThunk(data._id))
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
        // dispatch(taskActions.setLoading(false))
        errorAndNotificationShowDown("error", dispatch)
        errorAndNotificationShowDown('not', dispatch)
    }
}
