import { FC } from "react";
import { Button } from "../../../../assets/components/Button/Button";
import { ShowUpButtonType } from "../../../../Types/TasksTypes/newTaskTypes";
import classes from '../newTask.module.css'

export const ShowUpButton:FC<ShowUpButtonType> = ({isOpen, onShowUpClick, newCommentaryCount}) => {
    return (
        <div className={classes.shower}> <Button text={isOpen ? "^" : "V"} type="button" onClick={onShowUpClick} disabled={false} variant="little"/> 
                        {
                            newCommentaryCount > 0 ? <div className={classes.showerCount}>{newCommentaryCount}</div> : <> </>
                        }
                    </div>
    )
}