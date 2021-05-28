import { userInitialState, userReducerActions } from "../../redux/userReducer";


export type UserInitialStateType = typeof userInitialState
type ActionsType<T> = T extends {[key:string]: infer U}  ? U : never
export type ReducerActionsType = ReturnType<ActionsType<typeof userReducerActions>>