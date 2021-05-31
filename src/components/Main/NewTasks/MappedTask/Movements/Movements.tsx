import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../../../assets/components/Button/Button"
import { changeTaskStatus, deleteTaskThunk } from "../../../../../redux/tasksReducer"
import { notificateServer } from "../../../../../redux/web-socket/io"
import { RootState, ThunkAppDispatch } from "../../../../../Types/reduxTypes/reduxStoreTypes"
import { MovementsType } from "../../../../../Types/TasksTypes/movementsTypes"
import { SpeacialReworkingMovement } from "./SpecialReworkingMovement"

const MovementsInner:FC<MovementsType> = ({status, userStatus, _id}) => {
    const dispatch:ThunkAppDispatch = useDispatch()
    const loading = useSelector<RootState, boolean>(state => state.task.loading)
    const deleteClickHandler = () => {
        dispatch(deleteTaskThunk(_id, status))
        notificateServer(status, status)
    }
    const acceptWorkingClickHandler = () => {
        dispatch(changeTaskStatus(_id, "working", status))
        notificateServer("working", status)
    }
    const acceptToCheckClickHandler = () => {
        dispatch(changeTaskStatus(_id, "check", status))
        notificateServer("check", status)
    }
    const sendToReworkingClickHandler = (commentary: string) => {
        dispatch(changeTaskStatus(_id, "reworking", status, commentary))
        notificateServer("reworking", status)
    }
    const acceptCheckedClickHandler = () => {
        dispatch(changeTaskStatus(_id, "ready", status))
        notificateServer("ready", status)
    }
    return (
        <>
        {
            status === "new" && <> 
                {
                        userStatus === "admin" ? <> 
                            <div> <Button text="X" type="button" onClick={deleteClickHandler} disabled={loading} variant="little"/> </div>
                        </>: <></>
                        } 
                        {
                            userStatus === "user" ? <> 
                            <div> <Button text="A" type="button" onClick={acceptWorkingClickHandler} disabled={loading} variant="little"/> </div>
                            </>: <></>
                        }
            </>
        }
        {
            status === "working" && <> 
                    {
                        userStatus === "user" ? <> 
                        <div> <Button text="C" type="button" onClick={acceptToCheckClickHandler} disabled={loading} variant="little"/> </div>
                        </>: <></>
                    }
        </>
        }
        {
            status === "check" && <> 
            {
                userStatus === "admin" ? <> 
                <div> <Button text="A" type="button" onClick={acceptCheckedClickHandler} disabled={loading} variant="little"/> </div>
                <div> <SpeacialReworkingMovement sendToReworkingClickHandler={sendToReworkingClickHandler} loading={loading}/> </div>
                </>: <></>
            } </>
        }
        {
             status === "reworking" && <> 
             {
                 userStatus === "user" ? <> 
                 <div> <Button text="C" type="button" onClick={acceptToCheckClickHandler} disabled={loading} variant="little"/> </div>
                 </>: <></>
             }
 </>
        }
        </>
    )
}

export const Movements = React.memo(MovementsInner)