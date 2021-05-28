import classes from "./newTask.module.css"
import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTasksThunk } from "../../../redux/tasksReducer"
import { RootState, ThunkAppDispatch } from "../../../Types/reduxTypes/reduxStoreTypes"
import { TasksInner } from "./TasksInner"

export const NewTasksWrapper:FC = () => {
    const dispatch:ThunkAppDispatch = useDispatch() 
    const initialize = useSelector<RootState, boolean>(state => state.task.initialize)
    useEffect(() => {
        dispatch(getTasksThunk('new', true))
    }, [dispatch])
    return (
        <div className={classes.NewTasksWrapper}>
        {
            initialize ? <TasksInner /> : <div>загрузка</div>
        }
        </div>
    )
}