import { dataType } from '../Types/apiTypes/apiUserTypes';
import { AppDispatch } from '../Types/reduxTypes/reduxStoreTypes';
import { ReducerActionsType, UserInitialStateType } from '../Types/reduxTypes/reduxUserReducerTypes';
import { userAPI } from './api/userAPI';

export const userInitialState = {
    login: "",
    status: "" as "admin" | "user",
    not: "",
    error: "",
    initialize: false,
    loading: false,
    registrationDone: false,
    _id: ""
}

export let userReducerActions = {
    login: (data: {login: string, token?: string, status: "admin" | "user", _id: string}) => {
        return {type: "USER_LOGIN", data} as const
    },
    setNotification: (message: string) => {
        return {type: "USER_NOT", message} as const
    },
    setError: (value: string) => {
        return {type: "USER_ERROR", value} as const
    },
    setInitialize: (value: boolean) => {
        return {type: "USER_INIT", value} as const
    },
    setLoading: (value: boolean) => {
        return {type: "USER_LOADING", value} as const
    },
    setRegistrationDone: (value: boolean)=>{
        return {type: "USER_REGISTRATION_DONE", value} as const
    }
}



export const userReducer = (state: UserInitialStateType = userInitialState, action: ReducerActionsType):UserInitialStateType => {
    switch(action.type){
        case "USER_LOGIN": {
            return {
                ...state,
                login: action.data.login,
                _id: action.data._id,
                status: action.data.status
            }
        }
        case "USER_NOT": {
            return {
                ...state, 
                not: action.message
            }
        }
        case "USER_ERROR": {
            return {
                ...state, 
                error: action.value
            }
        }
        case "USER_LOADING": {
            return {
                ...state, 
                loading: action.value
            }
        }
        case "USER_REGISTRATION_DONE": {
            return {
                ...state,
                registrationDone: action.value
            }
        }
        case "USER_INIT": {
            return {
                ...state, 
                initialize: action.value
            }
        }
        default: return state
    }
}

const errorAndNotificationShowDown = (type: "error" | "not", dispatch:AppDispatch) => {
    if (type === "error"){
        setTimeout(() => {dispatch(userReducerActions.setError(""))}, 3000)
    }
    else {
        setTimeout(() => {dispatch(userReducerActions.setNotification(""))}, 3000)
    }
}

export const logInThunk = () => async(dispatch: AppDispatch) => {
    try{
        let response = await userAPI.getLogin()
        dispatch(userReducerActions.login(response.data.data))
    }
    catch(e){
        console.log(e)
    }
    finally{
        errorAndNotificationShowDown("error", dispatch)
        errorAndNotificationShowDown("not", dispatch)
        dispatch(userReducerActions.setInitialize(true))
    }
}

export const loginisationThunk = (data: dataType) => async(dispatch: AppDispatch) => {
    try{
        dispatch(userReducerActions.setLoading(true))
        let response = await userAPI.login(data)
        dispatch(userReducerActions.login(response.data.user))
        localStorage.setItem("token", response.data.user.token)
        dispatch(userReducerActions.setNotification(response.data.message))
    }
    catch(e){
        if (!e.response){
            dispatch(userReducerActions.setError("???????????? ???? ????????????????"))
        }
        else{
            dispatch(userReducerActions.setError(e.response.data.message))
        }
    }
    finally{
        errorAndNotificationShowDown("error", dispatch)
        errorAndNotificationShowDown("not", dispatch)
        dispatch(userReducerActions.setLoading(false))
    }
}

export const registrationThunk = (data: dataType & {invite: string}) => async(dispatch: AppDispatch) => {
    try{
        dispatch(userReducerActions.setLoading(true))
        let response = await userAPI.registration(data)
        dispatch(userReducerActions.setNotification(response.data.message))
        dispatch(userReducerActions.setRegistrationDone(true))
        setTimeout(() => {
         dispatch(userReducerActions.setRegistrationDone(false))
        }, 500)
    }
    catch(e){
        if (!e.response){
            dispatch(userReducerActions.setError("???????????? ???? ????????????????"))
        }
        else {
            dispatch(userReducerActions.setError(e.response.data.message))
        }
    }
    finally{
        errorAndNotificationShowDown("error", dispatch)
        errorAndNotificationShowDown("not", dispatch)
        dispatch(userReducerActions.setLoading(false))
    }
}