import { taskActions, taskInitialState } from "../../redux/tasksReducer";

export type TaskInitialStateType = typeof taskInitialState

export type tasksThunkDataTypes = "new" | "ready" | "working" | "reworking" | "check"

export type createTaskThunkDataType = {
    name: string, 
    discription: string, 
    priority: "high"|"low"|"middle",
    link: string
}

type prepareActionTypes<T> = T extends {[key: string]: infer U} ? U : never
export type TaskActionTypes = ReturnType<prepareActionTypes<typeof taskActions>>