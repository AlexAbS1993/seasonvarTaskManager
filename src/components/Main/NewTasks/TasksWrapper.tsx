import classes from "./newTask.module.css"
import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTasksThunk } from "../../../redux/tasksReducer"
import { RootState, ThunkAppDispatch } from "../../../Types/reduxTypes/reduxStoreTypes"
import { TasksInner } from "./TasksInner"
import { getCommentaryCountsThunk } from "../../../redux/countReducer"
import { useLocation } from "react-router"
import { statuses } from "../../../Types/apiTypes/apiCountType"

export const TasksWrapper:FC = () => {
    const location = useLocation()
    let amOn:statuses = location.pathname.slice(1) as statuses
    const dispatch:ThunkAppDispatch = useDispatch() 
    const initialize = useSelector<RootState, boolean>(state => state.task.initialize)
    useEffect(() => {
        dispatch(getCommentaryCountsThunk(amOn))
        dispatch(getTasksThunk(amOn, true))  
    }, [dispatch])
    return (
        <div className={classes.NewTasksWrapper}>
        {
            initialize ? <TasksInner status={amOn}/> : <div>загрузка</div>
        }
        </div>
    )
}