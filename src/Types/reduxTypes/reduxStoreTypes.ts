import {store} from '../../redux/store'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ThunkAppDispatch = (data: any) => (dispatch: AppDispatch) => void


