import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllTasks, getTasksCountThunk } from "../../../redux/countReducer"
import { statuses } from "../../../Types/apiTypes/apiCountType"
import { RootState, ThunkAppDispatch } from "../../../Types/reduxTypes/reduxStoreTypes"



export const HomeInformatiom:FC<{status: "admin" | "user"}> = ({status}) => {
    const newTask = useSelector<RootState, number>(state => state.count.new)
    const reworking = useSelector<RootState, number>(state => state.count.reworking)
    const working = useSelector<RootState, number>(state => state.count.working)
    const check = useSelector<RootState, number>(state => state.count.check)
    const initialize = useSelector<RootState, boolean>(state => state.count.initialize)
    const allTasksCount = useSelector<RootState, any>(state => state.count.allCounts)
    const dispatch: ThunkAppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllTasks())
        dispatch(getTasksCountThunk())
    }, [dispatch])
    return (
        <>{
            initialize ? <> 
            <p> Всего новых <strong>{allTasksCount.new}</strong></p>
            <p> Всего на проверке <strong>{allTasksCount.check}</strong></p>
            <p> Всего в работе <strong>{allTasksCount.working}</strong></p>
            <p> Всего на доработке <strong>{allTasksCount.reworking}</strong></p>
            {
                status === "admin" && <> 
                    <p>Новое в работе: {working}</p>
                    <p>Новое на проверке: {check}</p>
                </>
            }
            {
                status === "user" && <> 
                    <p>Новых заданий: {newTask}</p>
                    <p>Новое на доработке: {reworking}</p>
                </>
            }
            </> : <> Грузим данные </>
        } 
        </>
    )
}