import { countAPI } from './api/countAPI';
import { AppDispatch } from '../Types/reduxTypes/reduxStoreTypes';
import { ActionCreatorsType, countInitialStateType, setCountsDataType } from '../Types/reduxTypes/reduxCountReducerTypes';

export const countInitialState = {
    loading: false,
    initialize: false,
    new: 0,
    working: 0,
    reworking: 0,
    check: 0,
    error: "",
    not: ""
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