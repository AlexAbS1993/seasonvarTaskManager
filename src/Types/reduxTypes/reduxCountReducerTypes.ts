import { countActions, countInitialState } from "../../redux/countReducer"

export type countInitialStateType = typeof countInitialState
export type setCountsDataType = {
    new: number,
    working: number,
    reworking: number,
    check: number
}

type prepareActionTypes<T> = T extends {[key: string]: infer U} ? U : never
export type ActionCreatorsType = ReturnType<prepareActionTypes<typeof countActions>>