import { AppDispatch } from './store';
import { dataType, userAPI } from './api/userAPI';

const initialState = {
    login: "",
    status: "",
    not: "",
    error: "",
    initialize: false,
    loading: false,
    registrationDone: false
}

type InitialStateType = typeof initialState

let userReducerActions = {
    login: (data: {login: string, token?: string, status: string}) => {
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

type ActionsType<T> = T extends {[key:string]: infer U}  ? U : never
type ReducerActionsType = ReturnType<ActionsType<typeof userReducerActions>>

export const userReducer = (state: InitialStateType = initialState, action: ReducerActionsType):InitialStateType => {
    switch(action.type){
        case "USER_LOGIN": {
            return {
                ...state,
                login: action.data.login,
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
        console.log({...e})
        if (!e.response){
            dispatch(userReducerActions.setError("Сервер не отвечает"))
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
            dispatch(userReducerActions.setError("Сервер не отвечает"))
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