import React from "react";
import { FC, useState } from "react";
import { useDispatch} from "react-redux";
import { schemaType } from "../../../../assets/components/Form/Form";
import { checkCommentariesThunk } from "../../../../redux/tasksReducer";
import { ThunkAppDispatch } from "../../../../Types/reduxTypes/reduxStoreTypes";
import { MappedTaskType} from "../../../../Types/TasksTypes/newTaskTypes";
import classes from '../newTask.module.css'
import { HidePart } from "./HidenPart/HidePart";
import { Movements } from "./Movements/Movements";
import { ShowUpButton } from "./ShowUpButton";

let formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });

export const MappedTaskInner:FC<MappedTaskType> = ({name, status, priority, statusDetails, discription, userStatus, _id, link, isCheckedBy, userID, newCommentaryCount, commentary}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch:ThunkAppDispatch = useDispatch()
    const onShowUpClick = () => {
        setIsOpen(prev => !prev)
        if (newCommentaryCount > 0){
           setTimeout(() => {
            dispatch(checkCommentariesThunk(newCommentaryCount, commentary, status))
           }, 1000)  
        }
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
                    <div className={classes.movements}> 
                        <Movements status={status} userStatus={userStatus} _id={_id}/>
                    </div>
                    <ShowUpButton isOpen={isOpen} onShowUpClick={onShowUpClick} newCommentaryCount={newCommentaryCount}/>
                    {
                        isOpen ? <><HidePart 
                        commentary={commentary} 
                        discription={discription} 
                        link={link}
                        newCommentaryCount={newCommentaryCount} 
                        status={status} 
                        _id={_id}/>
                            </>
                            :
                            <>
                            </>
                    }
                    </div>
    )
}

export const MappedTask = React.memo(MappedTaskInner)