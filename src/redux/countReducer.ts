import { statuses } from './../Types/apiTypes/apiCountType';
import { AppDispatch, ThunkAppDispatch } from './../Types/reduxTypes/reduxStoreTypes';
import { countAPI } from './api/countAPI';
import { ActionCreatorsType, countInitialStateType, setCountsDataType } from '../Types/reduxTypes/reduxCountReducerTypes';

export const countInitialState = {
    loading: false,
    initialize: false,
    new: 0,
    working: 0,
    reworking: 0,
    check: 0,
    error: "",
    not: "",
    ready: 0,
    commentaryCounts: {} as {[key:string]:number},
    shouldCheckTaskDidUpdate: false,
    allCounts: {
        
    }
}

export const countActions = {
    setInitialize: (value: boolean) => {
        return {type: "COUNT_INIT", value} as const
    },
    setLoading: (value: boolean) => {
        return {type: "COUNT_LOADING", value} as const
    },
    setCounts: (data: setCountsDataType) => {
        return {type: "COUNT_TASKS_COUNT", data} as const
    },
    setError: (error: string) => {
        return {type: "COUNT_SET_ERROR", error} as const
    },
    setNotification: (not: string) => {
        return {type: "COUNT_SET_NOT", not} as const
    },
    setCommentaryCounts: (data: {[key: string] : number}) => {
        return {type:"COUNT_COMMENT_COUNT", data} as const
    },
    setTaskDidUpdate: (value: boolean) => {
        return {type: "COUNT_TASK_COUNT_UPDATE", value} as const
    },
    getAllTasksCount: (data: any) => {
        return {type: "COUNT_ALL_TASKS_COUNT", data} as const
    }
}

export const countReducer = (state: countInitialStateType = countInitialState, action: ActionCreatorsType):countInitialStateType => {
    switch(action.type){
        case "COUNT_INIT": {
            return {
                ...state, 
                initialize: action.value
            }
        }
        case "COUNT_LOADING": {
            return {
                ...state,
                loading: action.value
            }
        }
        case "COUNT_TASKS_COUNT": {
            return {
                ...state, 
                ...action.data
            }
        }
        case "COUNT_SET_ERROR": {
            return {
                ...state, 
                error: action.error
            }
        }
        case "COUNT_SET_NOT": {
            return {
                ...state, 
                not: action.not
            }
        }
        case "COUNT_COMMENT_COUNT": {
            return {
                ...state,
                commentaryCounts: {
                    ...action.data
                }
            }
        }
        case "COUNT_TASK_COUNT_UPDATE": {
            return {
                ...state, 
                shouldCheckTaskDidUpdate: action.value
            }
        }
        case "COUNT_ALL_TASKS_COUNT": {
            return {
                ...state,
                allCounts: action.data
            }
        }
        default: return state
    }
}

const errorAndNotificationShowDown = (type: "error" | "not", dispatch:AppDispatch) => {
    if (type === "error"){
        setTimeout(() => {dispatch(countActions.setError(""))}, 3000)
    }
    else {
        setTimeout(() => {dispatch(countActions.setNotification(""))}, 3000)
    }
}

export const getTasksCountThunk = () => async(dispatch:AppDispatch) => {
    try{
        dispatch(countActions.setLoading(true))
        dispatch(countActions.setInitialize(false))
        const response = await countAPI.getCountOfTasks()
        let data:any = {}
        response.data.countsArray.forEach((e:any) => {
            for(let key in e){
                data[key] = e[key]
            }
        })
        dispatch(countActions.setCounts(data))
    }
    catch(e){
        if (!e.response){
            dispatch(countActions.setError("Сервер не отвечает"))
        }
        else{
            dispatch(countActions.setError(e.response.data.message))
        }
    }
    finally{
        errorAndNotificationShowDown("error", dispatch)
        errorAndNotificationShowDown("not", dispatch)
        dispatch(countActions.setLoading(false))
        dispatch(countActions.setInitialize(true))
    }
}

export const getCommentaryCountsThunk = (status: statuses) => async(dispatch:AppDispatch) => {
    try{
        dispatch(countActions.setLoading(true))
        const response = await countAPI.getCountOfComments(status)
        dispatch(countActions.setCommentaryCounts(response.data.count))
    }
    catch(e){
        if (!e.response){
            dispatch(countActions.setError("Сервер не отвечает"))
        }
        else{
            dispatch(countActions.setError(e.response.data.message))
        }
    }
    finally{
        errorAndNotificationShowDown("error", dispatch)
        errorAndNotificationShowDown("not", dispatch)
        dispatch(countActions.setLoading(false))
    }
}

export const shouldCheckTaskDidUpdateThunk = (value: boolean) => async(dispatch:AppDispatch) => {
    dispatch(countActions.setTaskDidUpdate(value))
}

export const getAllTasks = () => async(dispatch:AppDispatch) => {
    try{
        let resonse = await countAPI.getAllTasksCount()
        dispatch(countActions.getAllTasksCount(resonse.data))
    }
    catch(e){
        if (!e.response){
            dispatch(countActions.setError("Сервер не отвечает"))
        }
        else{
            dispatch(countActions.setError(e.response.data.message))
        }
    }
    finally{
        errorAndNotificationShowDown("error", dispatch)
        errorAndNotificationShowDown("not", dispatch)
    }
}