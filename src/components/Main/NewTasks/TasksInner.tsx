import classes from "./newTask.module.css";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, ThunkAppDispatch } from "../../../Types/reduxTypes/reduxStoreTypes";
import { newTaskType } from "../../../Types/TasksTypes/newTaskTypes";
import { MappedTask } from "./MappedTask/MappedTask";
import { checkTasksThunk } from "../../../redux/tasksReducer";
import { statuses } from "../../../Types/apiTypes/apiCountType";



export const TasksInner:FC<{status:statuses}> = ({status}) => {
    const tasks = useSelector<RootState, newTaskType[]>(state => state.task[status])
    const userStatus = useSelector<RootState, "admin" | "user">(state => state.user.status)
    const userID = useSelector<RootState, string>(state => state.user._id)
    const countOfCommentary = useSelector<RootState, {[key: string]: number}>(state => state.count.commentaryCounts)
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
                    return <MappedTask {...e} userStatus={userStatus} userID={userID} key={e._id} newCommentaryCount={countOfCommentary[e._id]}/>
                })
            }
        </>
    )
}