import classes from "./newTask.module.css";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, ThunkAppDispatch } from "../../../Types/reduxTypes/reduxStoreTypes";
import { newTaskType } from "../../../Types/TasksTypes/newTaskTypes";
import { MappedTask } from "./MappedTask";
import { checkTasksThunk } from "../../../redux/tasksReducer";



export const TasksInner:FC = () => {
    const tasks = useSelector<RootState, newTaskType[]>(state => state.task.new)
    const userStatus = useSelector<RootState, string>(state => state.user.status)
    const loading = useSelector<RootState, boolean>(state => state.task.loading)
    const userID = useSelector<RootState, string>(state => state.user._id)
    const dispatch:ThunkAppDispatch = useDispatch()
    useEffect(() => {
        let listOfId = []
        for (let i = 0; i < tasks.length; i++){
            if (!tasks[i].isCheckedBy.some(e => e._id === userID)){
                listOfId.push(tasks[i]._id)
            }
        }
        dispatch(checkTasksThunk(listOfId))
    }, [dispatch])
    return (
        <>
            {
                tasks.map((e) => {
                    return <MappedTask {...e} userStatus={userStatus} loading={loading} userID={userID}/>
                })
            }
        </>
    )
}