import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, ThunkAppDispatch } from "../../../Types/reduxTypes/reduxStoreTypes";
import { newTaskType } from "../../../Types/TasksTypes/newTaskTypes";
import { MappedTask } from "./MappedTask/MappedTask";
import { checkTasksThunk } from "../../../redux/tasksReducer";
import { statuses } from "../../../Types/apiTypes/apiCountType";
import { getTasksCountThunk } from "../../../redux/countReducer";



export const TasksInner:FC<{status:statuses}> = ({status}) => {
    const tasks = useSelector<RootState, newTaskType[]>(state => state.task[status]) 
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
        setTimeout(() => {
            dispatch(getTasksCountThunk())
        }, 2500)
    }, [dispatch])
    return (
        <>
            {
                tasks.map((e, i) => {
                    const isUnSeen = () => {
                        if(!e.isCheckedBy.some(el => el._id === userID)){
                            return true
                        }
                        return false
                    }
                    const isCheckedBy = isUnSeen()
                    return <MappedTask 
                    statusDetails={e.statusDetails.addedAt} 
                    name={e.name}
                    _id={e._id}
                    discription={e.discription}
                    link={e.link}
                    status={e.status}
                    priority={e.priority}
                    isCheckedBy={isCheckedBy}
                    key={`${e._id}${e.name}`}/>
                })
            }
        </>
    )
}
