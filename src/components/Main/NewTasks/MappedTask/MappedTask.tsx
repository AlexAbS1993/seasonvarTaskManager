import React from "react";
import { FC, useState } from "react";
import {  useSelector} from "react-redux";
import { RootState } from "../../../../Types/reduxTypes/reduxStoreTypes";
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

export const MappedTaskInner:FC<MappedTaskType> = ({name, status, priority, statusDetails, discription, _id, link, isCheckedBy}) => {
    const userStatus = useSelector<RootState, "admin" | "user">(state => state.user.status)
    const newCommentaryCount = useSelector<RootState, number>(state => state.count.commentaryCounts[_id])
    const [isOpen, setIsOpen] = useState(false)
    const onShowUpClick = () => {
        setIsOpen(prev => !prev)
    } 
    return (      
    <div className={`${classes.task} ${isCheckedBy ? `${classes.unseen}` : `${classes.seen}`}`}> 
                    <div>{name} </div>
                    <div> {priority} </div>
                    <div> {formatter.format(new Date(statusDetails))}</div>
                    <div className={classes.movements}> 
                        <Movements status={status} userStatus={userStatus} _id={_id}/>
                    </div>
                    <ShowUpButton isOpen={isOpen} onShowUpClick={onShowUpClick} newCommentaryCount={newCommentaryCount}/> 
                    {
                        isOpen ? <><HidePart 
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