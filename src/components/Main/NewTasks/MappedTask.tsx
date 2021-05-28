import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../assets/components/Button/Button";
import { changeTaskStatus, deleteTaskThunk } from "../../../redux/tasksReducer";
import { ThunkAppDispatch } from "../../../Types/reduxTypes/reduxStoreTypes";
import { MappedTaskType} from "../../../Types/TasksTypes/newTaskTypes";
import classes from './newTask.module.css'

let formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });

export const MappedTask:FC<MappedTaskType> = ({name, status, priority, statusDetails, discription, userStatus, _id, loading, link, isCheckedBy, userID}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch:ThunkAppDispatch = useDispatch()
    const onShowUpClick = () => {
        setIsOpen(prev => !prev)
    }
    const deleteClickHandler = () => {
        dispatch(deleteTaskThunk(_id, status))
    }
    const acceptWorkingClickHandler = () => {
        dispatch(changeTaskStatus(_id, "working", status))
    }
    const isUnSeen = () => {
        if(!isCheckedBy.some(e => e._id === userID)){
            return true
        }
        return false
    }
    return (      
    <div className={`${classes.task} ${isUnSeen() ? `${classes.unseen}` : `${classes.seen}`}`}> 
                    <div>{name} </div>
                    <div> {priority} </div>
                    <div> {formatter.format(new Date(statusDetails.addedAt))}</div>
                    <div className={classes.movements}> {
                        userStatus === "admin" ? <> 
                            <div> <Button text="X" type="button" onClick={deleteClickHandler} disabled={loading} variant="little"/> </div>
                        </>: <></>
                        } 
                        {
                            userStatus === "user" ? <> 
                            <div> <Button text="A" type="button" onClick={acceptWorkingClickHandler} disabled={loading} variant="little"/> </div>
                            </>: <></>
                        }
                        </div>
                    <div> <Button text={isOpen ? "^" : "V"} type="button" onClick={onShowUpClick} disabled={false} variant="little"/> </div>
                    {
                        isOpen ? <><div className={classes.addedDiscriptionInfo}>
                                {discription}
                            </div>
                            <div className={classes.addedLinkInfo}>Ссылка: <a href={link} target="_blank">{link}</a></div>
                            </>
                            :
                            <>
                            </>
                    }
                    </div>
    )
}